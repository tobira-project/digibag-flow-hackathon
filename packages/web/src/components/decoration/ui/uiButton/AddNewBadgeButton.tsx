// import { TEST_IMAGE_SRC } from "@/constants/decorationConstants";
import useDecorationStore from "@/stores/decorationStore";
import decorationData from "../../../../data/decorationData.json";
import UIButton from "../../../global/UIButton";
import DecorateIcon from "../../../../../public/icon/decorate-icon.svg";

/**
 * テスト用に作成。缶バッジを追加するボタン
 * @returns
 */
const AddNewBadgeButton = () => {
  const { openCropWindow, openInventoryBag } = useDecorationStore((state) => ({
    openCropWindow: state.openCropWindow,
    openInventoryBag: state.openInventoryBag,
  }));

  // クリック時の処理
  const handleClick = () => {
    // クロップ画面を表示
    // openCropWindow({
    //   imageUrl: decorationData.testImageSrc,
    //   itemType: "CAN_BADGE",
    // });
    openInventoryBag();
  };

  return (
    <>
      <UIButton
        onClick={handleClick}
        className="bottom-btn-lg bottom-btn-gray p-[10px] pt-[12px]"
      >
        <DecorateIcon />
      </UIButton>
    </>
  );
};

export default AddNewBadgeButton;
