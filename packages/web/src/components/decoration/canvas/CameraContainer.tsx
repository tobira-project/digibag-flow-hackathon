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
    isCameraMode: state.isCameraMode
  }))

  return (
    <>
      {/* PerspectiveCameraのpositionと、
      OrbitControlsのtargetを同座標にすると、
      方向が計算できなくて詰むので注意 */}
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 10, -20]} />
      <OrbitControls
        enableZoom={isCameraMode}
        enableRotate={isCameraMode}
        enablePan={false}
        
      />
    </>
  );
};

export default CameraContainer;
