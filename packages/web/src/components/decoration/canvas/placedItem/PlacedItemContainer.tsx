import useDecorationStore from "@/stores/decorationStore";
import { useEffect } from "react";

/**
 * 痛バッグ上に設置しているグッズを表示するコンポーネント
 * @returns jsx
 */
const PlacedItemContainer = () => {
  const { placedItems } = useDecorationStore((state) => ({
    placedItems: state.placedItems,
  }));

  useEffect(() => {
    // テスト
    console.log(placedItems.length);
  }, [placedItems]);

  return <></>;
};

export default PlacedItemContainer;
