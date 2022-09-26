import { z } from "zod";
import BigNumberSchema from "./big-number-schema";
import EthWalletAddressSchema from "./eth-wallet-address-schema";

export const MusicalGenres = [
  "rock",
  "drum-and-bass",
  "techno",
  "dubstep",
  "trap",
  "metal",
  "r-and-b",
  "hip-hop",
  "rap",
  "disco",
  "latin",
  "dance-and-edm",
  "folk-and-singer-songwriter",
  "deep-house",
  "indie",
  "dancehall",
  "ambient",
  "experimental",
  "pop",
  "world",
  "soundtrack",
  "house",
  "reggae",
  "reggaeton",
  "alternative-rock",
  "electronic",
  "unclassifiable",
] as const;
export const MusicalGenreEnumSchema = z.enum(MusicalGenres);
export type MusicalGenre = z.infer<typeof MusicalGenreEnumSchema>;

const attributeKeys = ["artist", "creator", "tags", "genres"] as const;

const EditionMetadataSchema = z
  .object({
    supply: BigNumberSchema,
    metadata: z.object({
      id: BigNumberSchema,
      name: z.string().max(30),
      description: z.string().default(""),
      animation_url: z.string(),
      image: z.string().optional(),
      creator: EthWalletAddressSchema.optional(), // TODO: remove optional
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
        )
        .or(
          z
            .object({
              artist: z.string(),
              creator: z.string(),
              tags: z.string(),
              genres: z.string().array(), //.transform((str: string) => str.split(",")),
            })
            .partial()
        ),
    }),
  })
  .transform((nft) => {
    return {
      id: nft.metadata.id,
      name: nft.metadata.name,
      creator:
        nft.metadata.creator ||
        nft.metadata.attributes?.artist ||
        nft.metadata.attributes?.creator ||
        "Unknown",
      description: nft.metadata.description,
      totalSupply: nft.supply,
      coverUri: nft.metadata.image,
      musicUri: nft.metadata.animation_url,
      tags: nft.metadata.attributes?.tags,
      genres: nft.metadata.attributes?.genres,
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
