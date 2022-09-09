import { z } from "zod";

export default function useEnvironment() {
  const trackzEditionContract = z
    .string({
      required_error:
        "NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT is required as an environment variable",
    })
    .regex(/^0x[a-fA-F0-9]{40}$/g, {
      message:
        "NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT env variable should be a contract address",
    })
    .parse(process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);
  // const ipfsProviderUri = z
  //   .string({
  //     required_error:
  //       "NEXT_PUBLIC_IPFS_PROVIDER_URI is required as an environment variable",
  //   })
  //   .parse(process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);

  return { trackzEditionContract };
}
