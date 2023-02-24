import useDecorationStore from "@/stores/decorationStore";
import { DragType } from "@/types/decoration/gestureType";
import * as GESTURE from "@use-gesture/react";
import { useState } from "react";
import decorationData from "../data/decorationData.json";

/**
 * マウスの右ドラッグ操作による缶バッジ拡縮操作の処理をまとめたhook
 * @returns
 */
const useMouseScale = () => {
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
  const [startPos, setStartPos] = useState<GESTURE.Vector2>([0, 0]);
  const [startScale, setStartScale] = useState<number>(0);

  // ドラッグジェスチャーのイベントハンドル
  const handleScaleMove: DragType = (state) => {
    state.event.preventDefault();
    // 拡縮終了処理
    if (state.last) {
      setInteractState("NONE");
      return;
    }
    // カメラモードの時
    if (isCameraMode) return;
    // 選択状態でない
    if (selectedItemId === "") return;
    // 右クリックでない
    if (state.buttons !== 2 || interactState === "DIRECT_START") return;

    const selectedItem = getSelectedItem();
    // 選択状態が不正
    if (!selectedItem) return;

    // 初回処理
    if (state.first) {
      setStartPos(state.xy);
      setStartScale(selectedItem.scale);
      setInteractState("MOUSE_SCALE_START");
      return;
    }

    // 拡縮操作開始or操作中が必要
    if (
      interactState !== "MOUSE_SCALE_START" &&
      interactState !== "MOUSE_SCALING"
    )
      return;

    // 実際の拡縮処理
    const offset = [state.xy[0] - startPos[0], -(state.xy[1] - startPos[1])];
    const scaleValue = (1 / Math.sqrt(2)) * (offset[0] + offset[1]);
    let newScale = startScale + scaleValue * decorationData.scaleRate.drag;

    // 最大値設定はここで行う
    //

    setItemScale(selectedItemId, newScale);

    // 操作状態の更新
    setInteractState("MOUSE_SCALING");
  };

  return { handleScaleMove };
};

export default useMouseScale;
