import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Web3Provider } from "context/Web3Context";
import "lib/augmented-types";
import { AudioProvider } from "modules/audio/context/AudioContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import chakraTheme from "../lib/chakra-theme/index";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  /* https://github.com/thirdweb-dev/js/tree/main/packages/react#advanced-configuration */
  const thirdwebProps = {
    desiredChainId: ChainId.Rinkeby,
    dAppMeta: {
      name: "Trackz",
      description: "Your sound on chain",
      logoUrl: "",
      url: "",
    },
    // storageInterface={new IpfsStorage("https://your.ipfs.host.com")}
  };

  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider {...thirdwebProps}>
          <Web3Provider>
            <AudioProvider>
              <Head>
                <link rel="shortcut icon" href="/favicon.png" />
              </Head>
              <Component {...pageProps} />
            </AudioProvider>
          </Web3Provider>
        </ThirdwebProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
