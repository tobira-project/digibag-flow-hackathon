import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { FlowProvider } from "context/flow";

export default function App({ Component, pageProps }: AppProps) {
  return <FlowProvider>
    <Component {...pageProps} />
  </FlowProvider>;
}
