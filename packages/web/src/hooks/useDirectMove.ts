import { DirectDownType } from "@/types/directMoveType";
import { Camera, ThreeEvent } from "@react-three/fiber";
import { FullGestureState } from "@use-gesture/react";
import { RefObject, useState } from "react";
import {
  Euler,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Vector2,
} from "three";
import useDecorationStore from "../stores/decorationStore";
import getWindowSize from "./getWindowSize";

// use-gestureの型に沿って定義
type DragType = (
  state: Omit<FullGestureState<"drag">, "event"> & {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
  }
) => void;

type HookType = (
  raycaster: Raycaster,
  cameraRef: RefObject<Camera>,
  itaBagRef: RefObject<Object3D> // 痛バッグの3Dモデル
) => {
  handleDirectDown: DirectDownType;
  handleDirectMove: DragType;
};

/**
 * 缶バッジ移動操作の処理をまとめたhook
 * @param raycaster CanvasのRaycaster
 * @param cameraRef Cameraのref
 * @param itaBagRef 痛バッグのref
 * @returns
 */
const useDirectMove: HookType = (raycaster, cameraRef, itaBagRef) => {
  const { selectedItemId, setItemPos, setItemLookDir, interactState, setInteractState } = useDecorationStore((state) => ({
    selectedItemId: state.selectedItemId,
    setItemPos: state.setItemPos,
    setItemLookDir: state.setItemLookDir,
    interactState: state.interactState,
    setInteractState: state.setInteractState,
  }));

  const { innerWidth, innerHeight } = getWindowSize();

  const handleDirectDown: DirectDownType = (ev, itemId) => {
    if (ev.button !== 0) return; // 左クリックでない
    if (selectedItemId !== itemId) return; // 選択状態のグッズでない
    if (interactState !== "NONE") return; // 他の操作中

    setInteractState("DIRECT_START")
  };

  const handleDirectMove: DragType = (state) => {
    state.event.preventDefault();

    if (state.pinching) {
      // ピンチ操作中はイベント発火をキャンセル
      state.cancel();
      return;
    }
    // refが紐づいていない
    if (!cameraRef.current || !itaBagRef.current) return;
    // ドラッグ操作開始or操作中
    if (interactState !== "DIRECT_START" && interactState !== "DIRECT_MOVING") return;
    // 移動終了処理
    if (state.last) {
      // 必要であれば、バッグにしまう処理を行う
      //
      setInteractState("NONE")
      return;
    }
    // 左クリックでない
    if (state.buttons !== 1) return;
    // 初回（要らない気がする）
    if (state.first) return;

    // raycastのために画面w,hを(-1~1, -1~1)に正規化
    const pointer = new Vector2(
      (state.xy[0] / innerWidth) * 2 - 1,
      -(state.xy[1] / innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(pointer, cameraRef.current);

    // raycastのターゲットを取得
    const intersects = raycaster.intersectObject(itaBagRef.current);
    // 衝突なし
    if (intersects.length === 0) return;

    const pointerTarget = intersects[0];

    // 接地面（法線ベクトル）の制限が必要であればここに書く。
    // 痛バッグの裏には付けられない など

    if (pointerTarget.face) {
      setItemLookDir(selectedItemId, pointerTarget.face.normal);
    }
    setItemPos(selectedItemId, pointerTarget.point);
    setInteractState("DIRECT_MOVING")
  };

  return { handleDirectDown, handleDirectMove };
};

export default useDirectMove;
