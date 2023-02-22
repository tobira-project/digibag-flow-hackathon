import { Camera, Canvas } from "@react-three/fiber";
import { Mesh, Object3D, Raycaster } from "three";
import { useMemo, useRef } from "react";
import ItaBagModel from "./ItaBagModel";
import Environments from "./Environments";
import { useGesture } from "@use-gesture/react";
import useDirectMove from "@/hooks/useDirectMove";
import CameraContainer from "./CameraContainer";
import TestRayPoint from "./test/TestRayPoint";
import getWindowSize from "@/hooks/getWindowSize";
import { Stage } from "@react-three/drei";
import PlacedItemContainer from "./placedItem/PlacedItemContainer";

/**
 * 痛バッグ装飾画面のCanvasのコンポーネント。
 * @returns jsx
 */
const DecorationCanvas = () => {
  const { innerWidth, innerHeight } = getWindowSize();

  // 各ユーザー操作のための定義
  const raycaster = useMemo(() => new Raycaster(), []);
  const cameraRef = useRef<Camera>(null);
  const itaBagRef = useRef<Object3D>(null);
  const { handleDirectDown, handleDirectMove } = useDirectMove(
    raycaster,
    cameraRef,
    itaBagRef
  );

  const bind = useGesture({
    onDrag: (state) => {
      handleDirectMove(state);
    },
  });

  return (
    <>
      <div style={{ width: innerWidth, height: innerHeight }}>
        <Canvas
          raycaster={raycaster}
          flat // テクスチャを元画像に近い色味で表示するための設定
          {...bind()}
        >
          <Environments />
          <CameraContainer cameraRef={cameraRef} />
          {/* 勝手にカメラ位置を調整するのを止められれば、Stageは便利そう
           <Stage adjustCamera={false} center={{ disable: true }}> */}
          <ItaBagModel itaBagRef={itaBagRef} />
          <PlacedItemContainer handleDirectDown={handleDirectDown} />
          <TestRayPoint />
          {/* </Stage> */}
        </Canvas>
      </div>
    </>
  );
};

export default DecorationCanvas;
