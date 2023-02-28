import Image from "next/image";
import { useState } from "react";
import GiftButton from "../ui/GiftButton";
import arrangementData from "@/data/arrangementData.json";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";
import { useEffect } from "react";

type Props = {
  handleNext: () => void;
};

/**
 * ギフト画面の行動選択フェイズ。
 * @param param0
 * @returns
 */
const ActionSelect = ({ handleNext }: Props) => {
  const { closeGiftModal } = useArrangementStore((state) => ({
    closeGiftModal: state.closeGiftModal,
  }));

  const [imageUrl, setImageUrl] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== 'string') return;
    const newUrl = arrangementData.mockBagDataList[parseInt(router.query.bagId)].imageUrl;
    setImageUrl(newUrl)
  }, [router.query.bagId])


  const handleEditContents = () => router.push(`/bags/${router.query.bagId}/`);
  const handleEditAppearance = () =>
    router.push(`/bags/${router.query.bagId}/decoration`);
  const handleCancel = () => closeGiftModal();

  return (
    <>
      {/* <p>{arrangementData.mockBagDataList[bagId].title}</p> */}
      <p className="text-center text-white text-[36px] pt-6 font-scandia-web-500">
        {"Bag name"}
      </p>

      <div className="h-[30vh] p-8">
        <div className="relative h-full">
          {imageUrl && <Image
            src={imageUrl}
            alt={'bag'}
            fill
            style={{ objectFit: "contain" }}
          />}
        </div>
      </div>
      <div className="grid gap-4">
        <GiftButton
          text="Gift as it is"
          isInverse={false}
          onClick={handleNext}
        />
        <GiftButton
          text="Edit contents"
          isInverse={true}
          onClick={handleEditContents}
        />
        <GiftButton
          text="Edit appearance"
          isInverse={true}
          onClick={handleEditAppearance}
        />
        <GiftButton text="Cancel" isInverse={true} onClick={handleCancel} />
      </div>
    </>
  );
};

export default ActionSelect;
