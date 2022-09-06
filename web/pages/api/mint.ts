import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

export type MintBodyResponse = {
  authorAddress: string;
  metadata: {
    name: string;
    description?: string;
    musicUri: string;
    coverUri?: string;
    tags?: string;
  };
};

export default async function mint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { authorAddress, metadata } = JSON.parse(
      req.body
    ) as MintBodyResponse;

    console.log("Mint Server");

    validateEnvVariables();

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.MINT_WALLET_PRIVATE_KEY as string,
      process.env.NETWORK as string
    );

    // Load the contract address using the SDK
    const contract = sdk.getEdition(
      process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT as string
    );

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

function validateEnvVariables() {
  if (!process.env.MINT_WALLET_PRIVATE_KEY) {
    throw new Error(
      "You're missing MINT_WALLET_PRIVATE_KEY in your .env.local file"
    );
  }

  if (!process.env.NETWORK) {
    throw new Error("You're missing NETWORK in your .env.local file");
  }
}
