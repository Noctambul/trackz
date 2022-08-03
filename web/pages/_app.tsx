import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AudioProvider } from "context/AudioContext";
import type { AppProps } from "next/app";
import { Web3Provider } from "../context/Web3Context";
import "../styles/globals.css";

Number.prototype.modulo = function (this: number, n: number) {
  return ((this % n) + n) % n;
};

declare global {
  interface Number {
    modulo: (n: number) => number;
  }
}

const theme = extendTheme({
  colors: {
    primary: "#EA8C04",
    bgc: "#000000",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <AudioProvider>
          <Component {...pageProps} />
        </AudioProvider>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
