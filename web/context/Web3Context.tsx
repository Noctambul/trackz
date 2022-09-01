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

type AttributeType = "owner";
type Attributes = { trait_type: AttributeType; value: string }[];

const parseEditionMetadata = (
  edition: EditionMetadata
): TrackzMetadata | undefined => {
  const attribute = (type: string) =>
    attributes.find((attr) => attr.trait_type === type)?.value;

  const data = edition.metadata;
  const attributes: Attributes = data.attributes as Attributes;
  const owner = attribute("owner") || "Unknwown";
  const tags = attribute("type")?.split(",");
  const musicUri = data.animation_url || "allow";

  // TODO: Do not return wrong track
  // if (!owner || !musicUri) return;

  return {
    id: data.id.toNumber(),
    name: `${data.name}`,
    owner,
    description: `${data.description}`,
    totalSupply: edition.supply.toNumber(),
    coverUri: data.image,
    musicUri,
    tags,
  };
};

const parseEditions = (editions: EditionMetadata[]): TrackzMetadata[] =>
  editions
    .map((edition) => parseEditionMetadata(edition))
    .filter((track) => track !== undefined) as TrackzMetadata[];

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

  console.log(
    "Contract address ",
    process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT
  );

  useEffect(() => {
    async function getNfts() {
      // console.log("*** Retrieve NFTs ***");
      const retrievedNfts = (await edition?.getAll()) || [];
      const trackzs = parseEditions(retrievedNfts);
      setTrackzMetadata(trackzs);
      // console.log(trackzs);
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
