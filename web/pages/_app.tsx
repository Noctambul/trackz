import type { AppProps } from "next/app";
import "../styles/globals.css";

Number.prototype.modulo = function (this: number, n: number) {
  return ((this % n) + n) % n;
};

declare global {
  interface Number {
    modulo: (n: number) => number;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
