import { useEdition } from "@thirdweb-dev/react";
import { Edition, EditionMetadata } from "@thirdweb-dev/sdk";
import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import trackzs from "data/trackzs";
import TrackzMetadata from "models/TrackzMetadata";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

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

const parseNft = (nftMetadata: EditionMetadata): TrackzMetadata | undefined => {
  const attribute = (type: string) =>
    attributes.find((attr) => attr.trait_type === type)?.value;

  const data = nftMetadata.metadata;
  const attributes: Attributes = data.attributes as Attributes;
  const owner = attribute("owner");
  const tags = attribute("type")?.split(",");
  const musicUri = data.animation_url;

  if (!owner || !musicUri) return;

  return {
    id: data.id.toNumber(),
    name: `${data.name}`,
    owner,
    description: `${data.description}`,
    totalSupply: nftMetadata.supply.toNumber(),
    coverUri: data.image,
    musicUri,
    tags,
  };
};

const Home: NextPage = () => {
  // const [nfts, setNfts] = useState<NFTMetadataOwner[]>([]);
  const [nfts, setNfts] = useState<EditionMetadata[]>([]);
  // const nftCollection = useNFTCollection(
  //   process.env.NEXT_PUBLIC_TRACKZ_COLLECTION_CONTRACT
  // );
  const edition: Edition | undefined = useEdition(
    process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT
  );

  useEffect(() => {
    async function getNfts() {
      console.log("*** Retrieve NFTs ***");
      const retrievedNfts = (await edition?.getAll()) || [];

      const nft = retrievedNfts[0];
      setNfts(retrievedNfts);

      console.log(retrievedNfts);
    }

    getNfts();
  }, [edition]);

  // getNfts();

  return (
    <PageContainer>
      <div className="space-y-lg my-24 flex h-[500vh] flex-col space-y-10 px-8 sm:px-20">
        {trackzs.map((trackz) => (
          <TrackzCard trackz={trackz} key={trackz.id} />
        ))}
      </div>
    </PageContainer>
  );
};

export default Home;
