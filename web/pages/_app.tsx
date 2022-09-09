import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AudioProvider } from "context/AudioContext";
import { Web3Provider } from "context/Web3Context";
import "lib/augmented-types";
import type { AppProps } from "next/app";
import chakraTheme from "../lib/chakra-theme";
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

  return (
    <ChakraProvider theme={chakraTheme}>
      <ThirdwebProvider {...thirdwebProps}>
        <Web3Provider>
          <AudioProvider>
            <Component {...pageProps} />
          </AudioProvider>
        </Web3Provider>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
