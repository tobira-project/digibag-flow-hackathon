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
    scene.background = new Color("fefefe");
  }, []);

  return (
    <>
      <ambientLight intensity={1} />
    </>
  );
};

export default Environments;
