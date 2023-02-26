import BagDetailContainer from "@/components/arrangement/bagDetail/BagDetailContainer";
import BagPreview from "@/components/arrangement/bagDetail/BagPreview";
import DecorationButton from "@/components/arrangement/bagDetail/DecorationButton";
import BackButton from "@/components/global/BackButton";
import GiftModal from "@/components/gift/GiftModal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";
import OpenGiftButton from "@/components/global/OpenGiftButton";
import { useEffect, useState } from "react";
import arrangementData from "@/data/arrangementData.json"
import PersonalizeBg from "@/components/arrangement/bagDetail/PersonalizeBg";

/**
 * バッグの詳細ページ
 * @returns
 */
const BagDetail: NextPage = () => {
  const { isGiftModalOpen } = useArrangementStore((state) => ({
    isGiftModalOpen: state.isGiftModalOpen,
  }));

  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== 'string') return;
    const id = parseInt(router.query.bagId);
    const url = arrangementData.mockBagDataList[id].thumbnailUrl
    setImageUrl(url);
  }, [router.query.bagId])

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div>
        <PersonalizeBg />
        <BackButton onClick={handleBack} className={"back-btn"} />
        <div className="h-[100vh] flex flex-col">
          <h1 className="mt-[10vh] text-[40px] text-center align-top">title</h1>
          <div className="relative w-full h-[30vh] p-10 bg-green-100">
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
      {isGiftModalOpen && <GiftModal />}
    </>
  );
};

export default BagDetail;
