import { z } from "zod";

export default function useEnvironment() {
  // Set the variable to optional for the moment because Nextjs prerender the page and it seems that there is undefined env variables
  // @see https://vercel.com/noctambul/trackz/8XXumcPsUWm314iyn35M2tarazo1
  const trackzEditionContract = z
    .string({ description: "NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT" })
    .regex(/^0x[a-fA-F0-9]{40}$/g)
    .parse(process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);
  const ipfsProviderUri = z
    .string({ description: "NEXT_PUBLIC_IPFS_PROVIDER_URI" })
    .parse(process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);

  return { trackzEditionContract, ipfsProviderUri };
}
