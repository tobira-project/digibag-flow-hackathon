import { useEffect, useState } from "react";

type HookType = () => {
  innerWidth: number;
  innerHeight: number;
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
    devicePixelRatio: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => {};
    }
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
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
