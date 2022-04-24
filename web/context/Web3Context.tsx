import { createContext, useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export type TokenMetadata = {
  animation_url: string; // "ipfs://QmTFvHz9SqjMXSSLA3ZXBdkXDnXKtWftdf5nYZfMcXsJH5/1.mp3"
  attributes: { trait_type: string; value: string }[];
  background_color: string;
  description: string;
  external_url: string;
  image: string; //"ipfs://QmTFvHz9SqjMXSSLA3ZXBdkXDnXKtWftdf5nYZfMcXsJH5/0.jpeg"
  name: string; //"Drowning Slow"
};

export interface Web3ContextInterface {
  currentAccount: string;
  tokens: TokenMetadata[];
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextInterface | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const nftCollectionAddress = "0x3fB61AAA31c038E16d3ca27F154F5E88Bc00c67E";
  const { authenticate, isAuthenticated, isInitialized, user, Moralis } =
    useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [currentAccount, setCurrentAccount] = useState<string>("");
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

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isInitialized) {
      fetchNFTsForContract();
    }
  }, [isInitialized]);

  const fetchNFTsForContract = async () => {
    setIsLoading(true);
    const options = {
      chain: "rinkeby",
      address: "0x3fB61AAA31c038E16d3ca27F154F5E88Bc00c67E",
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

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = user!.get("ethAddress");
      setCurrentAccount(address);
    } else {
      setCurrentAccount("");
    }
  };

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: "Log in to WITM",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = async () => {
    await Moralis.User.logOut();
    setCurrentAccount("");
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
        tokens,
        isLoading,
        currentAccount,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
