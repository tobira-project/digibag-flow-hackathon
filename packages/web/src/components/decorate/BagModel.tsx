import { RefObject } from "react";
import { Mesh, Object3D } from "three";

type Props = {
  pointerTargetRef: RefObject<Object3D>;
};

/**
 * バッグの装飾画面
 * バッグの3Dモデルの表示
 * @returns jsx
 */
const BagModel = ({ pointerTargetRef }: Props) => {
  return (
    // 一旦meshで表示。後でバッグに差し替える
    <mesh ref={pointerTargetRef as RefObject<Mesh>} position={[0, 0, 0]}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
};

export default BagModel;
