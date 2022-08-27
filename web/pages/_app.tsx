import { AudioProvider } from "context/AudioContext";
import "lib/augmented-types";
import type { AppProps } from "next/app";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AudioProvider>
      <Component {...pageProps} />;
    </AudioProvider>
  );
}

export default MyApp;
