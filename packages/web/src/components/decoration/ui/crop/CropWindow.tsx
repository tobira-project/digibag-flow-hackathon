import BadgeCrop from "./BadgeCrop"
import CloseButton from "./CloseButton"
import decorationData from '@/data/decorationData.json'
import { CropData } from "@/types/decorationItemType"

const CropWindow = () => {

  const handleCrop = (cropData: CropData) => {

  }

  return <>
    <div
      className="absolute inset-0 z-[4]"
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
      <CloseButton />
    </div>
  </>
}

export default CropWindow