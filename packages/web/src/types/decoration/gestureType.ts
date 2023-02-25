import { FullGestureState, WebKitGestureEvent } from "@use-gesture/react";
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

// usePinchScaleのhandleScalePinchの型
export type PinchType = (
  state: Omit<FullGestureState<"pinch">, "event"> & {
    event: PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent;
  }
) => void;

// useWheelScaleのhandleScaleWheelの型
export type WheelType = (
  state: Omit<FullGestureState<"wheel">, "event"> & {
    event: WheelEvent;
  }
) => void;
