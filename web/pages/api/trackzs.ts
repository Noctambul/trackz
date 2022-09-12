import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import EnvVariableSchema from "lib/schema/env-variable-back-schema";
import { NextApiRequest, NextApiResponse } from "next";

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
