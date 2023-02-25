import "@/styles/globals.scss";
import "@/styles/index-tmp.css"; // temporary css file for demo
import type { AppProps } from "next/app";
import { MagicProvider } from "context/magic";

export default function App({ Component, pageProps }: AppProps) {
  return <MagicProvider>
    <Component {...pageProps} />
  </MagicProvider>;
}
