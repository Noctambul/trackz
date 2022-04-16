import { Button, Layout, Space } from "antd";
import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import { Typography } from "antd";
import PageContainer from "components/PageContainer/PageContainer";
import Mix from "components/Mix/Mix";
import { mixes } from "../helpers/mixes";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useNFTCollection, useMetamask } from "@thirdweb-dev/react";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

import React, { useEffect, useState } from "react";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import TextArea from "antd/lib/input/TextArea";
import { ethers } from "ethers";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NFTMetadataOwner[]>([]);
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
  // const nftCollection = useNFTCollection(nftCollectionAddress);

  const fetchNFTsWithThirdweb = async () => {
    // call functions on your contract

    const provider = ethers.getDefaultProvider(
      "https://eth-rinkeby.alchemyapi.io/v2/hgGeox9GdHhV1OFeaXKXigkHoJQisOi1"
    );
    const sdk = new ThirdwebSDK(provider);
    const contract = sdk.getEdition(nftCollectionAddress);
    const nfts = await contract.getAll();
    const tokensMetadata = nfts.map((nft) => nft.metadata as TokenMetadata);
    console.log(nfts);
    setTokens(tokensMetadata);
    console.log(tokensMetadata);

    // Initialize NFT collection by passing in the contract address
    const nftCollection = sdk.getNFTCollection(nftCollectionAddress);
    if (nftCollection) {
      // const code = await provider.getCode(
      //   "https://eth-rinkeby.alchemyapi.io/v2/hgGeox9GdHhV1OFeaXKXigkHoJQisOi1"
      // );
      // debugger;
      // const address = nftCollection.getAddress();
      // const nfts = await nftCollection.getAll();
      // debugger;
      // nftCollection
      //   .getAll()
      //   .then((nfts) => {
      //     debugger;
      //     setNfts(nfts);
      //   })
      //   .catch((error) => {
      //     console.error("failed to fetch nfts", error);
      //   });
    }
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
