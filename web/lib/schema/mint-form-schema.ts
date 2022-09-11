import { z } from "zod";
import { zodAudioFile, zodImageFile } from "./zod-helpers";

const MintFormSchema: z.ZodSchema<any, z.ZodTypeDef, any> = z.object({
  musicFile: zodAudioFile(),
  coverFile: zodImageFile(true),
  name: z
    .string()
    .min(1, { message: "Title is required" })
    .max(30, { message: "Title must contain at most 30 characters" }),
  description: z.string().optional(),
  tags: z.string().optional(),
  supply: z.preprocess(
    (str) => parseInt(str as string, 10),
    z.number().int().positive()
  ),
  royalties: z.preprocess(
    (str) => parseInt(str as string, 10),
    z
      .number()
      .int()
      .nonnegative()
      .max(20, { message: "Royalties must be less than 20%" })
  ),
});

export default MintFormSchema;

export type MintInputs = z.infer<typeof MintFormSchema>;
