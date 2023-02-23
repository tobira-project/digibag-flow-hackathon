import useDecorationStore from "@/stores/decorationStore";
import { PinchType } from "@/types/gestureType";
import { useState } from "react";

type HookType = () => {
  handleScalePinch: PinchType;
};

/**
 * スマホのピンチ操作による缶バッジの拡縮操作の処理をまとめたhook
 * @returns
 */
const usePinchScale: HookType = () => {
  const {
    interactState,
    setInteractState,
    selectedItemId,
    getSelectedItem,
    setItemScale,
  } = useDecorationStore((state) => ({
    interactState: state.interactState,
    setInteractState: state.setInteractState,
    selectedItemId: state.selectedItemId,
    getSelectedItem: state.getSelectedItem,
    setItemScale: state.setItemScale,
  }));

  const [startDist, setStartDist] = useState<number>(0);
  const [startScale, setStartScale] = useState<number>(0);

  const handleScalePinch: PinchType = (state) => {
    state.event.preventDefault();
    // 拡縮終了処理
    if (state.last) {
      setInteractState("NONE");
      return;
    }
    // 選択状態でない
    if (selectedItemId === "") return;

    const selectedItem = getSelectedItem();
    // 選択状態が不正
    if (!selectedItem) return;

    // 初回処理
    if (state.first) {
      setStartDist(state.da[0]);
      setStartScale(selectedItem.scale);
      setInteractState("PINCH_SCALE_START");
      return;
    }

    // 拡縮操作開始or操作中が必要
    if (
      interactState !== "PINCH_SCALE_START" &&
      interactState !== "PINCH_SCALING"
    )
      return;

    const offset = state.da[0] - startDist;
    let newScale = startScale + offset / 100.0;

    // 最大値設定はここで行う
    //

    // スケールの更新
    setItemScale(selectedItemId, newScale);

    setInteractState("PINCH_SCALING");
  };

  return { handleScalePinch };
};

export default usePinchScale;
