import {
  PlacedItemData,
  ItemType,
  CropData,
  ItemSizeData,
} from "@/types/decorationItemType";
import { Vector, Vector3 } from "three";
import { create } from "zustand";

// ユーザーによるグッズの操作状態
type InteractState = "NONE" | "DIRECT_START" | "DIRECT_MOVING";

type DecorationState = {
  // 配置されたグッズのデータ
  placedItems: PlacedItemData[];
  placeNewItem: (
    srcUrl: string,
    itemType: ItemType,
    cropData: CropData,
    itemId?: string
  ) => void;
  putBackItem: (itemId: string) => void;

  // 配置されたグッズのデータ更新系
  setItemPos: (itemId: string, pos: Vector3) => void;
  setItemLookDir: (itemId: string, dir: Vector3) => void;

  // アイテムのサイズデータ。アイテム生成時にwebgl側で寸法を取得・データを設定する。
  itemSizeData: ItemSizeData;
  setItemSize: (itemId: string, size: Vector3) => void;

  // placedItems中の選択状態のitemとid
  // 更新の検知はidで行いたいが、item自体にアクセスする機会も頻繁にある
  selectedItemId: string;
  selectItem: (itemId: string) => void;

  // ユーザーの操作状態を管理する
  interactState: InteractState;
  setInteractState: (interact: InteractState) => void;
};

/**
 * zustandによるdecorationページの状態管理
 */
const useDecorationStore = create<DecorationState>((set, get) => ({
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

      // console.log(newItems);

      return { placedItems: newItems, itemSizeData: newSizeData };
    }),
  putBackItem: (id) =>
    set((state) => {
      // 未実装
      return {};
    }),

  // 配置されたグッズのデータ更新系
  setItemPos: (itemId, pos) => set((state) => {
    const index = state.placedItems.findIndex((v) => v.id === itemId);
    const newItems = state.placedItems;
    newItems[index].position = pos;
    return { placedItems: newItems }
  }),
  setItemLookDir: (itemId, dir) => set((state) => {
    const index = state.placedItems.findIndex((v) => v.id === itemId);
    const newItems = state.placedItems;
    newItems[index].lookDir = dir.clone();
    return { placedItems: newItems }
  }),

  // グッズのサイズデータ
  itemSizeData: {},
  setItemSize: (itemId, size) => set((state) => {
    const newSizeData = state.itemSizeData;
    newSizeData[itemId] = size;
    return {
      itemSizeData: newSizeData,
    };
  }),

  // placedItems中の選択状態のid
  selectedItemId: '',
  selectItem: (itemId) => set((state) => ({
    selectedItemId: itemId,
    selectedItem: state.placedItems.find(v => v.id === itemId)
  })),

  // ユーザーの操作状態を管理する
  interactState: 'NONE',
  setInteractState: (interact) => set((state) => ({ interactState: interact }))
}));



export default useDecorationStore;
