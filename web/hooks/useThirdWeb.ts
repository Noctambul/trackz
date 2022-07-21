import { TokenMetadata } from "context/Web3Context";
import { useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";

const NFT_COLLECTION_ADDRESS = "0x3fB61AAA31c038E16d3ca27F154F5E88Bc00c67E";

const useThirdWeb = () => {
  console.log("USE THIRD WEB");

  const Web3Api = useMoralisWeb3Api();
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

  const fetchNFTsForContract = async () => {
    console.log("FETCH");
    setIsLoading(true);
    const options = {
      chain: "rinkeby",
      address: NFT_COLLECTION_ADDRESS,
    };

    console.log("Start - getAllTokenIds");
    // @ts-ignore
    // const res = await Moralis.Web3API.token.getAllTokenIds(options);
    const res = await Web3Api.token.getAllTokenIds(options);
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

  return { isLoading, tokens, fetchNFTsForContract };
};

export default useThirdWeb;
