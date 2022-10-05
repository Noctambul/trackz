import isEthereumAddress from "validator/lib/isEthereumAddress";
import { z } from "zod";

// const EthWalletAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/g);
const EthWalletAddressSchema = z
  .string()
  .refine(isEthereumAddress, { message: "Must be an ethereum address" });

export default EthWalletAddressSchema;

export type EthWalletAddress = z.infer<typeof EthWalletAddressSchema>;
