import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import EnvVariableSchema from "lib/schema/env-variable-back-schema";
import MintParamsSchema from "lib/schema/mint-params-schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function mint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      MINT_WALLET_PRIVATE_KEY,
      NETWORK,
      NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT,
    } = EnvVariableSchema.parse(process.env);

    const { authorAddress, metadata, supply, royalties } =
      MintParamsSchema.parse(JSON.parse(req.body));

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(MINT_WALLET_PRIVATE_KEY, NETWORK);

    // Load the contract address using the SDK
    const contract = await sdk.getEdition(NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);

    const nftMetadata = {
      name: metadata.name,
      description: metadata.description || "",
      image: metadata.coverUri || "",
      animation_url: metadata.musicUri, //fs.readFileSync("path/to/image.png"), // This can be an image url or file
      custom_property: "coucou",
      creator: authorAddress,
      // attributes: [
      //   { trait_type: "tags", value: metadata.tags || "" },
      //   { trait_type: "artist", value: authorAddress },
      // ],
      attributes: {
        tags: metadata.tags || "",
        artist: authorAddress,
        type: "mp3",
      },
      // properties: {
      //   custom_tag: metadata.tags || "",
      //   custom_artist: authorAddress,
      //   custom_prop: "bonjour",
      // },
    };

    // Generate the signature for the page NFT
    // @see https://portal.thirdweb.com/typescript/sdk.erc1155signaturemintable.generate
    const signedPayload = await contract.signature.generate({
      metadata: nftMetadata, // The NFT to mint
      to: authorAddress, // Who will receive the NFT (or AddressZero for anyone)
      quantity: supply, // the quantity of NFTs to mint
      // price: 0.5, // the price per NFT
      // currencyAddress: NATIVE_TOKEN_ADDRESS, // the currency to pay with
      // mintStartTime: startTime, // can mint anytime from now
      // mintEndTime: endTime, // to 24h from now
      royaltyRecipient: authorAddress, // custom royalty recipient for this NFT
      royaltyBps: royalties, // custom royalty fees for this NFT (in bps)
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
