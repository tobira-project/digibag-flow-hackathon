import { BagModelMode } from "../decoration/bagModelMode";

declare module "*/decorationData.json" {
  type JSONType = {
    testImageSrc: string;
    itemModelSrc: {
      CAN_BADGE: string;
    };
    bagMode: BagModelMode;
    bagModelData: {
      [mode: BagModelMode]: {
        srcUrl: sring;
        posY: number;
        scale: number;
        camPos: [x: number, y: number, z: number];
      };
    };
    scaleRate: {
      drag: number;
      pinch: number;
      wheel: number;
    };
  };
  const value: JSONType;
  export = value;
}
