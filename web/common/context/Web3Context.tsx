import { EditionMetadataInput } from "@thirdweb-dev/sdk";
import TrackzMetadata from "common/models/TrackzMetadata";
import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import { createContext, PropsWithChildren, useContext } from "react";
import { useEthereum } from "./EthereumContext";

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

const Web3Context = createContext<Web3ContextInterface | null>(null);

export function useWeb3(): Web3ContextInterface {
  if (!Web3Context) throw "Web3Context is not defined";
  return useContext(Web3Context)!;
}

export function Web3Provider(props: PropsWithChildren<{}>) {
  const {
    trackzMetadata,
    audioTrackzs,
    isLoading,
    isError,
    refetchTrackzs,
    address,
    connectWallet,
    disconnectWallet,
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

const parseEditionMetadata = (
  edition: EditionMetadataInput
): TrackzMetadata | undefined => {
  const parsedResult = EditionMetadataSchema.safeParse(edition);
  // if (!parsedResult.success) console.log(parsedResult.error, edition);
  return parsedResult.success ? parsedResult.data : undefined;
};

const parseEditions = (editions: EditionMetadataInput[]): TrackzMetadata[] =>
  editions
    .map((edition) => parseEditionMetadata(edition))
    .filter((track) => track !== undefined)
    .reverse() as TrackzMetadata[];
