import { useFBX, useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RefObject, useEffect, useState } from "react";
import { Group, Mesh, MeshStandardMaterial, Object3D, Texture } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import decorationData from '@/data/decorationData.json'

type Props = {
  itaBagRef: RefObject<Object3D>;
};

type ModelMode = 1 | 2 | 3;

/**
 * 痛バッグの3Dモデル表示のコンポーネント
 * @returns jsx
 */
const ItaBagModel = ({ itaBagRef }: Props) => {
  // const { scene: srcModel } = useLoader(GLTFLoader, '/model/bag01/bag01.glb')
  // const { scene: srcModel } = useLoader(GLTFLoader, '/model/bag02/bag02.glb')
  const modelMode = decorationData.bagModelMode;
  const { srcUrl, posY, scale } = decorationData.bagModelData[modelMode];
  const { scene: srcModel } = useGLTF(srcUrl)

  // #region bag03

  // const { scene: srcModel } = useGLTF('/model/bag03/bag03.glb')
  // const { srcMap, srcNormal } = useTexture({
  //   srcMap: '/model/bag03/texture/enamel_gara.png',
  //   srcNormal: '/model/bag03/texture/enamel_normal.png',
  // })

  // const [model, setModel] = useState<Group>();
  // bag03がうまく読めれば使用する
  // const [colorMap, setColorMap] = useState<Texture>();
  // const [normalMap, setNormalMap] = useState<Texture>();

  // bag03がうまく読めれば使用する
  // useEffect(() => {
  //   if (!srcModel || !srcMap || !srcNormal) return;
  //   const newModel = srcModel.clone();
  //   newModel.traverse((o: any) => {
  //     console.log(o.type)
  //     if (o.type !== "Mesh") return;
  //     const mesh = o as Mesh;
  //     const mat = new MeshStandardMaterial();
  //     console.log(mesh.material);
  //     // const mat = mesh.material
  //     // if (!('map' in mat)) {
  //       mat.map = srcMap.clone();
  //     mat.normalMap = srcNormal.clone();
  //     mesh.material = mat;
  //     // }
  //   });
  //   setModel(newModel);
  //   setModel(srcModel.clone());
  //   // setColorMap(srcMap.clone());
  //   // setNormalMap(srcNormal.clone());
  // }, [srcModel, srcMap, srcNormal])

  // #endregion

  return (
    <>
      {srcModel &&
        // 一旦meshで表示。後で痛バッグに差し替える
        // <mesh ref={itaBagRef as RefObject<Mesh>} position={[0, 0, 0]}>
        //   <sphereGeometry args={[10, 10, 10]} />
        //   <meshStandardMaterial color={"blue"} />
        // </mesh>
        <group position={[0, posY, 0]} scale={scale}>
          <primitive ref={itaBagRef} object={srcModel} />
        </group>
      }
    </>
  );
};

export default ItaBagModel;
