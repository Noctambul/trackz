import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AudioProvider } from "context/AudioContext";
import "lib/augmented-types";
import type { AppProps } from "next/app";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
