import { useQuery } from "@tanstack/react-query";
import { EditionMetadata } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import TrackzMetadata from "models/TrackzMetadata";
import { createContext, PropsWithChildren, useContext } from "react";
import { z } from "zod";

export interface Web3ContextInterface {
  trackzMetadata: TrackzMetadata[];
  isLoading: boolean;
  isError: boolean;
}

const Web3Context = createContext<Web3ContextInterface | null>(null);

export function useWeb3(): Web3ContextInterface {
  if (!Web3Context) throw "Web3Context is not defined";
  return useContext(Web3Context)!;
}

export function Web3Provider(props: PropsWithChildren<{}>) {
  const { isLoading, isError, data, error } = useQuery(
    ["trackzs"],
    async () => {
      console.count("Will query trackzs");
      const res = await fetch("/api/trackzs");

      if (!res.ok)
        throw new Error(`Server responds with status ${res.status} : ${res}`);

      const json = await res.json();
      const retrievedNfts = json.editions;
      const trackzs = parseEditions(retrievedNfts);
      return trackzs;
    }
  );

  return (
    <Web3Context.Provider
      value={{ trackzMetadata: data || [], isLoading, isError }}
    >
      {props.children}
    </Web3Context.Provider>
  );
}

const attributeKeys = ["artist", "creator", "tags"] as const;
const zBigNumber = z.preprocess(
  (big) => BigNumber.from(big),
  z.instanceof(BigNumber).transform((big) => big.toNumber())
);
const EditionMetadataSchema = z
  .object({
    supply: zBigNumber,
    metadata: z.object({
      id: zBigNumber,
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

const parseEditionMetadata = (
  edition: EditionMetadata
): TrackzMetadata | undefined => {
  const parsedResult = EditionMetadataSchema.safeParse(edition);
  return parsedResult.success ? parsedResult.data : undefined;
};

const parseEditions = (editions: EditionMetadata[]): TrackzMetadata[] =>
  editions
    .map((edition) => parseEditionMetadata(edition))
    .filter((track) => track !== undefined)
    .reverse() as TrackzMetadata[];

const metadataExample = {
  supply: {
    type: "BigNumber",
    hex: "0x03e8",
  },
  metadata: {
    name: "Bad Bird",
    description: "The bad birds",
    image:
      "https://gateway.ipfscdn.io/ipfs/QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/0.png",
    external_url: "",
    id: {
      type: "BigNumber",
      hex: "0x00",
    },
    uri: "ipfs://QmPUc7L3tWvmnPbGbiJrjsP2QpBUo9HizdW49XCpUazNMJ/0",
    animation_url:
      "https://gateway.ipfscdn.io/ipfs/QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/1.mp3",
    background_color: "",
    attributes: [
      {
        trait_type: "type",
        value: "electro",
      },
      {
        trait_type: "author",
        value: "Noctambul",
      },
    ],
  },
};
