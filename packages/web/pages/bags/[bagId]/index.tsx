import BagDetailContainer from "@/components/arrangement/bagDetail/BagDetailContainer";
import BagPreview from "@/components/arrangement/bagDetail/BagPreview";
import DecorationButton from "@/components/arrangement/bagDetail/DecorationButton";
import BackButton from "@/components/global/BackButton";
import GiftModal from "@/components/giftModal/GiftModal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";
import OpenGiftButton from "@/components/global/OpenGiftButton";
import { useEffect, useRef, useState } from "react";
import arrangementData from "@/data/arrangementData.json";
import PersonalizeBg from "@/components/arrangement/PersonalizeBg";
import ItemModal from "@/components/itemModal/ItemModal";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

/**
 * バッグの詳細ページ
 * @returns
 */
const BagDetail: NextPage = () => {
  const { isItemModalOpen, isGiftModalOpen } = useArrangementStore((state) => ({
    isItemModalOpen: state.isItemModalOpen,
    isGiftModalOpen: state.isGiftModalOpen,
  }));
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  // dynamic routingを利用してバッグのidを取得し、データをセットする
  useEffect(() => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== "string") return;
    const id = parseInt(router.query.bagId);

    const title = arrangementData.mockBagDataList[id].title;
    setTitle(title);

    const url = arrangementData.mockBagDataList[id].imageUrl;
    setImageUrl(url);
  }, [router.query.bagId]);

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

  // バッグ一覧へ戻る
  // （前のページに戻る方がよいかも？）
  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div ref={pageRef} className="page-top-container">
        <PersonalizeBg imageUrl={imageUrl} />
        <BackButton onClick={handleBack} className={"back-btn"} />
        <div className="h-full flex flex-col">
          <h1 className="mt-[10%] text-[40px] text-center align-top text-white font-scandia-web-500">
            {title}
          </h1>
          <div className="relative w-full h-[34%] p-4 mb-2 pointer-events-none">
            <OpenGiftButton className="absolute right-4 top-0 w-[56px] h-[56px]" />
            <div className="relative w-full h-full">
              {router.query.bagId && <BagPreview imageUrl={imageUrl} />}
            </div>
          </div>
          <div className="grow">
            <BagDetailContainer />
          </div>
          <div className="bottom-btn-container right-6">
            <DecorationButton />
          </div>
        </div>
      </div>
      {isItemModalOpen && <ItemModal />}
      {isGiftModalOpen && <GiftModal />}
    </>
  );
};

export default BagDetail;
