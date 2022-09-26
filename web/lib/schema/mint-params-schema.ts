import { z } from "zod";
import { MusicalGenreEnumSchema } from "./edition-metadata-schema";
import EthWalletAddressSchema from "./eth-wallet-address-schema";

const MintParamsSchema = z.object({
  authorAddress: EthWalletAddressSchema,
  supply: z.number(),
  royalties: z.number().int().max(20),
  metadata: z.object({
    name: z.string(),
    description: z.string().optional(),
    musicUri: z
      .string()
      .regex(
        /^ipfs:\/\/[a-zA-Z0-9]{46}\/[0-9-a-zA-Z]*.mp3$/g,
        "musicUri has wrong format"
      ),
    coverUri: z
      .string()
      .regex(
        /^ipfs:\/\/[a-zA-Z0-9]{46}\/[0-9-a-zA-Z]*.(jpg|png|jpeg|bmp|gif|heic)$/g,
        "coverUri has wrong format"
      )
      .optional(),
    tags: z.string().optional(),
    genres: MusicalGenreEnumSchema.array().default([]),
  }),
});

export default MintParamsSchema;

export type MintParams = z.infer<typeof MintParamsSchema>;
