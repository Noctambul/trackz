import { z } from "zod";
import EthWalletAddressSchema from "./eth-wallet-address-schema";

const EnvVariableSchema = z.object({
  MINT_WALLET_PRIVATE_KEY: z.string().length(64),
  NETWORK: z.enum(["rinkeby", "mainnet"]),
  NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT: EthWalletAddressSchema,
});

export default EnvVariableSchema;
