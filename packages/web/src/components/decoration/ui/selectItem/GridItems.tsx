import decorationData from "@/data/decorationData.json";
import useDecorationStore from "@/stores/decorationStore";
import { CropData, ItemType } from "@/types/decoration/decorationItemType";
import Image from "next/image";
import { useRef } from "react";

/**
 * インベントリ（バッグ）の中のグッズ一覧表示
 * @returns
 */
const GridItems = () => {
  const { placeNewItem, closeInventoryBag } = useDecorationStore((state) => ({
    placeNewItem: state.placeNewItem,
    closeInventoryBag: state.closeInventoryBag,
  }));

  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = (imageUrl: string, itemType: ItemType) => {
    if (!imageRef.current) return;
    const w = imageRef.current.naturalWidth;
    const h = imageRef.current.naturalHeight;
    const cropData: CropData = {
      x: w / 2,
      y: h / 2,
      w: w,
      h: h,
      srcW: w,
      srcH: h,
    };
    placeNewItem(imageUrl, itemType, cropData);
    closeInventoryBag();
  };

  return (
    <>
      <div className="contents-grid-contianer mt-14">
        <div className="grid grid-cols-3 gap-3 pb-2 px-3">
          {decorationData.mockItemList.map((v) => (
            <>
              <button
                key={v.id}
                onClick={() => handleClick(v.imageUrl, "CAN_BADGE")}
              >
                <div className="relative w-full aspect-square">
                  <Image
                    ref={imageRef}
                    src={v.imageUrl}
                    alt={"item"}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </button>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default GridItems;
