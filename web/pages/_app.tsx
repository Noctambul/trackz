import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AudioProvider } from "context/AudioContext";
import { Web3Provider } from "context/Web3Context";
import "lib/augmented-types";
import type { AppProps } from "next/app";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Web3Provider>
        <AudioProvider>
          <Component {...pageProps} />
        </AudioProvider>
      </Web3Provider>
    </ThirdwebProvider>
  );
}

export default MyApp;
