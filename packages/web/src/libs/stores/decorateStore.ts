import { Vector3 } from "three";
import { create } from "zustand";

type DecorateState = {
  // raycasterの衝突点
  // 検証用に作成。缶バッジの配置には不要になるかも。
  rayHitPos: Vector3;
  setRayHitPos: (v: Vector3) => void;
}

const useDecorateStore = create<DecorateState>((set) => ({
  // raycasterの衝突点
  rayHitPos: new Vector3(0),
  setRayHitPos: (v) => set(() => ({ rayHitPos: v.clone() }))
}))

export default useDecorateStore