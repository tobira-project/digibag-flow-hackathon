import useDecorationStore from "@/stores/decorationStore";
import CropWindow from "./crop/CropWindow";
import InventoryBag from "./selectItem/InventoryBag";
import AddNewBadgeButton from "./uiButton/AddNewBadgeButton";
import ExitButton from "./uiButton/ExitButton";
import PutBackButton from "./uiButton/PutBackButton";
import ToggleModeButton from "./uiButton/ToggleModeButton";

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
        <div className="absolute top-8">
          <ExitButton />
        </div>
        <div className="bottom-btn-container left-6">
          <PutBackButton />
        </div>
        <div className="bottom-btn-container w-[100vw] flex justify-center">
          <AddNewBadgeButton />
        </div>
        <div className="bottom-btn-container right-6">
          <ToggleModeButton />
        </div>
        {isInventoryBagOpen && <InventoryBag />}
        {isCropWindowVisible && <CropWindow />}
      </div>
    </>
  );
};

export default DecorationUI;
