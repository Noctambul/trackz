import { z } from "zod";
import { ethWalletRegex } from "./zod-helpers";

const MintParamsSchema = z.object({
  authorAddress: z.string().regex(ethWalletRegex),
  supply: z.number(),
  royalties: z.number().int().max(20),
  metadata: z.object({
    name: z.string(),
    description: z.string().optional(),
    musicUri: z
      .string()
      .regex(
        /^ipfs:\/\/[a-zA-Z0-9]{46}\/[0-9].mp3$/g,
        "musicUri has wrong format"
      ),
    coverUri: z
      .string()
      .regex(
        /^ipfs:\/\/[a-zA-Z0-9]{46}\/[0-9].(jpg|png|jpeg|bmp|gif|heic)$/g,
        "coverUri has wrong format"
      )
      .optional(),
    tags: z.string().optional(),
  }),
});

export default MintParamsSchema;

export type MintParams = z.infer<typeof MintParamsSchema>;
