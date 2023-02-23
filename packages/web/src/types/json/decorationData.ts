declare module "*/decorationData.json" {
  type JSONType = {
    testImageSrc: string;
    modelSrc: {
      CAN_BADGE: string;
    };
    scaleRate: {
      drag: number;
      pinch: number;
      wheel: number;
    }
  };
  const value: JSONType;
  export = value;
}
