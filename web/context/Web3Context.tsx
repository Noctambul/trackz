import { useQuery } from "@tanstack/react-query";
import { EditionMetadata } from "@thirdweb-dev/sdk";
import useWalletConnector from "hooks/useWalletConnector";
import EditionMetadataSchema from "lib/schema/edition-metadata-schema";
import TrackzMetadata from "models/TrackzMetadata";
import { createContext, PropsWithChildren, useContext } from "react";

export interface Web3ContextInterface {
  trackzMetadata: TrackzMetadata[];
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

  const refetchTrackzs = async () => {
    await refetch();
  };

  return (
    <Web3Context.Provider
      value={{
        trackzMetadata: data || [],
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
  edition: EditionMetadata
): TrackzMetadata | undefined => {
  const parsedResult = EditionMetadataSchema.safeParse(edition);
  return parsedResult.success ? parsedResult.data : undefined;
};

const parseEditions = (editions: EditionMetadata[]): TrackzMetadata[] =>
  editions
    .map((edition) => parseEditionMetadata(edition))
    .filter((track) => track !== undefined)
    .reverse() as TrackzMetadata[];

// const metadataExample = {
//   supply: {
//     type: "BigNumber",
//     hex: "0x03e8",
//   },
//   metadata: {
//     name: "Bad Bird",
//     description: "The bad birds",
//     image:
//       "https://gateway.ipfscdn.io/ipfs/QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/0.png",
//     external_url: "",
//     id: {
//       type: "BigNumber",
//       hex: "0x00",
//     },
//     uri: "ipfs://QmPUc7L3tWvmnPbGbiJrjsP2QpBUo9HizdW49XCpUazNMJ/0",
//     animation_url:
//       "https://gateway.ipfscdn.io/ipfs/QmZKCbtkckwDW7zzy1jKc4ELAP4i9XyxfZGAu93Qvkeuem/1.mp3",
//     background_color: "",
//     attributes: [
//       {
//         trait_type: "type",
//         value: "electro",
//       },
//       {
//         trait_type: "author",
//         value: "Noctambul",
//       },
//     ],
//   },
// };
