import { ThreeEvent } from "@react-three/fiber";

export type DirectDownType = (
  e: ThreeEvent<PointerEvent>,
  itemId: string
) => void;
