import { Camera } from "@react-three/fiber";
import { FullGestureState } from "@use-gesture/react";
import { RefObject, useState } from "react";
import { Mesh, Object3D, PerspectiveCamera, Raycaster, Vector2 } from "three";
import useDecorateStore from "../stores/decorateStore";
import getWindowSize from "./getWindowSize";

// use-gestureの型に沿って定義
type DragState = (state: Omit<FullGestureState<"drag">, "event"> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
}) => void

type HookType = (
  raycaster: Raycaster,
  cameraRef: RefObject<Camera>,
  pointerTargetRef: RefObject<Object3D> // バッグの3Dモデル
) => { handleDirectMove: DragState }

const useDirectMove: HookType = (raycaster, cameraRef, pointerTargetRef) => {
  const { setRayHitPos } = useDecorateStore((state) => ({
    setRayHitPos: state.setRayHitPos,
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
    console.log(cameraRef.current?.position)
    if (!cameraRef.current) return;
    raycaster.setFromCamera(pointer, cameraRef.current)

    // raycastのターゲットを取得
    if (!pointerTargetRef.current) return;
    const intersects = raycaster.intersectObject(pointerTargetRef.current);
    if (intersects.length === 0) return; // 衝突なしなら処理終了
    const pointerTarget = intersects[0];

    // 接地面（法線ベクトル）の制限が必要であればここに書く。

    setRayHitPos(pointerTarget.point)
    console.log(pointerTarget.point)
  };

  return { handleDirectMove }
}

export default useDirectMove