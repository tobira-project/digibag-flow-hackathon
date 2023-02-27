import useDecorationStore from "@/stores/decorationStore";
import CropWindow from "./crop/CropWindow";
import InventoryBag from "./inventory/Inventory";
import AddNewBadgeButton from "./uiButton/AddNewBadgeButton";
import ExitButton from "./uiButton/ExitButton";
import PutBackButton from "./uiButton/PutBackButton";
import ToggleModeButton from "./uiButton/ToggleModeButton";
import arrangementData from "@/data/arrangementData.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useWindowSize from "@/hooks/useWindowSize";

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
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== "string") return;
    const newTitle =
      arrangementData.mockBagDataList[parseInt(router.query.bagId)].title;
    setTitle(newTitle);
  }, [router.query.bagId]);

  const { displayWidth } = useWindowSize();

  return (
    <>
      <div>
        <div className="absolute top-8">
          <ExitButton />
        </div>
        <div className="deco-title" style={{ width: displayWidth }}>
          <h1>{title}</h1>
        </div>
        <div className="bottom-btn-container  left-6">
          <PutBackButton />
        </div>
        <div
          className="bottom-btn-container flex justify-center"
          style={{ width: displayWidth }}
        >
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
