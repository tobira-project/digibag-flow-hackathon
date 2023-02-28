import { create } from "zustand";
import arrangementData from "@/data/arrangementData.json";

type ItemData = {
  id: number;
  title: string;
  isDecorated: boolean;
};

type BagData = {
  id: number;
  title: string;
  address: string; // コントラクトアドレス(可能であれば)
  imageUrl: string; // メニューでの表示
  modelUrl: string; // 詳細での表示
  itemList: ItemData[]; // 内部のグッズ
};

type ArrangementState = {
  // バッグをグリッド表示するかどうか
  isGridBags: boolean;
  toggleIsGridBags: () => void;

  // 何度も読み込みたくないので、読み込んだデータはここに保存したい
  bagDataList: BagData[];

  // アカウントのモーダル表示の状態を管理する
  isAccountModalOpen: boolean;
  openAccountModal: () => void;
  closeAccountModal: () => void;

  // グッズのモーダル表示の状態を管理する
  selectedItemModalId: string;
  isItemModalOpen: boolean;
  openItemModal: (itemId: string) => void;
  closeItemModal: () => void;

  // ギフトのモーダル表示の状態を管理する
  isGiftModalOpen: boolean;
  openGiftModal: () => void;
  closeGiftModal: () => void;
};

/**
 * バッグ管理画面の状態管理
 */
const useArrangementStore = create<ArrangementState>((set, get) => ({
  // バッグをグリッド表示するかどうか
  isGridBags: false,
  toggleIsGridBags: () => set((state) => ({ isGridBags: !state.isGridBags })),

  bagDataList: arrangementData.mockBagDataList,

  // アカウントのモーダル表示の状態を管理する
  isAccountModalOpen: false,
  openAccountModal: () => set((state) => ({ isAccountModalOpen: true })),
  closeAccountModal: () => set((state) => ({ isAccountModalOpen: false })),

  // グッズのモーダル表示の状態を管理する
  selectedItemModalId: "",
  isItemModalOpen: false,
  openItemModal: (itemId) =>
    set((state) => ({ isItemModalOpen: true, selectedItemModalId: itemId })),
  closeItemModal: () => set((state) => ({ isItemModalOpen: false })),

  // ギフトのモーダル表示の状態を管理する
  isGiftModalOpen: false,
  openGiftModal: () => set((state) => ({ isGiftModalOpen: true })),
  closeGiftModal: () => set((state) => ({ isGiftModalOpen: false })),
}));

export default useArrangementStore;
