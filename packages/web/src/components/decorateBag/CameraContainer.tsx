import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Camera } from "@react-three/fiber";
import { RefObject } from "react";

type Props = {
  cameraRef: RefObject<Camera>;
};

const CameraContainer = ({ cameraRef }: Props) => {
  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 10, -20]} />
      <OrbitControls enableRotate={false} />
    </>
  );
};

export default CameraContainer;
