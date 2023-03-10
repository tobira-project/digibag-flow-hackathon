import UIButton from "../../../global/UIButton";
import PutBackIcon from "../../../../../public/icon/putback-icon.svg";
import useDecorationStore from "@/stores/decorationStore";
import { useEffect, useState } from "react";

/**
 * バッグにしまうボタン
 */
const PutBackButton = () => {
  const { selectedItemId, putBackItem, isCameraMode } = useDecorationStore(
    (state) => ({
      selectedItemId: state.selectedItemId,
      putBackItem: state.putBackItem,
      isCameraMode: state.isCameraMode,
    })
  );

  // 非選択状態、カメラモード時はボタンを非アクティブに
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(selectedItemId === "" || isCameraMode);
  }, [selectedItemId, isCameraMode]);

  // ボタンをクリックした時、バッグにしまう処理を実行
  const handleClick = () => {
    if (selectedItemId === "") return;
    putBackItem(selectedItemId);
  };

  return (
    <>
      <UIButton
        onClick={handleClick}
        className="bottom-btn-sm bottom-btn-gray overflow-hidden p-[12.5px] pt-[6px]"
        disabled={disabled}
      >
        <PutBackIcon />
      </UIButton>
    </>
  );
};

export default PutBackButton;
