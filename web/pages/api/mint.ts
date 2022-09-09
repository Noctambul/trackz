import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const ethWalletRegex = /^0x[a-fA-F0-9]{40}$/g;

const MintParamsSchema = z.object({
  authorAddress: z.string().regex(ethWalletRegex),
  metadata: z.object({
    name: z.string(),
    description: z.string().optional(),
    musicUri: z
      .string()
      .regex(
        /^ipfs:\/\/[a-zA-Z0-9]{46}\/[0-9].mp3$/g,
        "musicUri has wrong format"
      ),
    coverUri: z
      .string()
      .regex(
        /^ipfs:\/\/[a-zA-Z0-9]{46}\/[0-9].(jpg|png)$/g,
        "coverUri has wrong format"
      )
      .optional(),
    tags: z.string().optional(),
  }),
});

const EnvVariableSchema = z.object({
  MINT_WALLET_PRIVATE_KEY: z.string().length(64),
  NETWORK: z.enum(["rinkeby", "mainnet"]),
  NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT: z.string().regex(ethWalletRegex),
});

export type MintParams = z.infer<typeof MintParamsSchema>;

export default async function mint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      MINT_WALLET_PRIVATE_KEY,
      NETWORK,
      NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT,
    } = EnvVariableSchema.parse(process.env);

    const { authorAddress, metadata } = MintParamsSchema.parse(
      JSON.parse(req.body)
    );

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(MINT_WALLET_PRIVATE_KEY, NETWORK);

    // Load the contract address using the SDK
    const contract = sdk.getEdition(NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);

    const nftMetadata = {
      name: metadata.name,
      description: metadata.description || "",
      image: metadata.coverUri || "",
      animation_url: metadata.musicUri, //fs.readFileSync("path/to/image.png"), // This can be an image url or file
      attributes: [{ trait_type: "tags", value: metadata.tags || "" }],
    };

    // Generate the signature for the page NFT
    // @see https://portal.thirdweb.com/typescript/sdk.erc1155signaturemintable.generate
    const signedPayload = await contract.signature.generate({
      metadata: nftMetadata, // The NFT to mint
      to: authorAddress, // Who will receive the NFT (or AddressZero for anyone)
      quantity: 2, // the quantity of NFTs to mint
      // price: 0.5, // the price per NFT
      // currencyAddress: NATIVE_TOKEN_ADDRESS, // the currency to pay with
      // mintStartTime: startTime, // can mint anytime from now
      // mintEndTime: endTime, // to 24h from now
      royaltyRecipient: authorAddress, // custom royalty recipient for this NFT
      royaltyBps: 100, // custom royalty fees for this NFT (in bps)
      primarySaleRecipient: authorAddress, // custom sale recipient for this NFT
    });

    // Return back the signedPayload to the client.
    res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload)),
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
