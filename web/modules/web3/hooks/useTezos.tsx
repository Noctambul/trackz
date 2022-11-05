import { useQuery } from "@tanstack/react-query";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import TrackzMetadata from "common/models/TrackzMetadata";
import { useEffect, useState } from "react";
import isNumeric from "validator/lib/isNumeric";
import { string, z } from "zod";
import { Web3Interface } from "../context/Web3Context";

export default function useTezos(): Web3Interface {
  const Tezos = new TezosToolkit(
    "https://tezos-prod.cryptonomic-infra.tech:443"
    // "https://testnet-tezos.giganode.io/"
  );
  const [wallet, setWallet] = useState(
    new BeaconWallet({ name: "User Wallet" })
  );
  const [address, setAddress] = useState<string | undefined>();

  Tezos.setWalletProvider(wallet);

  useEffect(() => {
    (async () => {
      const activeAccount = await wallet.client.getActiveAccount();
      setAddress(activeAccount?.address);
    })();
  }, [wallet.client]);

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["trackzs"],
    async () => {
      // const res = await fetch("/api/trackzs");
      const res = await fetch(
        "https://api.rarible.org/v0.1/items/byCollection?collection=TEZOS:KT1Nftyfonxcp5wkZJj681kASiMYbWExd1qc"
      );

      if (!res.ok)
        throw new Error(`Server responds with status ${res.status} : ${res}`);

      const json: RaribleResponse = await res.json();
      return parseItems(json.items);
    }
  );

  async function connectWallet() {
    try {
      console.log("Requesting permissions...");
      const permissions = await wallet.client.requestPermissions();
      console.log("Got permissions:", permissions);
      setAddress(permissions.address);
    } catch (error) {
      console.error("Got error:", error);
    }
  }

  async function disconnectWallet() {
    try {
      await wallet.clearActiveAccount();
    } catch (e) {
      console.error(e);
    } finally {
      setAddress(undefined);
    }
  }

  async function refetchTrackzs() {
    await refetch();
  }

  return {
    trackzMetadata: data || [],
    isLoading: isLoading,
    isError: isError,
    address,
    connectWallet,
    disconnectWallet,
    refetchTrackzs,
  };
}

const ContentAnimationSchema = z.object({
  "@type": z.enum(["AUDIO", "IMAGE"]),
  available: z.boolean(),
  mimeType: z.string(),
  url: z.string(),
});

const attributeKeys = ["artist", "creator", "tags", "genres"] as const;

const RaribleItemSchema = z.object({
  creators: z.string().array(),
  deleted: z.boolean(),
  id: string(),
  lastUpdatedAt: z.string(),
  mintedAt: z.string(),
  meta: z.object({
    name: z.string(),
    description: z.string(),
    attributes: z.object({ key: z.string(), value: z.string() }).array(),
    content: ContentAnimationSchema.array()
      .nonempty()
      .refine((contents) =>
        contents.some(
          (c) => c["@type"] === "AUDIO",
          "There is no audio content associated to the Item"
        )
      ),
  }),
  supply: z.string().refine(isNumeric),
  tokenId: z.string().refine(isNumeric),
  totalStock: z.string().refine(isNumeric),
});

const RaribleResponseSchema = z.object({
  continuation: z.string(),
  items: RaribleItemSchema.array(),
});

type ContentAnimationMetadata = z.infer<typeof ContentAnimationSchema>;
type RaribleItemMetadata = z.infer<typeof RaribleItemSchema>;
type RaribleResponse = z.infer<typeof RaribleResponseSchema>;

const parseItemMetadata = (
  item: RaribleItemMetadata
): TrackzMetadata | undefined => {
  const result = RaribleItemSchema.safeParse(item);
  if (!result.success) {
    console.log(result.error, item);
    return;
  }

  return {
    id: parseInt(item.tokenId),
    name: item.meta.name,
    creator: item.creators[0],
    description: item.meta.description,
    totalSupply: parseInt(item.totalStock),
    musicUri: item.meta.content.find((c) => c["@type"] === "AUDIO")!.url,
    coverUri: item.meta.content.find((c) => c["@type"] === "IMAGE")?.url,
    tags: "",
    genres: [],
  };
};

const parseItems = (items: RaribleItemMetadata[]): TrackzMetadata[] =>
  items
    .map((item) => parseItemMetadata(item))
    .filter((trackz) => trackz !== undefined)
    .reverse() as TrackzMetadata[];
