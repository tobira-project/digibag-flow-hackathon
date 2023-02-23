import { FullGestureState } from "@use-gesture/react";
import { ThreeEvent } from "@react-three/fiber";

// use-gestureの型に沿って定義
export type DragType = (
  state: Omit<FullGestureState<"drag">, "event"> & {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
  }
) => void;

// useDirectMoveのhandleDirectDownの型
export type DirectDownType = (
  ev: ThreeEvent<PointerEvent>,
  itemId: string
) => void;
