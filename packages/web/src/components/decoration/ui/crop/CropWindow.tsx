import { a, useSpring } from "@react-spring/web";
import BadgeCrop from "./BadgeCrop"
import CloseButton from "./CloseButton"
import decorationData from '@/data/decorationData.json'
import { CropData } from "@/types/decorationItemType"
import useDecorationStore from "@/stores/decorationStore";

const CropWindow = () => {
  const {
    isCropWindowOpen,
    closeCropWindow,
    hideCropWindow,
  } = useDecorationStore(
    (state) => ({
      isCropWindowOpen: state.isCropWindowOpen,
      closeCropWindow: state.closeCropWindow,
      hideCropWindow: state.hideCropWindow,
    })
  );

  const { y } = useSpring({
    from: { y: "100vh" },
    to: { y: isCropWindowOpen ? "0" : "100vh" },
    config: { tension: 500, friction: 50 },
    onResolve: () => {
      if (isCropWindowOpen) return;
      hideCropWindow();
    },
  });

  const handleCrop = (cropData: CropData) => {
    // クロップデータの設定
    //
    closeCropWindow();
  }

  return <>
    <a.div
      className="absolute inset-0 z-[4]"
      style={{ y }}
    >
      <div className="crop-window">
        <div className="h-full p-8">
          <BadgeCrop
            url={decorationData.testImageSrc}
            func={handleCrop}
            className="relative w-full h-full"
          >
            <label
              htmlFor={``}
              className="crop-submit-btn"
            >
              OK
            </label>
          </BadgeCrop>
        </div>
      </div>
      <CloseButton handleClick={closeCropWindow} />
    </a.div>
  </>
}

export default CropWindow