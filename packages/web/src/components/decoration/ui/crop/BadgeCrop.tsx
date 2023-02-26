import { CropData } from "@/types/decoration/decorationItemType";
import Jimp from "jimp";
import { FC, ReactNode, useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";

/**
 * 未使用。
 * 缶バッジのクロップ機能を実装するコンポーネント
 * 完了ボタンクリック時に、引数funcに与えられた処理を実行する
 * @param param0
 * @returns
 */
const BadgeCrop: FC<{
  url: string;
  func: (bounds: CropData) => any;
  className?: string;
  children: ReactNode;
}> = ({ url, func, className, children }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  // 完了ボタンクリック時の処理
  const submit = async () => {
    if (!crop || !croppedAreaPixels) return;

    // クロップデータの作成
    const img = await Jimp.read(url);
    const srcW = img.getWidth();
    const srcH = img.getHeight();

    const cropData: CropData = {
      x: croppedAreaPixels.x + croppedAreaPixels.width / 2.0,
      y: croppedAreaPixels.y + croppedAreaPixels.height / 2.0,
      w: croppedAreaPixels.width,
      h: croppedAreaPixels.height,
      srcW,
      srcH,
    };

    // 引数として与えられた処理を実行
    func(cropData);
  };

  const onCropComplete = useCallback((_: Area, c: Area) => {
    setCroppedAreaPixels(c);
  }, []);

  return (
    crop && (
      <div className="h-full flex flex-col gap-3">
        <div className={className}>
          <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            style={{ cropAreaStyle: { width: "80%", height: "80%" } }}
          />
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <div className="flex justify-center">
          <button type="button" className="inline" onClick={submit}>
            {/* 送信 */}
            {children}
          </button>
        </div>
      </div>
    )
  );
};
BadgeCrop.defaultProps = {
  className: "",
};

export default BadgeCrop;
