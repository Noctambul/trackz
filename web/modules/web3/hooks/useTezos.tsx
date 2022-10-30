import { useQuery } from "@tanstack/react-query";
import { Web3Interface } from "../context/Web3Context";

export default function useTezos(): Web3Interface {
  const { isLoading, isError, data, error, refetch } = useQuery([
    "trackzs",
    async () => {
      const res = await fetch(
        "https://api.rarible.org/v0.1/items/byCollection?collection=TEZOS:KT1Nftyfonxcp5wkZJj681kASiMYbWExd1qc"
      );

      if (!res.ok)
        throw new Error(`Server responds with status ${res.status} : ${res}`);

      const json = await res.json();
      debugger;
      const retrievedNfts = json.editions;

      return [];
    },
  ]);

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
