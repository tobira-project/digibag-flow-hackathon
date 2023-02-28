import DecorationWindow from "@/components/decoration/DecorationWindow";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

/**
 * バッグの装飾ページ
 * @returns
 */
const DecorationPage: NextPage = () => {
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
      <div ref={pageRef} className="relative page-top-container">
        <DecorationWindow />
      </div>
    </>
  );
};

export default DecorationPage;
