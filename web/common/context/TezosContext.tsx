import { useQuery } from "@tanstack/react-query";
import TrackzMetadata from "common/models/TrackzMetadata";
import { createContext, PropsWithChildren, useContext } from "react";

export interface TezosContextInterface {
  trackzMetadata: TrackzMetadata[];
  isLoading: boolean;
  isError: boolean;
  address: string | undefined;
  connectWallet: () => Promise<any>;
  disconnectWallet: () => Promise<any>;
  refetchTrackzs: () => Promise<void>;
}

const TezosContext = createContext<TezosContextInterface | null>(null);

export function useTezos(): TezosContextInterface {
  if (!TezosContext) throw "TezosContext is not defined";
  return useContext(TezosContext)!;
}

export function TezosProvider(
  props: PropsWithChildren<[]>
): TezosContextInterface {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["trackzs"],
    async () => {
      const res = await fetch(
        "https://api.rarible.org/v0.1/items/byCollection?collection=TEZOS:KT1Nftyfonxcp5wkZJj681kASiMYbWExd1qc"
      );

      if (!res.ok)
        throw new Error(`Server responds with status ${res.status} : ${res}`);

      const json = await res.json();
      const retrievedNfts = json.editions;
      const trackzs = parseEditions(retrievedNfts);
      return trackzs;
    }
  );

  async function connectWallet() {}

  async function disconnectWallet() {}

  async function refetchTrackzs() {}

  return {
    trackzMetadata: [],
    isLoading: true,
    isError: false,
    address: undefined,
    connectWallet,
    disconnectWallet,
    refetchTrackzs,
  };
}

const parseEditions = (editions: unknown[]): TrackzMetadata[] =>
  editions
    .map((edition) => parseEditionMetadata(edition))
    .filter((track) => track !== undefined)
    .reverse() as TrackzMetadata[];
