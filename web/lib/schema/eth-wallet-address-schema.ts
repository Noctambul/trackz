import { z } from "zod";

const EthWalletAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/g);

export default EthWalletAddressSchema;

export type EthWalletAddress = z.infer<typeof EthWalletAddressSchema>;
