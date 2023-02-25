import useDecorationStore from "@/stores/decorationStore";
import GLBItem from "./GLBItem";

/**
 * 痛バッグ上に設置するグッズ表示をまとめたコンポーネント
 * @returns jsx
 */
const PlacedItemContainer = () => {
  const { placedItems } = useDecorationStore((state) => ({
    placedItems: state.placedItems,
  }));

  return (
    <>
      {placedItems.map((item) =>
        <GLBItem key={item.id} itemData={item} />
      )}
    </>
  );
};

export default PlacedItemContainer;
