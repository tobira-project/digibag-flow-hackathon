import useDecorationStore from "@/stores/decorationStore";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";
import decorationData from "../../../../data/decorationData.json";

/**
 * テスト用に作成。raycast衝突点に缶バッジを表示するコンポーネント。
 * @returns jsx
 */
const TestRayPoint = () => {
  // const { rayHitPos, modelLookDir } = useDecorationStore((state) => ({
  //   rayHitPos: state.rayHitPos,
  //   modelLookDir: state.modelLookDir,
  // }));
  const { scene: model } = useGLTF<string>(
    decorationData.itemModelSrc["CAN_BADGE"]
  );
  const { map, metalic, roughness } = useTexture({
    map: "/decoration/can-badge/can-badge_baseColor.png",
    metalic: "/decoration/can-badge/can-badge_metallic.png",
    roughness: "/decoration/can-badge/can-badge_roughness.png",
  });
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    // モデルの見た目を初期化
    model.traverse((o: any) => {
      const mesh = o as Mesh;
      const mat = new MeshStandardMaterial();
      mat.metalnessMap = metalic;
      mat.roughnessMap = roughness;
      mesh.material = mat;
    });
  }, [model, map, metalic, roughness]);

  // useEffect(() => {
  //   // 缶バッジをraycast衝突点の法線方向に向ける
  //   if (!groupRef.current) return;
  //   groupRef.current.lookAt(rayHitPos.sub(modelLookDir));
  // }, [modelLookDir]);

  return (
    <>
      <group
        ref={groupRef}
        // position={rayHitPos}
        scale={[1, 1, 1]}
      >
        <primitive object={model} />
      </group>
    </>
  );
};

export default TestRayPoint;
