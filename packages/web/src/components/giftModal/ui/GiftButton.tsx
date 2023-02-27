type Props = {
  text: string;
  onClick: () => void;
  isInverse: boolean;
};

/**
 * ギフトモーダル内のボタン
 * @param param0
 * @returns
 */
const GiftButton = ({ onClick, text, isInverse }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${isInverse ? "gift-btn-inverse" : "gift-btn"}`}
    >
      {text}
    </button>
  );
};

export default GiftButton;
