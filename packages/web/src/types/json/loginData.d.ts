declare module "*/loginData.json" {
  type BagData = {
    bagName: string;
    width: number;
    height: number;
  };

  type JSONType = {
    bgBag: BagData[];
  };

  const value: JSONType;
  export = value;
}
