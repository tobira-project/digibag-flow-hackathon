import useWindowSize from "@/hooks/useWindowSize";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { FlowProvider } from "context/flow";
import globalData from "@/data/globalData.json";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const { innerWidth, innerHeight, displayWidth, displayHeight } =
    useWindowSize();
  const { mediaBorder, pcWidth, pcHeight } = globalData;

  return (
    <>
      <Head>
        <title>DigiBag</title>
      </Head>
      {/* フォントのロード */}
      <Script id="font-load">
        {`(function(d) {
          var config = {
            kitId: 'ysy1ycw',
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a = this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){ }};s.parentNode.insertBefore(tk,s)
        })(document);`}
      </Script>

      <FlowProvider>
        <div className="absolute inset-0 z-[-100] bg-black/40">
          <div
            className="app-sp-display"
            style={{
              left: innerWidth > mediaBorder ? (innerWidth - pcWidth) / 2.0 : 0,
              top:
                innerWidth > mediaBorder ? (innerHeight - pcHeight) / 2.0 : 0,
              width: displayWidth,
              height: displayHeight,
            }}
          >
            <Component {...pageProps} />
          </div>
        </div>
      </FlowProvider>
    </>
  );
}
