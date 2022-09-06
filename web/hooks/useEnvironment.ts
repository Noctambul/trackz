import { z } from "zod";

export default function useEnvironment() {
  console.log(
    "useEnvironment ",
    process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT,
    process.env
  );

  const trackzEditionContract = z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/g)
    .parse(process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);
  const ipfsProviderUri = z
    .string()
    .parse(process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);

  return { trackzEditionContract, ipfsProviderUri };
}
