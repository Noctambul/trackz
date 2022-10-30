import { useQuery } from "@tanstack/react-query";
import { EditionMetadataInput } from "@thirdweb-dev/sdk";
import TrackzMetadata from "common/models/TrackzMetadata";
import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import useWalletConnector from "modules/audio/hooks/useWalletConnector";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import { useMemo } from "react";
import { Web3Interface } from "../context/Web3Context";

export default function useEthereum(): Web3Interface & {
  audioTrackzs: AudioTrackz[];
} {
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

  return {
    trackzMetadata: data || [],
    audioTrackzs,
    isLoading,
    isError,
    address,
    connectWallet,
    disconnectWallet,
    refetchTrackzs,
  };
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
