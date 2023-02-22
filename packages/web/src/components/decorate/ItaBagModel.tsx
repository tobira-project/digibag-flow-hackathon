import { RefObject } from "react";
import { Mesh, Object3D } from "three";

type Props = {
  itaBagRef: RefObject<Object3D>;
};

/**
 * 痛バッグの3Dモデル表示のコンポーネント
 * @returns jsx
 */
const ItaBagModel = ({ itaBagRef }: Props) => {
  return (
    // 一旦meshで表示。後で痛バッグに差し替える
    <mesh ref={itaBagRef as RefObject<Mesh>} position={[0, 0, 0]}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
};

export default ItaBagModel;
