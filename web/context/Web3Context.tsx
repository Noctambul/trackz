// import useThirdWeb from "hooks/useThirdWeb";
import { createContext, useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";

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
  const isAuthenticated = false;
  const isInitialized = false;
  const isLoading = false;
  const tokens: TokenMetadata[] = [];
  // const { authenticate, isAuthenticated, isInitialized, user, Moralis } =
  //   useMoralis();
  // const { isLoading, tokens, fetchNFTsForContract } = useThirdWeb();
  const [currentAccount, setCurrentAccount] = useState<string>("");

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isInitialized) {
      // fetchNFTsForContract();
    }
  }, [isInitialized]);

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      // const address = user!.get("ethAddress");
      // setCurrentAccount(address);
    } else {
      setCurrentAccount("");
    }
  };

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        // await authenticate({
        //   signingMessage: "Log in to WITM",
        // });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = async () => {
    // await Moralis.User.logOut();
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
