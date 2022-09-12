import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const ethWalletRegex = /^0x[a-fA-F0-9]{40}$/g;
const EnvVariableSchema = z.object({
  NETWORK: z.enum(["rinkeby", "mainnet"]),
  NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT: z.string().regex(ethWalletRegex),
});

export default async function trackzs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { NETWORK, NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT } =
    EnvVariableSchema.parse(process.env);

  try {
    const sdk = new ThirdwebSDK(NETWORK);
    const contract = await sdk.getEdition(NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);
    res.status(200).send("Retrieved contract");
    const editions = await contract.getAll();

    res.status(200).json({
      editions,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
