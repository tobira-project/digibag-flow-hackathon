import { a, useSpring } from "@react-spring/web";
import BadgeCrop from "./BadgeCrop";
import CloseButton from "./CloseButton";
import decorationData from "@/data/decorationData.json";
import { CropData } from "@/types/decorationItemType";
import useDecorationStore from "@/stores/decorationStore";

/**
 * グッズのクロップ作業画面を表示するコンポーネント
 * @returns 
 */
const CropWindow = () => {
  const {
    placeNewItem,
    cropSrc,
    isCropWindowOpen,
    closeCropWindow,
    hideCropWindow,
  } = useDecorationStore((state) => ({
    placeNewItem: state.placeNewItem,
    cropSrc: state.cropSrc,
    isCropWindowOpen: state.isCropWindowOpen,
    closeCropWindow: state.closeCropWindow,
    hideCropWindow: state.hideCropWindow,
  }));

  // 開閉アニメーションの変数定義
  const { y } = useSpring({
    from: { y: "100vh" },
    to: { y: isCropWindowOpen ? "0" : "100vh" },
    config: { tension: 500, friction: 50 },
    onResolve: () => {
      if (isCropWindowOpen) return;
      hideCropWindow();
    },
  });

  // クロップ完了時の処理
  const handleCrop = (cropData: CropData) => {
    // クロップデータの設定
    if (cropSrc) {
      placeNewItem(cropSrc.imageUrl, cropSrc.itemType, cropData);
    } else {
      console.warn("cropSrc is undefined");
    }
    // クロップウィンドウを閉じる
    closeCropWindow();
  };

  return (
    <>
      <a.div className="absolute inset-0 z-[4]" style={{ y }}>
        <div className="crop-window">
          <div className="h-full p-8">
            <BadgeCrop
              url={decorationData.testImageSrc}
              func={handleCrop}
              className="relative w-full h-full"
            >
              <label htmlFor={``} className="crop-submit-btn">
                OK
              </label>
            </BadgeCrop>
          </div>
        </div>
        <CloseButton handleClick={closeCropWindow} />
      </a.div>
    </>
  );
};

export default CropWindow;
