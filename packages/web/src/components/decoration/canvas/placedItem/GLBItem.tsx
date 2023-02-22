import { PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/directMoveType";
import { useGLTF } from "@react-three/drei";
import ModelItemImpl from "./ModelItemImpl";
import decorationData from "../../../../data/decorationData.json";

type Props = {
  itemData: PlacedItemData;
  handleDirectDown: DirectDownType;
};

const GLBItem = ({ itemData, handleDirectDown }: Props) => {
  const { scene: model } = useGLTF(decorationData.modelSrc[itemData.itemType]);
  return (
    <>
      <ModelItemImpl
        itemData={itemData}
        srcModel={model}
        handleDirectDown={handleDirectDown}
      />
    </>
  );
};

export default GLBItem;
