import { BagModelMode } from "../decoration/bagModelMode";

declare module "*/decorationData.json" {
  type JSONType = {
    testImageSrc: string;
    itemModelSrc: {
      CAN_BADGE: string;
    };
    bagModelMode: BagModelMode;
    bagModelData: {
      [mode: BagModelMode]: {
        srcUrl: sring;
        posY: number;
        scale: number;
      }
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
