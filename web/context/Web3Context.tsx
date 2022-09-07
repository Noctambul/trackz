import { useEdition } from "@thirdweb-dev/react";
import { Edition, EditionMetadata } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import useEnvironment from "hooks/useEnvironment";
import TrackzMetadata from "models/TrackzMetadata";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";

export interface Web3ContextInterface {
  trackzMetadata: TrackzMetadata[];
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextInterface | null>(null);

export function useWeb3(): Web3ContextInterface {
  if (!Web3Context) throw "Web3Context is not defined";
  return useContext(Web3Context)!;
}

export function Web3Provider(props: PropsWithChildren<{}>) {
  const [trackzMetadata, setTrackzMetadata] = useState<TrackzMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { trackzEditionContract } = useEnvironment();
  const edition: Edition | undefined = useEdition(trackzEditionContract);

  if (!trackzEditionContract) {
    console.error("The Trackz Edition Contract Address is not defined");
  }

  useEffect(() => {
    async function getNfts() {
      const retrievedNfts = (await edition?.getAll()) || [];
      const trackzs = parseEditions(retrievedNfts);
      setTrackzMetadata(trackzs);
      setIsLoading(false);
    }
    getNfts();
  }, [edition]);

  return (
    <Web3Context.Provider value={{ trackzMetadata, isLoading }}>
      {props.children}
    </Web3Context.Provider>
  );
}

const attributeKeys = ["artist", "creator", "tags"] as const;
const zBigNumber = z.instanceof(BigNumber).transform((big) => big.toNumber());
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
