import useDecorationStore from "@/stores/decorationStore";
import { CropData, PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/directMoveType";
import { useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import {
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  Texture,
  Vector2,
  Vector3,
} from "three";
import PlacedItemImpl from "./PlacedItemImpl";

type Props = {
  itemData: PlacedItemData;
  srcModel: Group;
  handleDirectDown: DirectDownType;
};

const ModelItemImpl = ({ itemData, srcModel, handleDirectDown }: Props) => {
  const { itemSizeData, setItemSize } = useDecorationStore((state) => ({
    itemSizeData: state.itemSizeData,
    setItemSize: state.setItemSize,
  }));
  const [model, setModel] = useState<Group>();
  const [colorMap, setColorMap] = useState<Texture>(); // もしかしたらstate管理要らないかも

  // テクスチャのロード。指定されたurlをロードしたことがある場合、ロードは省略される。
  const srcMap = useTexture(itemData.srcUrl);

  // クロップのプレビューと同じ見た目にするために、テクスチャを変形する
  const transformMat = (mat: MeshStandardMaterial, crop: CropData) => {
    if (!mat.map) return;

    // テクスチャの重心を中央に。これ大事
    mat.map.center = new Vector2(0.5, 0.5);

    // scaling
    let repeatW;
    let repeatH;
    const cropRate = 0.773;
    let cropScale;
    if (crop.srcW > crop.srcH) {
      // 横長の場合
      const badgeScale = crop.srcH / crop.srcW;
      cropScale = crop.h / crop.srcH;
      repeatW = (badgeScale * cropScale) / cropRate;
      repeatH = cropScale / cropRate;
    } else {
      // 縦長の場合
      const badgeScale = crop.srcW / crop.srcH;
      cropScale = crop.w / crop.srcW;
      repeatW = cropScale / cropRate;
      repeatH = (badgeScale * cropScale) / cropRate;
    }
    mat.map.repeat = new Vector2(repeatW, repeatH);

    // offset x
    const srcX = crop.srcW / 2.0;
    const offX = crop.x - srcX;
    const offsetX = offX / crop.srcW;
    const badgeOffsetX = -0.1025 * cropScale;
    mat.map.offset.x = offsetX + badgeOffsetX;

    // offset y
    const srcY = crop.srcH / 2.0;
    const offY = crop.y - srcY;
    const offsetY = offY / crop.srcH;
    const badgeOffsetY = 0.0915 * cropScale;
    mat.map.offset.y = offsetY + badgeOffsetY;

    // テクスチャが逆さになるのを修正
    mat.map.flipY = false;
  }

  // 3Dモデルをcloneし、テクスチャの設定を行う
  const setupModel = (newMap: Texture) => {
    const newModel = srcModel.clone();
    if (itemData.itemType === "CAN_BADGE") {
      newModel.traverse((o: any) => {
        const mesh = o as Mesh;
        const mat = new MeshStandardMaterial();
        mat.map = newMap;
        transformMat(mat, itemData.cropData)
        mesh.material = mat;
      });
      return newModel;
    }
    return newModel;
  };

  // テクスチャに変更があったとき、モデルとテクスチャを再設定
  useEffect(() => {
    if (!srcMap) return;
    const newMap = srcMap.clone();
    const newModel = setupModel(newMap);
    setColorMap(newMap);
    setModel(newModel);
  }, [srcMap]);

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
  }, []);

  return (
    <>
      {model && colorMap && (
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
  );
};

export default ModelItemImpl;
