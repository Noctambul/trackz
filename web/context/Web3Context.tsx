import { useEdition } from "@thirdweb-dev/react";
import { Edition, EditionMetadata } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import useEnvironment from "hooks/useEnvironment";
import { isValidUri } from "hooks/useIpfs";
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

type AttributeType = "creator" | "tags";
type Attributes =
  | { trait_type: AttributeType; value: string }[]
  | Record<AttributeType, any>;

const attributeKeys = ["creator", "tags"] as const;
const EditionMetadataSchema = z.object({
  supply: z.instanceof(BigNumber).transform((big) => big.toNumber()),
  metadata: z.object({
    animation_url: z.string().url(),
    image: z.string().url(),
    attributes: z
      .array(
        z.object({
          trait_type: z.enum(attributeKeys),
          value: z.any(),
        })
      )
      .or(z.record(z.enum(attributeKeys), z.any())),
  }),
});

const parseEditionMetadata = (
  edition: EditionMetadata
): TrackzMetadata | undefined => {
  const attribute = (type: AttributeType): any => {
    if (!attributes) {
      return;
    } else if (Array.isArray(attributes)) {
      return attributes.find((attr) => attr.trait_type === type)?.value;
    } else {
      return attributes[type];
    }
  };

  const editionMetadata = EditionMetadataSchema.parse(edition);

  const data = edition.metadata;
  const attributes: Attributes = data.attributes as Attributes;
  const creator = attribute("creator") || "Unknwown";
  const tags = attribute("tags")?.split(",");
  const musicUri = data.animation_url || "allow";
  const totalSupply = edition.supply.toNumber();

  // Do not return wrong track
  const isValid = creator && isValidUri(musicUri) && totalSupply > 0;
  if (!isValid) return;

  return {
    id: data.id.toNumber(),
    name: `${data.name}`,
    creator: creator,
    description: `${data.description}`,
    totalSupply,
    coverUri: data.image,
    musicUri,
    tags,
  };
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
