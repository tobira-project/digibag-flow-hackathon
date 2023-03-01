import AccountModal from "@/components/accountModal/AccountModal";
import arrangementData from "@/data/arrangementData.json";
import useArrangementStore from "@/stores/arrangementStore";
import { useState } from "react";
import { useEffect } from "react";
import PersonalizeBg from "../../PersonalizeBg";
import GridBagItem from "./GridBagItem";

/**
 * バッグのグリッド表示のコンポーネント
 * @returns
 */
const GridBagDisplay = () => {
  const { isAccountModalOpen } = useArrangementStore((state) => ({
    isAccountModalOpen: state.isAccountModalOpen
  }))
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setImageUrl(arrangementData.mockBagDataList[0].imageUrl);
  }, [arrangementData.mockBagDataList]);

  return (
    <>
      <PersonalizeBg imageUrl={imageUrl} />
      <div
        className="h-full overflow-y-scroll px-10 pt-20"
        data-allowscroll="true"
      >
        <div className="grid grid-cols-2 gap-6 ">
          {arrangementData.mockBagDataList.map((v) => (
            <>
              <GridBagItem
                key={v.id}
                imageUrl={v.imageUrl}
                title={v.title}
                bagId={v.id}
              />
            </>
          ))}
        </div>
      </div>
      {isAccountModalOpen && <AccountModal />}
    </>
  );
};

export default GridBagDisplay;
