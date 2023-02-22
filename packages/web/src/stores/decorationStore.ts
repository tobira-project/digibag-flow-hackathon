import { PlacedItemData, ItemType, CropData } from "@/types/decorationItemType";
import { Euler, Vector3 } from "three";
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
}

const useDecorationStore = create<DecorationState>((set) => ({
  // raycasterの衝突点
  rayHitPos: new Vector3(0),
  setRayHitPos: (v) => set(() => ({ rayHitPos: v.clone() })),
  // 缶バッジの向き
  modelLookDir: new Vector3(),
  setModelLookDir: (v) => set(() => ({ modelLookDir: v.clone() })),
}))

export default useDecorationStore