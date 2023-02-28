import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Color } from "three";

/**
 * webgl上の環境光などをまとめたコンポーネント
 * @returns jsx
 */
const Environments = () => {
  const { scene } = useThree();
  useEffect(() => {
    // SkyBoxの色設定
    scene.background = new Color("#f2f2f2");
  }, []);

  return (
    <>
      <ambientLight intensity={1} />
    </>
  );
};

export default Environments;
