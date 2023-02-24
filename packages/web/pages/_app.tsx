import "@/styles/globals.scss";
import "@/styles/index-tmp.css"; // temporary css file for demo
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
