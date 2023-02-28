import BagDetailContainer from "@/components/arrangement/bagDetail/BagDetailContainer";
import BagPreview from "@/components/arrangement/bagDetail/BagPreview";
import DecorationButton from "@/components/arrangement/bagDetail/DecorationButton";
import BackButton from "@/components/global/BackButton";
import GiftModal from "@/components/giftModal/GiftModal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";
import OpenGiftButton from "@/components/global/OpenGiftButton";
import { useEffect, useState } from "react";
import arrangementData from "@/data/arrangementData.json";
import PersonalizeBg from "@/components/arrangement/PersonalizeBg";
import ItemModal from "@/components/itemModal/ItemModal";

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

  // dynamic routingを利用してバッグのidを取得し、データをセットする
  useEffect(() => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== "string") return;
    const id = parseInt(router.query.bagId);

    const title = arrangementData.mockBagDataList[id].title;
    setTitle(title);

    const url = arrangementData.mockBagDataList[id].thumbnailUrl;
    setImageUrl(url);
  }, [router.query.bagId]);

  // バッグ一覧へ戻る
  // （前のページに戻る方がよいかも？）
  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div className="page-top-container">
        <PersonalizeBg imageUrl={imageUrl} />
        <BackButton onClick={handleBack} className={"back-btn"} />
        <div className="h-full flex flex-col">
          <h1 className="mt-[10%] text-[40px] text-center align-top text-white font-scandia-web-500">
            {title}
          </h1>
          <div className="relative w-full h-[30%] p-10 pointer-events-none">
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
