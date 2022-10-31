import { useQuery } from "@tanstack/react-query";
import isNumeric from "validator/lib/isNumeric";
import { string, z } from "zod";
import { Web3Interface } from "../context/Web3Context";

export default function useTezos(): Web3Interface {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["trackzs"],
    async () => {
      // const res = await fetch("/api/trackzs");
      const res = await fetch(
        "https://api.rarible.org/v0.1/items/byCollection?collection=TEZOS:KT1Nftyfonxcp5wkZJj681kASiMYbWExd1qc"
      );

      if (!res.ok)
        throw new Error(`Server responds with status ${res.status} : ${res}`);

      const json = await res.json();
      debugger;

      return [];
    }
  );

  async function connectWallet() {}

  async function disconnectWallet() {}

  async function refetchTrackzs() {}

  return {
    trackzMetadata: [],
    isLoading: isLoading,
    isError: isError,
    address: undefined,
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

type ContentAnimationMetadata = z.infer<typeof ContentAnimationSchema>;

const RaribleItemSchema = z.object({
  creators: z.string().array(),
  deleted: z.boolean(),
  id: string(),
  lastUpdatedAt: z.date(),
  mintedAt: z.date(),
  meta: z.object({
    name: z.string(),
    description: z.string(),
    attributes: z.object({ key: z.string(), value: z.string() }).array(),
    content: ContentAnimationSchema.array(),
  }),
  supply: z.string().refine(isNumeric),
  tokenId: z.string().refine(isNumeric),
  totaStock: z.string().refine(isNumeric),
});

type RaribleItemMetadata = z.infer<typeof RaribleItemSchema>;

// const parseItemMetadata = ()
