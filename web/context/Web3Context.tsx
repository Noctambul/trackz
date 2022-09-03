import { useEdition } from "@thirdweb-dev/react";
import { Edition, EditionMetadata } from "@thirdweb-dev/sdk";
import TrackzMetadata from "models/TrackzMetadata";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Web3ContextInterface {
  trackzMetadata: TrackzMetadata[];
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextInterface | null>(null);

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

type AttributeType = "creator" | "tags";
type Attributes =
  | { trait_type: AttributeType; value: string }[]
  | Record<AttributeType, any>;

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

  const data = edition.metadata;
  const attributes: Attributes = data.attributes as Attributes;
  const creator = attribute("creator") || "Unknwown";
  const tags = attribute("tags")?.split(",");
  const musicUri = data.animation_url || "allow";
  const totalSupply = edition.supply.toNumber();

  // TODO: Do not return wrong track
  if (!creator || !musicUri || totalSupply === 0) return;

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

export function useWeb3(): Web3ContextInterface {
  if (!Web3Context) throw "Web3Context is not defined";
  return useContext(Web3Context)!;
}

export function Web3Provider(props: PropsWithChildren<{}>) {
  const [trackzMetadata, setTrackzMetadata] = useState<TrackzMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const edition: Edition | undefined = useEdition(
    process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT
  );

  if (!process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT) {
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
