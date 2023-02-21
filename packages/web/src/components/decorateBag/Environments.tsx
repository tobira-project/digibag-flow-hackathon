import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Color } from "three";

/**
 * バッグの装飾画面
 * webgl上の環境光などを設定
 * @returns jsx
 */
const Environments = () => {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new Color("grey");
  }, []);

  return (
    <>
      <ambientLight intensity={1.0} />
    </>
  );
};

export default Environments;
