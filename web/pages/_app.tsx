import { AudioProvider } from "context/AudioContext";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { Web3Provider } from "../context/Web3Context";
import "../styles/antd.less";
import "../styles/globals.less";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl="https://o0ptsixpl0cm.usemoralis.com:2053/server"
      appId="CsZwDbA5d8GV1E6MJdifBT5T1bNWS4NRAPy21UUy"
    >
      <Web3Provider>
        <AudioProvider>
          <Component {...pageProps} />
        </AudioProvider>
      </Web3Provider>
    </MoralisProvider>
  );
}

export default MyApp;
