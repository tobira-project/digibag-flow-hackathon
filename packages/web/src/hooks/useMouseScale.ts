import useDecorationStore from "@/stores/decorationStore";
import { DragType } from "@/types/gestureType";
import * as GESTURE from "@use-gesture/react";
import { useState } from "react";

/**
 * マウス操作による缶バッジ拡縮操作の処理をまとめたhook
 * @returns 
 */
const useMouseScale = () => {
  const { interactState, setInteractState, selectedItemId, getSelectedItem, setItemScale } = useDecorationStore((state) => ({
    interactState: state.interactState,
    setInteractState: state.setInteractState,
    selectedItemId: state.selectedItemId,
    getSelectedItem: state.getSelectedItem,
    setItemScale: state.setItemScale,
  }))
  const [startPos, setStartPos] = useState<GESTURE.Vector2>([0, 0]);
  const [startScale, setStartScale] = useState<number>(0);


  const handleScaleMove: DragType = (state) => {
    state.event.preventDefault();
    // 拡縮終了処理
    if (state.last) {
      setInteractState("NONE");
      return;
    }
    // 選択状態でない
    if (selectedItemId === '') return;
    // 右クリックでない
    if (state.buttons !== 2 || interactState === "DIRECT_START") return;

    const selectedItem = getSelectedItem();
    // 選択状態が不正
    if (!selectedItem) return;

    // 初回処理
    if (state.first) {
      setInteractState("MOUSE_SCALE_START");
      setStartPos(state.xy)
      setStartScale(selectedItem.scale);
      return;
    }

    // 拡縮操作開始or操作中が必要
    if (interactState !== "MOUSE_SCALE_START" && interactState !== "MOUSE_SCALING") return;

    const offset = [
      state.xy[0] - startPos[0],
      -(state.xy[1] - startPos[1])
    ]
    const scaleValue = (1 / Math.sqrt(2)) * (offset[0] + offset[1]);
    let newScale = startScale + scaleValue / 100.0

    // 最大値設定はここで行う
    //

    // スケールの更新
    setItemScale(selectedItemId, newScale)

    // 拡大による移動可能範囲からのはみ出しの制限が必要であればここで行う
    //

    setInteractState("MOUSE_SCALING");
  }

  return { handleScaleMove }
}

export default useMouseScale;