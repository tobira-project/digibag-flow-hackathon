import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

/**
 * グッズ詳細モーダル内のボタン
 * @param param0
 * @returns
 */
const ItemModalButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className={"item-modal-btn"}>
      <div className="item-modal-btn-inner">{children}</div>
    </button>
  );
};

export default ItemModalButton;
