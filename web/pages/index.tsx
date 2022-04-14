import { Button, Layout, Space } from "antd";
import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import { Typography } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import Mix from "components/Mix/Mix";
import { mixes } from "../helpers/mixes";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

import React, { useEffect, useState } from "react";

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
  const Web3Api = useMoralisWeb3Api();
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNFTsForContract = async () => {
    setIsLoading(true);
    const options = {
      chain: "rinkeby",
      address: "0x3fB61AAA31c038E16d3ca27F154F5E88Bc00c67E",
    };

    console.log("Start - getAllTokenIds");
    const res = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log("Response - ", res);
    const tokenMetadatas: TokenMetadata[] = res.result?.map(
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
          Fetch NFTs
        </Button>
        {/* <span>{isLoading}</span> */}
        <Space
          direction="vertical"
          align="center"
          size="middle"
          className={styles.mixContainer}
        >
          {tokens.map((tokenMetadata, i) => (
            <Mix
              key={i}
              title={tokenMetadata.name}
              author="Noctambul"
              soundUri={tokenMetadata.animation_url}
              coverUri={tokenMetadata.image}
            >
              Allow
            </Mix>
          ))}
        </Space>
      </>
    </PageContainer>
  );
};

export default Home;
