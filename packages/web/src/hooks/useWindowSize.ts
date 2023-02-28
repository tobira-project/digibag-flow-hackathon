import { useEffect, useState } from "react";
import globalData from "@/data/globalData.json";

type HookType = () => {
  innerWidth: number;
  innerHeight: number;
  displayWidth: number; // 描画領域の幅
  displayHeight: number; // 描画領域の高さ
  devicePixelRatio: number;
};

/**
 * 画面情報を取得するためのhook
 * @returns 画面情報のobject
 */
const useWindowSize: HookType = () => {
  const [windowSize, setWindowSize] = useState({
    innerWidth: 0,
    innerHeight: 0,
    displayWidth: 0,
    displayHeight: 0,
    devicePixelRatio: 0,
  });

  const { mediaBorder, pcWidth, pcHeight } = globalData;

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => {};
    }
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        displayWidth:
          window.innerWidth > mediaBorder ? pcWidth : window.innerWidth,
        displayHeight:
          window.innerWidth > mediaBorder ? pcHeight : window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
