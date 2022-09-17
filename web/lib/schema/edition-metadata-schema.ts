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
      animation_url: z.string(),
      image: z.string().optional(),
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

export type ParsedEditionMetadata = z.infer<typeof EditionMetadataSchema>;

// const metadataExample = {
//   supply: {
//     type: "BigNumber",
//     hex: "0x03e8",
//   },
//   metadata: {
//     name: "Bad Bird",
//     description: "The bad birds",
//     image:
//       "https://gateway.ipfscdn.io/ipfs/QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/0.png",
//     external_url: "",
//     id: {
//       type: "BigNumber",
//       hex: "0x00",
//     },
//     uri: "ipfs://QmPUc7L3tWvmnPbGbiJrjsP2QpBUo9HizdW49XCpUazNMJ/0",
//     animation_url:
//       "https://gateway.ipfscdn.io/ipfs/QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/1.mp3",
//     background_color: "",
//     attributes: [
//       {
//         trait_type: "type",
//         value: "electro",
//       },
//       {
//         trait_type: "author",
//         value: "Noctambul",
//       },
//     ],
//   },
// };
