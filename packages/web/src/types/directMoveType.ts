import { ThreeEvent } from "@react-three/fiber";

// useDirectMoveのhandleDirectDownの型
export type DirectDownType = (
  ev: ThreeEvent<PointerEvent>,
  itemId: string
) => void;
