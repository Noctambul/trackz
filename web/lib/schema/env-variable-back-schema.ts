import { z } from "zod";
import { ethWalletRegex } from "./zod-helpers";

const EnvVariableSchema = z.object({
  MINT_WALLET_PRIVATE_KEY: z.string().length(64),
  NETWORK: z.enum(["rinkeby", "mainnet"]),
  NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT: z.string().regex(ethWalletRegex),
});

export default EnvVariableSchema;
