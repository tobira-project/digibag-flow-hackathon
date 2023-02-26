import GiftIcon from "../../../public/decoration/icon/giftIcon.svg";

type Props = {
  className: string;
};

/**
 * ギフトモーダルの表示ボタンコンポーネント
 * @param param0
 * @returns
 */
const OpenGiftButton = ({ className }: Props) => {
  return (
    <>
      <button type={"button"} className={`open-gift-btn ${className}`}>
        <GiftIcon />
      </button>
    </>
  );
};

export default OpenGiftButton;
