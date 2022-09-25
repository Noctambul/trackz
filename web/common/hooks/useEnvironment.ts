import { useConst } from "@chakra-ui/react";
import { z } from "zod";

export default function useEnvironment() {
  const trackzEditionContract = useConst(() =>
    z
      .string({
        required_error:
          "NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT is required as an environment variable",
      })
      .regex(/^0x[a-fA-F0-9]{40}$/g, {
        message:
          "NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT env variable should be a contract address",
      })
      .parse(process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT)
  );

  const isTestMode = useConst(() =>
    z
      .preprocess(
        (value) => value === "true",
        z.boolean({
          required_error: "NEXT_PUBLIC_TEST_MODE env variable is required",
          invalid_type_error:
            "NEXT_PUBLIC_TEST_MODE env variable should be a boolean",
        })
      )
      .parse(process.env.NEXT_PUBLIC_TEST_MODE)
  );

  // const environment = z
  //   .enum(["development", "production", "test"], {
  //     required_error: "NEXT_PUBLIC_ENVIRONMENT is required",
  //   })
  //   .parse(process.env.NEXT_PUBLIC_ENVIRONMENT);

  // const ipfsProviderUri = z
  //   .string({
  //     required_error:
  //       "NEXT_PUBLIC_IPFS_PROVIDER_URI is required as an environment variable",
  //   })
  //   .parse(process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);

  return { trackzEditionContract, isTestMode };
}
