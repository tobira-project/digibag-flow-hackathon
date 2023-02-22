import { ThreeEvent } from "@react-three/fiber";

// useDirectMoveのhandleDirectDownの型
export type DirectDownType = (
  e: ThreeEvent<PointerEvent>,
  itemId: string
) => void;
