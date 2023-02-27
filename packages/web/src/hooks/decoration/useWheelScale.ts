import useDecorationStore from "@/stores/decorationStore";
import { WheelType } from "@/types/decoration/gestureType";
import { useState } from "react";
import decorationData from "@/data/decorationData.json";

type HookType = () => {
  handleScaleWheel: WheelType;
};

/**
 * マウスホイール操作による缶バッジの拡縮操作の処理をまとめたhook
 * @returns
 */
const useWheelScale: HookType = () => {
  const {
    interactState,
    setInteractState,
    selectedItemId,
    getSelectedItem,
    setItemScale,
    isCameraMode,
  } = useDecorationStore((state) => ({
    interactState: state.interactState,
    setInteractState: state.setInteractState,
    selectedItemId: state.selectedItemId,
    getSelectedItem: state.getSelectedItem,
    setItemScale: state.setItemScale,
    isCameraMode: state.isCameraMode,
  }));

  const [startScale, setStartScale] = useState<number>(0);

  // マウスホイールのイベントハンドル/
  const handleScaleWheel: WheelType = (state) => {
    // 拡縮終了処理
    if (state.last) {
      setInteractState("NONE");
      return;
    }
    // カメラモードの時
    if (isCameraMode) return;
    // 選択状態でない
    if (selectedItemId === "") return;

    const selectedItem = getSelectedItem();
    // 選択状態が不正
    if (!selectedItem) return;

    // 初回処理
    if (state.first) {
      setStartScale(selectedItem.scale);
      setInteractState("WHEEL_SCALE_START");
      return;
    }

    // 拡縮操作開始or操作中が必要
    if (
      interactState !== "WHEEL_SCALE_START" &&
      interactState !== "WHEEL_SCALING"
    )
      return;

    // 実際の拡縮処理
    const offset = -state.delta[1];
    let newScale = startScale + offset * decorationData.scaleRate.wheel;

    // 最大値設定はここで行う
    //

    setItemScale(selectedItemId, newScale);

    // 操作状態の更新
    setInteractState("WHEEL_SCALING");
  };

  return { handleScaleWheel };
};

export default useWheelScale;
