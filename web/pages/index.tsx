import { Button, Space } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import Song from "components/Song/Song";
import type { NextPage } from "next";
import { useMoralis } from "react-moralis";
import styles from "styles/Home.module.scss";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useState } from "react";

type TokenMetadata = {
  animation_url: string; // "ipfs://QmTFvHz9SqjMXSSLA3ZXBdkXDnXKtWftdf5nYZfMcXsJH5/1.mp3"
  attributes: { trait_type: string; value: string }[];
  background_color: string;
  description: string;
  external_url: string;
  image: string; //"ipfs://QmTFvHz9SqjMXSSLA3ZXBdkXDnXKtWftdf5nYZfMcXsJH5/0.jpeg"
  name: string; //"Drowning Slow"
};

const Home: NextPage = () => {
  const { Moralis } = useMoralis();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<TokenMetadata[]>([
    {
      animation_url:
        "ipfs://QmTFvHz9SqjMXSSLA3ZXBdkXDnXKtWftdf5nYZfMcXsJH5/1.mp3",
      attributes: [],
      background_color: "",
      description: "YO",
      external_url: "",
      image: "ipfs://QmTFvHz9SqjMXSSLA3ZXBdkXDnXKtWftdf5nYZfMcXsJH5/0.jpeg",
      name: "Drowning Slow",
    },
  ]);

  const nftCollectionAddress = "0x3fB61AAA31c038E16d3ca27F154F5E88Bc00c67E";

  const fetchNFTsWithThirdweb = async () => {
    setIsLoading(true);
    // const provider = ethers.getDefaultProvider(
    //   "https://eth-rinkeby.alchemyapi.io/v2/hgGeox9GdHhV1OFeaXKXigkHoJQisOi1"
    // );
    const provider = await Moralis.enableWeb3();
    const sdk = new ThirdwebSDK(provider);
    const contract = sdk.getEdition(nftCollectionAddress);
    const nfts = await contract.getAll();
    const tokensMetadata = nfts.map((nft) => nft.metadata as TokenMetadata);
    setTokens(tokensMetadata);
    console.log(tokensMetadata);
    setIsLoading(false);
  };

  const fetchNFTsForContract = async () => {
    setIsLoading(true);
    const options = {
      chain: "rinkeby",
      address: "0x3fB61AAA31c038E16d3ca27F154F5E88Bc00c67E",
    };

    console.log("Start - getAllTokenIds");
    // @ts-ignore
    const res = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log("Response - ", res);
    // @ts-ignore
    const tokenMetadatas: TokenMetadata[] = res.result?.map(
      // @ts-ignore
      (item) => JSON.parse(item.metadata) as TokenMetadata
    );

    console.log("Tokens - ", tokenMetadatas);

    setIsLoading(false);
    setTokens(tokenMetadatas);
  };

  // useEffect(() => {
  //   fetchNFTsForContract();
  // });

  return (
    <PageContainer>
      <>
        <Button onClick={fetchNFTsForContract} loading={isLoading}>
          Fetch NFTs With Moralis
        </Button>
        <Button onClick={fetchNFTsWithThirdweb} loading={isLoading}>
          Fetch NFTs With Thirdweb
        </Button>
        {/* <span>{isLoading}</span> */}
        <Space
          direction="vertical"
          align="center"
          size="middle"
          className={styles.mixContainer}
        >
          {tokens.map((tokenMetadata, i) => (
            <Song
              key={i}
              title={tokenMetadata.name}
              author="Noctambul"
              soundUri={tokenMetadata.animation_url}
              coverUri={tokenMetadata.image}
            >
              Allow
            </Song>
          ))}
        </Space>
      </>
    </PageContainer>
  );
};

export default Home;
