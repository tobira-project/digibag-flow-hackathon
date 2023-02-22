import {
  PlacedItemData,
  ItemType,
  CropData,
  ItemSizeData,
} from "@/types/decorationItemType";
import { Euler, Quaternion, Vector, Vector3 } from "three";
import { create } from "zustand";

type DecorationState = {
  // raycasterの衝突点
  // 検証用に作成。缶バッジの配置には不要になるかも。
  rayHitPos: Vector3;
  setRayHitPos: (v: Vector3) => void;
  // 缶バッジの向き
  // 検証用に作成。
  modelLookDir: Vector3;
  setModelLookDir: (v: Vector3) => void;

  // 配置されたグッズのデータ
  placedItems: PlacedItemData[];
  placeNewItem: (
    srcUrl: string,
    itemType: ItemType,
    cropData: CropData,
    itemId?: string
  ) => void;
  putBackItem: (itemId: string) => void;

  // アイテムのサイズデータ。アイテム生成時にwebgl側で寸法を取得・データを設定する。
  itemSizeData: ItemSizeData;
  setItemSize: (itemId: string, size: Vector3) => void;
};

/**
 * zustandによるdecorationページの状態管理
 */
const useDecorationStore = create<DecorationState>((set) => ({
  // raycasterの衝突点
  rayHitPos: new Vector3(0),
  setRayHitPos: (v) => set(() => ({ rayHitPos: v.clone() })),
  // 缶バッジの向き
  modelLookDir: new Vector3(),
  setModelLookDir: (v) => set(() => ({ modelLookDir: v.clone() })),

  // 配置されたグッズのデータ
  placedItems: [],
  placeNewItem: (srcUrl, itemType, cropData, itemId?) =>
    set((state) => {
      const newItems = [...state.placedItems];

      // 新規追加時、itemIdは新たに設定される
      // 現状はtimestampを利用。ハッシュ化などの変更可能性あり。
      const newId = itemId !== undefined ? itemId : Date.now().toString();

      newItems.push({
        id: newId,
        srcUrl,
        itemType,
        position: new Vector3(Math.random() * 6 - 3, Math.random() * 6 - 3, -7), // 要デフォルト値。バッグの表面というのが少し厄介そう
        lookDir: new Vector3(0, 1, 0), // 要デフォルト値。バッグの表面というのが少し厄介そう
        scale: 1.0, // 要デフォルト値。
        cropData,
      });

      // サイズデータについて、ここでは追加だけ行う。
      const newSizeData = state.itemSizeData;
      newSizeData[newId] = new Vector3();

      console.log(newItems);

      return { placedItems: newItems, itemSizeData: newSizeData };
    }),
  putBackItem: (id) =>
    set((state) => {
      // 未実装
      return {};
    }),

  // グッズのサイズデータ
  itemSizeData: {},
  setItemSize: (itemId, size) =>
    set((state) => {
      const newSizeData = state.itemSizeData;
      newSizeData[itemId] = size;
      return {
        itemSizeData: newSizeData,
      };
    }),
}));

export default useDecorationStore;
