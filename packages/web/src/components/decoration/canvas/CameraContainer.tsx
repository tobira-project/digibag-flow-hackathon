import useDecorationStore from "@/stores/decorationStore";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Camera } from "@react-three/fiber";
import { RefObject } from "react";

type Props = {
  cameraRef: RefObject<Camera>;
};

/**
 * カメラをまとめたコンポーネント
 * @param param0
 * @returns
 */
const CameraContainer = ({ cameraRef }: Props) => {
  const { isCameraMode } = useDecorationStore((state) => ({
    isCameraMode: state.isCameraMode,
  }));

  return (
    <>
      {/* PerspectiveCameraのpositionと、
      OrbitControlsのtargetを同座標にすると、
      方向が計算できなくて詰むので注意 */}
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 6, -35]} />
      <OrbitControls
        enableZoom={isCameraMode}
        enableRotate={isCameraMode}
        enablePan={false}
        target={[0, 0, 0]}
        rotateSpeed={0.7}
        // 慣性の無効
        enableDamping={false}
        // 距離制限
        minDistance={10}
        maxDistance={40}
        // 上下方向の回り込み制限
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.3}
      />
    </>
  );
};

export default CameraContainer;
