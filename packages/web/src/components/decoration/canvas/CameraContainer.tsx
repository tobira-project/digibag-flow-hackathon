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
  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 10, -20]} />
      <OrbitControls
        // enableRotate={false}
        // enablePan={false}
        enabled={false}
      />
    </>
  );
};

export default CameraContainer;
