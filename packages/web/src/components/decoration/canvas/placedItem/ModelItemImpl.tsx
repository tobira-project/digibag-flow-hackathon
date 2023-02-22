import useDecorationStore from "@/stores/decorationStore";
import { PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/directMoveType";
import { useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Box3, Group, Mesh, MeshStandardMaterial, Texture, Vector2, Vector3 } from "three"
import PlacedItemImpl from "./PlacedItemImpl";

type Props = {
  itemData: PlacedItemData;
  srcModel: Group;
  handleDirectDown: DirectDownType;
}

const ModelItemImpl = ({ itemData, srcModel, handleDirectDown }: Props) => {
  const { itemSizeData, setItemSize } = useDecorationStore((state) => ({
    itemSizeData: state.itemSizeData,
    setItemSize: state.setItemSize,
  }))
  const [model, setModel] = useState<Group>();
  const [colorMap, setColorMap] = useState<Texture>(); // もしかしたらstate管理要らないかも

  // テクスチャのロード。指定されたurlをロードしたことがある場合、ロードは省略される。
  const srcMap = useTexture(itemData.srcUrl)

  // 3Dモデルをcloneし、テクスチャの設定を行う
  const setupModel = (newMap: Texture) => {
    const newModel = srcModel.clone();
    if (itemData.itemType === 'CAN_BADGE') {
      newModel.traverse((o: any) => {
        const mesh = o as Mesh;
        const mat = new MeshStandardMaterial();
        const crop = itemData.cropData;  // クロップは後で

        mat.map = newMap;
        mat.map.center = new Vector2(0.5, 0.5); // テクスチャの重心を中央に。これ大事
        // クロップ処理をここに書く
        // 
        mat.map.flipY = false;
        mesh.material = mat;
      })
      return newModel
    }
    return newModel
  }

  // テクスチャに変更があったとき、モデルとテクスチャを再設定
  useEffect(() => {
    if (!srcMap) return;
    const newMap = srcMap.clone();
    const newModel = setupModel(newMap);
    setColorMap(newMap);
    setModel(newModel)
  }, [srcMap])

  // サイズデータが既に設定されているかを判定する
  const isItemSizeZero = () =>
    itemSizeData[itemData.id].x === 0 &&
    itemSizeData[itemData.id].y === 0 &&
    itemSizeData[itemData.id].z === 0;

  // サイズデータの設定
  useEffect(() => {
    if (!isItemSizeZero()) return;
    const boundBox = new Box3().setFromObject(srcModel);
    setItemSize(itemData.id, boundBox.getSize(new Vector3()));
  }, [])

  return <>
    {(model && colorMap) && (
      <PlacedItemImpl itemData={itemData} handleDirectDown={handleDirectDown}>
        <primitive object={model} />
        {/** ↓なぜかこれを置くと、↑のテクスチャの色も濃くなる（テクスチャの初期化？） */}
        <mesh position={[0, 100, 100]}>
          <boxGeometry args={[0, 0, 0]} />
          <meshStandardMaterial map={colorMap} />
        </mesh>
      </PlacedItemImpl>
    )}
  </>
}

export default ModelItemImpl