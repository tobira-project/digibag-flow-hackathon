// import { TEST_IMAGE_SRC } from "@/constants/decorationConstants";
import useDecorationStore from "@/stores/decorationStore";
import { CropData } from "@/types/decorationItemType";
import decorationData from "../../../../data/decorationData.json";

/**
 * テスト用に作成。缶バッジを追加するボタン
 * @returns
 */
const AddNewBadgeButton = () => {
  const { placeNewItem } = useDecorationStore((state) => ({
    placeNewItem: state.placeNewItem,
  }));

  const handleClick = () => {
    // クロップ画面を表示

    // // 缶バッジを追加する
    // const newCropData: CropData = {
    //   x: 110 + Math.random() * 60 - 30,
    //   y: 110 + Math.random() * 60 - 30,
    //   w: 220,
    //   h: 220,
    //   srcW: 220,
    //   srcH: 220,
    // };
    // placeNewItem(decorationData.testImageSrc, "CAN_BADGE", newCropData);
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
