import { Quaternion, Vector3 } from "three";

// グッズのタイプ
export type ItemType = "CAN_BADGE";

// テクスチャのクロップデータ
export type CropData = {
  x: number;
  y: number;
  w: number;
  h: number;
  srcW: number;
  srcH: number;
};

// 配置されたグッズのデータ
export type PlacedItemData = {
  id: string;
  srcUrl: string;
  itemType: ItemType;
  position: Vector3;
  // rotation設定用。設置面の法線方向を元に設定する。
  // lookAtを使う想定だが、これでは上下逆さまに貼るようなことができないので改善の余地あり。
  lookDir: Vector3;
  scale: number;
  cropData: CropData;
};

// PlacedItemDataのidに紐づいた、3Dモデルのサイズデータ
// モデル生成時に、webgl側で寸法を取得し設定する。
export type ItemSizeData = {
  [placedItemId: string]: Vector3;
};
