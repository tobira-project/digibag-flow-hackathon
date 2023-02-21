import { Camera, Canvas } from "@react-three/fiber";
import { Mesh, Object3D, Raycaster } from "three";
import { useMemo, useRef } from "react";
import BagModel from "./BagModel";
import Environments from "./Environments";
import { useGesture } from "@use-gesture/react";
import useDirectMove from "@/libs/hooks/useDirectMove";
import CameraContainer from "./CameraContainer";
import TestRayPoint from "./test/TestRayPoint";
import getWindowSize from "@/libs/hooks/getWindowSize";
import { Stage, PerspectiveCamera } from "@react-three/drei";

// バッグの装飾画面
const DecorateCanvas = () => {
  const { innerWidth, innerHeight } = getWindowSize();

  // 各ユーザー操作のための定義
  const raycaster = useMemo(() => new Raycaster(), []);
  const cameraRef = useRef<Camera>(null);
  const pointerTargetRef = useRef<Mesh>(null);
  const { handleDirectMove } = useDirectMove(
    raycaster,
    cameraRef,
    pointerTargetRef
  );

  const bind = useGesture({
    onDrag: (state) => {
      // ドラッグ操作をしたとき、モデル上にオブジェクトを表示する
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
          <Stage adjustCamera={false}>
            <BagModel pointerTargetRef={pointerTargetRef} />
          </Stage>
          <TestRayPoint />
        </Canvas>
      </div>
    </>
  );
};

export default DecorateCanvas;
