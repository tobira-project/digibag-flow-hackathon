import useDecorationStore from "@/stores/decorationStore";
import CropWindow from "./crop/CropWindow";
import InventoryBag from "./selectItem/InventoryBag";
import AddNewBadgeButton from "./test/AddNewBadgeButton";
import ToggleModeButton from "./test/ToggleModeButton";

/**
 * 装飾画面のUIを表示するコンポーネント
 * @returns
 */
const DecorationUI = () => {
  const { isCropWindowVisible, isInventoryBagOpen } = useDecorationStore(
    (state) => ({
      isCropWindowVisible: state.isCropWindowVisible,
      isInventoryBagOpen: state.isInventoryBagOpen,
    })
  );

  return (
    <>
      <div>
        <div className="absolute bottom-0 left-0">
          <AddNewBadgeButton />
        </div>
        <div className="absolute bottom-0 right-0">
          <ToggleModeButton />
        </div>
        {isInventoryBagOpen && <InventoryBag />}
        {isCropWindowVisible && <CropWindow />}
      </div>
    </>
  );
};

export default DecorationUI;
