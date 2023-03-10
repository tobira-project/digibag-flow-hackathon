import useDecorationStore from "@/stores/decorationStore";
import {
  PlacedItemData,
  CropData,
} from "@/types/decoration/decorationItemType";
import { useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import {
  Box3,
  Color,
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
};

/**
 * 痛バッグ上に設置するグッズについて、ロードされた3Dモデルデータを引数として受け、表示するコンポーネント
 * 3Dモデルの形式ごとにこのコンポーネントをラップして実装する。
 * @param param0
 * @returns
 */
const ModelItemImpl = ({ itemData, srcModel }: Props) => {
  const { itemSizeData, setItemSize, selectedItemId, isCameraMode } =
    useDecorationStore((state) => ({
      itemSizeData: state.itemSizeData,
      setItemSize: state.setItemSize,
      selectedItemId: state.selectedItemId,
      isCameraMode: state.isCameraMode,
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
    // 元-0.1025
    const badgeOffsetX = -0.1325 * cropScale;
    mat.map.offset.x = offsetX + badgeOffsetX;

    // offset y
    const srcY = crop.srcH / 2.0;
    const offY = crop.y - srcY;
    const offsetY = offY / crop.srcH;
    // 元0.0915
    const badgeOffsetY = 0.1215 * cropScale;
    mat.map.offset.y = offsetY + badgeOffsetY;

    // テクスチャが逆さになるのを修正
    mat.map.flipY = false;
  };

  // 3Dモデルをcloneし、テクスチャの設定を行う
  const setupModel = (newMap: Texture) => {
    const newModel = srcModel.clone();
    if (itemData.itemType === "CAN_BADGE") {
      newModel.traverse((o: any) => {
        if (o.type !== "Mesh") return;
        const mesh = o as Mesh;
        const mat = new MeshStandardMaterial();
        // テクスチャの設定
        mat.map = newMap;
        // クロップに沿ってテクスチャを変形
        transformMat(mat, itemData.cropData);
        // 設置した最初に選択状態の色にする。
        const color = "#ffa";
        mat.color = new Color(color);
        // メッシュにマテリアルを適用
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

  // グッズの選択状態が変化したとき、見た目を更新する
  useEffect(() => {
    if (!model) return;
    model.traverse((o: any) => {
      if (o.type !== "Mesh") return;
      const mesh = o as Mesh;
      const mat = mesh.material as MeshStandardMaterial;
      // 選択されているときだけ、色を変化させる
      const color =
        !isCameraMode && selectedItemId === itemData.id ? "#ffa" : "#fff";
      mat.color = new Color(color);
    });
  }, [selectedItemId, isCameraMode]);

  return (
    <>
      {model && colorMap && (
        <PlacedItemImpl itemData={itemData}>
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
