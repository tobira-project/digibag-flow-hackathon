import BagDetailContainer from "@/components/arrangement/bagDetail/BagDetailContainer";
import BagPreview from "@/components/arrangement/bagDetail/BagPreview";
import DecorationButton from "@/components/arrangement/bagDetail/DecorationButton";
import BackButton from "@/components/global/BackButton";
import GiftModal from "@/components/gift/GiftModal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";

/**
 * バッグの詳細ページ
 * @returns
 */
const BagDetail: NextPage = () => {
  const { isGiftModalOpen } = useArrangementStore((state) => ({
    isGiftModalOpen: state.isGiftModalOpen,
  }));

  const router = useRouter();
  console.log(router.query.bagId);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div>
        <BackButton onClick={handleBack} className={"back-btn"} />
        <div className="h-[100vh] flex flex-col">
          <h1 className="mt-[10vh] text-[40px] text-center align-top">title</h1>
          <div className="relative w-full h-[30vh] p-10 bg-green-100">
            {/* プレゼント */}

            {/* バッグ画像 */}
            <div className="relative w-full h-full">
              <BagPreview imageUrl="/decoration/test/toruto.png" />
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
