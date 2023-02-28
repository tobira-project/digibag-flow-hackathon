import Image from "next/image";
import { useRef, useState } from "react";
import GiftButton from "../ui/GiftButton";
import arrangementData from "@/data/arrangementData.json";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";
import GiftInput from "../ui/GiftInput";

type Props = {
  handleBack: () => void;
};

/**
 * ギフト画面の行動選択フェイズ。
 * @param param0
 * @returns
 */
const SendForm = ({ handleBack }: Props) => {
  const { closeGiftModal } = useArrangementStore((state) => ({
    closeGiftModal: state.closeGiftModal,
  }));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputRef.current) return;

    console.log(inputRef.current.value);
    // 送信処理 トランザクション作成
    //
    closeGiftModal();
  };

  return (
    <>
      <div className="h-[30vh] pt-12 pb-4">
        <div className="relative h-full">
          {/* <Image src={arrangementData.mockBagDataList[bagId].imageUrl} alt={'bag'} fill style={{ objectFit: "contain" }} /> */}
          <Image
            src={"/decoration/test/toruto.png"}
            alt={"bag"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <p className="text-center text-white text-[38px] font-scandia-web-500">
        {"Send to"}
      </p>
      <div className="grid gap-4 mt-6">
        <GiftInput inputRef={inputRef} />
        <GiftButton text="Send" isInverse={false} onClick={handleSend} />
        <GiftButton text="Back" isInverse={true} onClick={handleBack} />
      </div>
    </>
  );
};

export default SendForm;
