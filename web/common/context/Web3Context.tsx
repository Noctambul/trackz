import { useQuery } from "@tanstack/react-query";
import { EditionMetadataInput } from "@thirdweb-dev/sdk";
import useWalletConnector from "common/hooks/useWalletConnector";
import TrackzMetadata from "common/models/TrackzMetadata";
import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

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
  const { address, connectWallet, disconnectWallet } = useWalletConnector();
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["trackzs"],
    async () => {
      const res = await fetch("/api/trackzs");

      if (!res.ok)
        throw new Error(`Server responds with status ${res.status} : ${res}`);

      const json = await res.json();
      const retrievedNfts = json.editions;
      const trackzs = parseEditions(retrievedNfts);
      return trackzs;
    }
  );

  const audioTrackzs: AudioTrackz[] = useMemo(
    () =>
      data?.map((track) =>
        track instanceof AudioTrackz ? track : new AudioTrackz(track)
      ) || [],
    [data]
  );

  const refetchTrackzs = async () => {
    await refetch();
  };

  return (
    <Web3Context.Provider
      value={{
        trackzMetadata: data || [],
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
