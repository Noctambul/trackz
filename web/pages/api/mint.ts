import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

type MintBodyResponse = {
  authorAddress: string;
};

export default async function mint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { authorAddress } = JSON.parse(req.body) as MintBodyResponse;
  } catch (e) {
    res.status(500).json({ error: e });

    if (!process.env.MINT_WALLET_PRIVATE_KEY) {
      throw new Error(
        "You're missing MINT_WALLET_PRIVATE_KEY in your .env.local file"
      );
    }

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.MINT_WALLET_PRIVATE_KEY as string,
      process.env.NETWORK as string
    );
  }
}
