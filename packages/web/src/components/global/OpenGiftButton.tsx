import useArrangementStore from "@/stores/arrangementStore";
import GiftIcon from "../../../public/icon/gift-icon.svg";

type Props = {
  className: string;
};

/**
 * ギフトモーダルの表示ボタンコンポーネント
 * @param param0
 * @returns
 */
const OpenGiftButton = ({ className }: Props) => {
  const { openGiftModal } = useArrangementStore((state) => ({
    openGiftModal: state.openGiftModal,
  }));

  return (
    <>
      <button
        type={"button"}
        onClick={openGiftModal}
        className={`open-gift-btn ${className}`}
      >
        <GiftIcon />
      </button>
    </>
  );
};

export default OpenGiftButton;
