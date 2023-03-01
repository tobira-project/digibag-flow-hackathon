import {
  ItemType,
  PlacedItemData,
  CropData,
  ItemSizeData,
} from "@/types/decoration/decorationItemType";
import { Vector, Vector3 } from "three";
import { create } from "zustand";
import decorationData from '@/data/decorationData.json'

// ユーザーによるグッズの操作状態
type InteractState =
  | "NONE"
  | "DIRECT_START"
  | "DIRECT_MOVING"
  | "MOUSE_SCALE_START"
  | "MOUSE_SCALING"
  | "PINCH_SCALE_START"
  | "PINCH_SCALING"
  | "WHEEL_SCALE_START"
  | "WHEEL_SCALING";

// クロップウィンドウに渡されるソースデータ
type CropSrc = {
  imageUrl: string;
  itemType: ItemType;
};

type DecorationState = {
  // 配置されたグッズのデータ
  placedItems: PlacedItemData[];
  placeNewItem: (
    srcId: string,
    srcUrl: string,
    itemType: ItemType,
    cropData: CropData,
    itemId?: string
  ) => void;
  // グッズをインベントリ（バッグ）に戻す
  putBackItem: (itemId: string) => void;

  // 配置されたグッズのデータ更新系
  setItemPos: (itemId: string, pos: Vector3) => void;
  setItemLookDir: (itemId: string, dir: Vector3) => void;
  setItemScale: (itemId: string, scale: number) => void;

  // アイテムのサイズデータ。アイテム生成時にwebgl側で寸法を取得・データを設定する。
  itemSizeData: ItemSizeData;
  setItemSize: (itemId: string, size: Vector3) => void;

  // placedItems中の選択状態のitemとid
  // 更新の検知はidで行いたいが、item自体にアクセスする機会も頻繁にある
  selectedItemId: string;
  selectItem: (itemId: string) => void;
  getSelectedItem: () => PlacedItemData | undefined;
  // placedItems中の配列のインデックスを取得する
  getPlacedItemIndex: (itemId: string) => number;

  // ユーザーの操作状態を管理する
  interactState: InteractState;
  setInteractState: (interact: InteractState) => void;

  // グッズ操作/カメラ操作 モードの切り替え状態を管理する
  isCameraMode: boolean;
  toggleCameraMode: () => void;

  // クロップウィンドウの状態管理
  cropSrc: CropSrc | null;
  isCropWindowOpen: boolean;
  isCropWindowVisible: boolean;
  openCropWindow: (cropSrc: CropSrc) => void;
  closeCropWindow: () => void; // 閉じるアニメーション開始する
  hideCropWindow: () => void; // 非表示にする

  // インベントリ（バッグ）の状態管理
  isInventoryBagOpen: boolean;
  openInventoryBag: () => void;
  closeInventoryBag: () => void;
};

/**
 * zustandによるdecorationページの状態管理
 */
const useDecorationStore = create<DecorationState>((set, get) => ({
  // 配置されたグッズのデータ
  placedItems: [],
  placeNewItem: (srcId, srcUrl, itemType, cropData, itemId?) =>
    set((state) => {
      const newItems = [...state.placedItems];

      // 新規追加時、itemIdは新たに設定される
      // 現状はtimestampを利用。ハッシュ化などの変更可能性あり。
      const newId = itemId !== undefined ? itemId : Date.now().toString();

      newItems.push({
        id: newId,
        srcId,
        srcUrl,
        itemType,
        position: new Vector3(Math.random() * 6 - 3, Math.random() * 6 - 3, -7), // 要デフォルト値。バッグの表面というのが少し厄介そう
        lookDir: new Vector3(0, 1, 0), // 要デフォルト値。バッグの表面というのが少し厄介そう
        scale: 0.4, // 要デフォルト値。
        cropData,
      });

      // サイズデータについて、ここでは追加だけ行う。設定処理はモデル生成時
      const newSizeData = state.itemSizeData;
      newSizeData[newId] = new Vector3();

      return {
        placedItems: newItems,
        itemSizeData: newSizeData,
        selectedItemId: newId,
        isCameraMode: false,
      };
    }),
  // グッズをインベントリ（バッグ）に戻す
  putBackItem: (id) =>
    set((state) => {
      const newItems = state.placedItems.filter((v) => v.id !== id);

      return {
        placedItems: newItems,
        selectedItemId: "",
      };
    }),

  // 配置されたグッズのデータ更新系
  setItemPos: (itemId, pos) =>
    set((state) => {
      const index = state.getPlacedItemIndex(itemId);
      const newItems = state.placedItems;
      newItems[index].position = pos;
      return { placedItems: newItems };
    }),
  setItemLookDir: (itemId, dir) =>
    set((state) => {
      const index = state.getPlacedItemIndex(itemId);
      const newItems = state.placedItems;
      newItems[index].lookDir
        // = dir.clone();
        = new Vector3(dir.x, dir.y, dir.z)
      return { placedItems: newItems };
    }),
  setItemScale: (itemId, scale) =>
    set((state) => {
      const index = state.getPlacedItemIndex(itemId);
      const newItems = state.placedItems;

      // maxScaleとminScaleの間でスケールを設定する
      let newScale = scale;
      if (newScale < decorationData.minScale) {
        newScale = decorationData.minScale;
      } else if (newScale > decorationData.maxScale) {
        newScale = decorationData.maxScale;
      }
      newItems[index].scale = newScale;

      return { placedItems: newItems };
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

  // placedItems中の選択状態のid
  selectedItemId: "",
  selectItem: (itemId) =>
    set((state) => ({
      selectedItemId: itemId,
      selectedItem: state.placedItems.find((v) => v.id === itemId),
    })),
  getSelectedItem: () => {
    return get().placedItems.find((v) => v.id === get().selectedItemId);
  },
  // placedItems中の配列のインデックスを取得する
  getPlacedItemIndex: (itemId) => {
    return get().placedItems.findIndex((v) => v.id === get().selectedItemId);
  },

  // ユーザーの操作状態を管理する
  interactState: "NONE",
  setInteractState: (interact) => set((state) => ({ interactState: interact })),

  // グッズ操作/カメラ操作 モードの切り替え状態を管理する
  isCameraMode: false,
  toggleCameraMode: () =>
    set((state) => ({
      isCameraMode: !state.isCameraMode,
    })),

  // クロップウィンドウの状態管理
  cropSrc: null,
  isCropWindowOpen: false,
  isCropWindowVisible: false,
  openCropWindow: (cropSrc) =>
    set(() => ({ isCropWindowOpen: true, isCropWindowVisible: true, cropSrc })),
  closeCropWindow: () =>
    set(() => ({ isCropWindowOpen: false, cropSrc: null })),
  hideCropWindow: () => set(() => ({ isCropWindowVisible: false })),

  // インベントリ（バッグ）の状態管理
  isInventoryBagOpen: false,
  openInventoryBag: () => set((state) => ({ isInventoryBagOpen: true })),
  closeInventoryBag: () => set((state) => ({ isInventoryBagOpen: false })),
}));

export default useDecorationStore;
