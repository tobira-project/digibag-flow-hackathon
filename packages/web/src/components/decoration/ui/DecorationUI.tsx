import CropWindow from "./crop/CropWindow";
import AddNewBadgeButton from "./test/AddNewBadgeButton";

/**
 * 装飾画面のUIを表示するコンポーネント
 * @returns
 */
const DecorationUI = () => {
  return (
    <>
      <div>
        <div className="absolute bottom-0 left-0">
          <AddNewBadgeButton />
        </div>
        <CropWindow />
      </div>
    </>
  );
};

export default DecorationUI;
