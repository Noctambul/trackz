import TrackzMetadata from "common/models/TrackzMetadata";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import { createContext, PropsWithChildren, useContext } from "react";
import useEthereum from "../hooks/useEthereum";

export interface Web3ContextInterface {
  trackzMetadata: TrackzMetadata[];
  audioTrackzs: AudioTrackz[];
  isLoading: boolean;
  isError: boolean;
  address: string | undefined;
  connectWallet: () => Promise<any>;
  disconnectWallet: () => Promise<any>;
  refetchTrackzs: () => Promise<void>;
}

export type Web3Interface = {
  trackzMetadata: TrackzMetadata[];
  isLoading: boolean;
  isError: boolean;
  address: string | undefined;
  connectWallet: () => Promise<any>;
  disconnectWallet: () => Promise<any>;
  refetchTrackzs: () => Promise<void>;
};

const Web3Context = createContext<Web3ContextInterface | null>(null);

export function useWeb3(): Web3ContextInterface {
  if (!Web3Context) throw "Web3Context is not defined";
  return useContext(Web3Context)!;
}

export function Web3Provider(props: PropsWithChildren<{}>) {
  const {
    trackzMetadata,
    isLoading,
    isError,
    address,
    connectWallet,
    disconnectWallet,
    audioTrackzs,
    refetchTrackzs,
  } = useEthereum();

  return (
    <Web3Context.Provider
      value={{
        trackzMetadata,
        audioTrackzs,
        isLoading,
        isError,
        refetchTrackzs,
        address,
        connectWallet,
        disconnectWallet,
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
}
