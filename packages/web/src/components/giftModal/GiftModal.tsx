import Image from "next/image";
import { useState } from "react";
import GiftButton from "./ui/GiftButton";
import arrangementData from "@/data/arrangementData.json";
import { useRouter } from "next/router";
import useArrangementStore from "@/stores/arrangementStore";
import ActionSelect from "./phase/ActionSelect";
import SendForm from "./phase/SendForm";

type GiftPhase = "ACTION_SELECT" | "SEND_FORM";

/**
 * プレゼント用のモーダルを表示するコンポーネント
 * @returns
 */
const GiftModal = () => {
  const { closeGiftModal } = useArrangementStore((state) => ({
    closeGiftModal: state.closeGiftModal,
  }));
  const [giftPhase, setGiftPhase] = useState<GiftPhase>("ACTION_SELECT");

  const handleNext = () => setGiftPhase("SEND_FORM");
  const handleBack = () => setGiftPhase("ACTION_SELECT");

  const handleClose = () => closeGiftModal();

  return (
    <>
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="relative bg-[#414142] h-full w-full rounded-t-[50px]">
          {/* 内部 */}
          <div className="mx-12 mb-12">
            <div className="border-b-[2px] mx-[43%]">
              <button
                type="button"
                onClick={handleClose}
                className="block w-full h-[12px]"
              />
            </div>
            <>
              {giftPhase === "ACTION_SELECT" && (
                <>
                  <ActionSelect handleNext={handleNext} />
                </>
              )}
              {giftPhase === "SEND_FORM" && (
                <>
                  <SendForm handleBack={handleBack} />
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftModal;
