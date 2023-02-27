import useWindowSize from "@/hooks/useWindowSize";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import globalData from "@/data/globalData.json";

export default function App({ Component, pageProps }: AppProps) {
  const { innerWidth, innerHeight, displayWidth, displayHeight } = useWindowSize();
  const { mediaBorder, pcWidth, pcHeight } = globalData;

  return (
    <>
      <div className="absolute inset-0 z-[-100] bg-black/40">
        <div
          className="app-sp-display"
          style={{
            left: innerWidth > mediaBorder ? (innerWidth - pcWidth) / 2.0 : 0,
            top: innerWidth > mediaBorder ? (innerHeight - pcHeight) / 2.0 : 0,
            width: displayWidth,
            height: displayHeight
          }}
        >
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
