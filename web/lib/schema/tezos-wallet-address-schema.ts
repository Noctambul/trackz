import { z } from "zod";

const TezosWalletAddressSchema = z.string().regex(/^(tz|TZ)[a-fA-F0-9]{34}$/g);

export default TezosWalletAddressSchema;

export type TezosWalletAddress = z.infer<typeof TezosWalletAddressSchema>;
