import { TEST_IMAGE_SRC } from "@/constants/decorationConstants";
import useDecorationStore from "@/stores/decorationStore";
import { CropData } from "@/types/decorationItemType";

/**
 * テスト用に作成。缶バッジを追加するボタン
 * @returns
 */
const AddNewBadgeButton = () => {
  const { placeNewItem } = useDecorationStore((state) => ({
    placeNewItem: state.placeNewItem,
  }));

  const handleClick = () => {
    // 缶バッジを追加する
    const newCropData: CropData = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      srcW: 0,
      srcH: 0,
    };
    placeNewItem(TEST_IMAGE_SRC, "CAN_BADGE", newCropData);
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
