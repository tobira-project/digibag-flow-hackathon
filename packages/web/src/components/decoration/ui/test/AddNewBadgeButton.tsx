// import { TEST_IMAGE_SRC } from "@/constants/decorationConstants";
import useDecorationStore from "@/stores/decorationStore";
import { CropData } from "@/types/decorationItemType";
import decorationData from "../../../../data/decorationData.json";

/**
 * テスト用に作成。缶バッジを追加するボタン
 * @returns
 */
const AddNewBadgeButton = () => {
  const { placeNewItem, openCropWindow } = useDecorationStore((state) => ({
    placeNewItem: state.placeNewItem,
    openCropWindow: state.openCropWindow,
  }));

  const handleClick = () => {
    // クロップ画面を表示
    openCropWindow({
      imageUrl: decorationData.testImageSrc,
      itemType: "CAN_BADGE"
    })
  };
  return (
    <>
      <div className="bg-white rounded-full h-10 grid content-center">
        <button type="button" onClick={handleClick}>
          缶バッジを追加
        </button>
      </div>
    </>
  );
};

export default AddNewBadgeButton;
