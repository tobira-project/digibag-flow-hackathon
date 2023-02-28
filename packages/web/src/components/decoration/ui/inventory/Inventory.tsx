import useDecorationStore from "@/stores/decorationStore";
import CloseButton from "./CloseButton";
import GridItems from "./GridItems";

/**
 * インベントリ（バッグ）のコンポーネント
 * @returns
 */
const InventoryBag = () => {
  const { closeInventoryBag } = useDecorationStore((state) => ({
    closeInventoryBag: state.closeInventoryBag,
  }));

  return (
    <>
      <div className={"absolute inset-0"}>
        <div className="flex justify-center h-full pt-[80%]">
          <div className="relative glass-white h-full w-full rounded-t-[50px]">
            <CloseButton onClick={closeInventoryBag} />
            <GridItems />
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryBag;
