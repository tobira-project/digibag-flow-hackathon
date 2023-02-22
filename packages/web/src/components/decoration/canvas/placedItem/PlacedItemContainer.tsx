import useDecorationStore from "@/stores/decorationStore";
import { DirectDownType } from "@/types/directMoveType";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect } from "react";
import GLBItem from "./GLBItem";

type Props = {
  handleDirectDown: DirectDownType
}

/**
 * 痛バッグ上に設置しているグッズを表示するコンポーネント
 * @returns jsx
 */
const PlacedItemContainer = ({ handleDirectDown }: Props) => {
  const { placedItems } = useDecorationStore((state) => ({
    placedItems: state.placedItems,
  }));

  return <>
    {placedItems.map((item) => {
      const params = {
        key: `${item.id}`,
        itemData: item,
      }
      return <GLBItem {...params} handleDirectDown={handleDirectDown} />
    })}
  </>;
};

export default PlacedItemContainer;
