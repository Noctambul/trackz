import { AudioProvider } from "context/AudioContext";
import type { AppProps } from "next/app";
import { Web3Provider } from "../context/Web3Context";
import "../styles/antd.less";
import "../styles/globals.less";

Number.prototype.modulo = function (this: number, n: number) {
  return ((this % n) + n) % n;
};

declare global {
  interface Number {
    modulo: (n: number) => number;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </Web3Provider>
  );
}

export default MyApp;
