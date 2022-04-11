import Moralis from "moralis/types";
import { createContext, ReactFragment, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export interface Web3ContextInterface {
  currentAccount: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextInterface | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { authenticate, isAuthenticated, user, Moralis } = useMoralis();
  const [currentAccount, setCurrentAccount] = useState<string>("");

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

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
      value={{ connectWallet, disconnectWallet, currentAccount }}
    >
      {children}
    </Web3Context.Provider>
  );
};
