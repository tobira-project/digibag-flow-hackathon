import BottomNavigation from "@/components/arrangement/bagSelect/bottomNavigation/BottomNavigation";
import CarouselBagDisplay from "@/components/arrangement/bagSelect/carousel/CarouselBagDisplay";
import GridBagDisplay from "@/components/arrangement/bagSelect/grid/GridBagDisplay";

import useArrangementStore from "@/stores/arrangementStore";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * バッグの一覧表示のページコンポーネント
 * @returns
 */
const Home = () => {
  const { isGridBags } = useArrangementStore((state) => ({
    isGridBags: state.isGridBags,
    toggleIsGridBags: state.toggleIsGridBags,
  }));
  const pageRef = useRef<HTMLDivElement>(null);

  // スクロールのロック
  useEffect(() => {
    if (!pageRef.current) return;

    disableBodyScroll(pageRef.current, {
      allowTouchMove: (el: HTMLElement | Element) => {
        // dataset-allowscroll="true" を持った要素のみ
        // スクロールを許可する（torutoによる許可条件の定義）
        while (el && el !== document.body) {
          if ("dataset" in el) {
            if (el.dataset.allowscroll) {
              return true;
            }
          }
          if (!el.parentElement) break;
          el = el.parentElement;
        }
        return false;
      },
    });

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [pageRef.current]);

  return (
    <>
      <div ref={pageRef} className="page-top-container">
        {isGridBags ? (
          <>
            <CarouselBagDisplay />
          </>
        ) : (
          <>
            <GridBagDisplay />
          </>
        )}
      </div>
      <BottomNavigation />
    </>
  );
};

export default Home;
