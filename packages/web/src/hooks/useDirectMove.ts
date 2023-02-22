import { Camera } from "@react-three/fiber";
import { FullGestureState } from "@use-gesture/react";
import { RefObject, useState } from "react";
import { Euler, Mesh, Object3D, PerspectiveCamera, Raycaster, Vector2 } from "three";
import useDecorationStore from "../stores/decorationStore";
import getWindowSize from "./getWindowSize";

// use-gestureの型に沿って定義
type DragState = (state: Omit<FullGestureState<"drag">, "event"> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
}) => void

type HookType = (
  raycaster: Raycaster,
  cameraRef: RefObject<Camera>,
  itaBagRef: RefObject<Object3D> // 痛バッグの3Dモデル
) => { handleDirectMove: DragState }

/**
 * 缶バッジ移動操作の処理をまとめたhook
 * @param raycaster CanvasのRaycaster
 * @param cameraRef Cameraのref
 * @param itaBagRef 痛バッグのref
 * @returns 
 */
const useDirectMove: HookType = (raycaster, cameraRef, itaBagRef) => {
  const { setRayHitPos, setModelLookDir } = useDecorationStore((state) => ({
    setRayHitPos: state.setRayHitPos,
    setModelLookDir: state.setModelLookDir
  }))

  const { innerWidth, innerHeight } = getWindowSize();

  const handleDirectMove = (
    state: Omit<FullGestureState<"drag">, "event"> & {
      event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    }) => {
    state.event.preventDefault();

    // raycastのために画面w,hを(-1~1, -1~1)に正規化
    const pointer = new Vector2(
      (state.xy[0] / innerWidth) * 2 - 1,
      -(state.xy[1] / innerHeight) * 2 + 1
    )

    if (!cameraRef.current) return;
    raycaster.setFromCamera(pointer, cameraRef.current)

    // raycastのターゲットを取得
    if (!itaBagRef.current) return;
    const intersects = raycaster.intersectObject(itaBagRef.current);
    if (intersects.length === 0) return; // 衝突なしなら処理終了
    const pointerTarget = intersects[0];

    // 接地面（法線ベクトル）の制限が必要であればここに書く。
    // 痛バッグの裏には付けられない など

    if (pointerTarget.face) {
      setModelLookDir(pointerTarget.face.normal)
    }
    setRayHitPos(pointerTarget.point)
  };

  return { handleDirectMove }
}

export default useDirectMove