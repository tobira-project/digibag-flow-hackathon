import { PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/gestureType";
import { useGLTF } from "@react-three/drei";
import ModelItemImpl from "./ModelItemImpl";
import decorationData from "@/data/decorationData.json";

type Props = {
  itemData: PlacedItemData;
};

/**
 * 痛バッグ上に設置するグッズについて、glb形式の3Dモデルのグッズを表示するコンポーネント
 * @param param0
 * @returns
 */
const GLBItem = ({ itemData }: Props) => {
  const { scene: model } = useGLTF(decorationData.modelSrc[itemData.itemType]);
  return (
    <>
      <ModelItemImpl
        itemData={itemData}
        srcModel={model}
      />
    </>
  );
};

export default GLBItem;
