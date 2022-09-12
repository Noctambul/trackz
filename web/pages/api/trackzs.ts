import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethWalletRegex } from "lib/schema/zod-helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const EnvVariableSchema = z.object({
  NETWORK: z.enum(["rinkeby", "mainnet"]),
  NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT: z.string().regex(ethWalletRegex),
});

export default async function trackzs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { NETWORK, NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT } =
      EnvVariableSchema.parse(process.env);

    const sdk = new ThirdwebSDK(NETWORK);
    const contract = await sdk.getEdition(NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);
    const editions = await contract.getAll();

    res.status(200).json({
      editions,
    });
  } catch (e: any) {
    console.error(e);
    res
      .status(500)
      .json({ error: `Error while retrieving Trackzs : ${e.message}` });
  }
}
