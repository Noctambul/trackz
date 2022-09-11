import { z } from "zod";
import BigNumberSchema from "./big-number-schema";

const attributeKeys = ["artist", "creator", "tags"] as const;

const EditionMetadataSchema = z
  .object({
    supply: BigNumberSchema,
    metadata: z.object({
      id: BigNumberSchema,
      name: z.string().max(30),
      description: z.string().default(""),
      animation_url: z.string().url(),
      image: z.string().url().optional(),
      attributes: z
        .array(
          z.object({
            trait_type: z.enum(attributeKeys),
            value: z.string(),
          })
        )
        .optional()
        .transform((arr) =>
          arr?.reduce((acc, val) => {
            acc[val.trait_type] = val.value;
            return acc;
          }, {} as Record<typeof attributeKeys[number], string>)
        ),
    }),
  })
  .transform((nft) => {
    return {
      id: nft.metadata.id,
      name: nft.metadata.name,
      creator:
        nft.metadata.attributes?.artist ||
        nft.metadata.attributes?.creator ||
        "Unknown",
      description: nft.metadata.description,
      totalSupply: nft.supply,
      coverUri: nft.metadata.image,
      musicUri: nft.metadata.animation_url,
      tags: nft.metadata.attributes?.tags,
    };
  });

export default EditionMetadataSchema;
