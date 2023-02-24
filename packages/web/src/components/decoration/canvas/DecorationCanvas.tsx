import { Camera, Canvas } from "@react-three/fiber";
import { Mesh, Object3D, Raycaster } from "three";
import { createContext, RefObject, useMemo, useRef } from "react";
import ItaBagModel from "./ItaBagModel";
import Environments from "./Environments";
import { useGesture, usePinch } from "@use-gesture/react";
import useDirectMove from "@/hooks/useDirectMove";
import CameraContainer from "./CameraContainer";
import TestRayPoint from "./test/TestRayPoint";
import useWindowSize from "@/hooks/useWindowSize";
import { Stage } from "@react-three/drei";
import PlacedItemContainer from "./placedItem/PlacedItemContainer";
import useMouseScale from "@/hooks/useMouseScale";
import useDecorationStore from "@/stores/decorationStore";
import usePinchScale from "@/hooks/usePinchScale";
import useWheelScale from "@/hooks/useWheelScale";
import { DirectDownType } from "@/types/gestureType";

// 移動操作のイベントハンドラをPlacedItemImplコンポーネントに伝えるためのcontext
export const DirectMoveContext = createContext<DirectDownType>(() => { });

// グッズの初期座標・姿勢設定に利用するraycastに関する情報を伝えるためのcontext
type RaycastContextType = {
  raycaster: Raycaster;
  cameraRef: RefObject<Camera>;
  itaBagRef: RefObject<Object3D>;
} | undefined;
export const RaycastContext = createContext<RaycastContextType>(undefined);

/**
 * 痛バッグ装飾画面のCanvasのコンポーネント。
 * @returns jsx
 */
const DecorationCanvas = () => {
  const { selectItem } = useDecorationStore((state) => ({
    selectItem: state.selectItem,
  }));

  // 各ユーザー操作のための定義
  const raycaster = useMemo(() => new Raycaster(), []);
  const cameraRef = useRef<Camera>(null);
  const itaBagRef = useRef<Object3D>(null);
  const { handleDirectDown, handleDirectMove } = useDirectMove(
    raycaster,
    cameraRef,
    itaBagRef
  );
  const { handleScaleMove } = useMouseScale();
  const { handleScalePinch } = usePinchScale();
  const { handleScaleWheel } = useWheelScale();

  const bind = useGesture(
    {
      onDrag: (state) => {
        if (state.pinching) {
          state.cancel();
          return;
        }
        handleDirectMove(state);
        handleScaleMove(state);
      },
      onPinch: handleScalePinch,
      onWheel: handleScaleWheel,
    },
    { drag: { pointer: { buttons: [1, 2] } } } // 右ドラッグも許可（スケール用）
  );

  return (
    <>
      <div className="w-[100vw] h-[100vh]">
        <Canvas
          raycaster={raycaster}
          flat // テクスチャを元画像に近い色味で表示するための設定
          {...bind()}
          onPointerMissed={() => selectItem("")}
        >
          <Environments />
          <CameraContainer cameraRef={cameraRef} />
          {/* 勝手にカメラ位置を調整するのを止められれば、Stageは便利そう
           <Stage adjustCamera={false} center={{ disable: true }}> */}
          <ItaBagModel itaBagRef={itaBagRef} />
          <DirectMoveContext.Provider value={handleDirectDown}>
            <RaycastContext.Provider value={{ raycaster, cameraRef, itaBagRef }} >
              <PlacedItemContainer handleDirectDown={handleDirectDown} />
            </RaycastContext.Provider>
          </DirectMoveContext.Provider>
          <TestRayPoint />
          {/* </Stage> */}
        </Canvas>
      </div>
    </>
  );
};

export default DecorationCanvas;
