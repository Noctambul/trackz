import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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

const theme = extendTheme({
  colors: {
    primary: "#EA8C04",
    bgc: "#000000",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
