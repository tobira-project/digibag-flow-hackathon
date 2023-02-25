import arrangementData from "@/data/arrangementData.json";
import GridBagItem from "./GridBagItem";

/**
 * バッグのグリッド表示のコンポーネント
 * @returns
 */
const GridBagDisplay = () => {
  return (
    <>
      <div className="h-[100vh] overflow-y-scroll px-10 pt-20">
        <div className="grid grid-cols-2 gap-6">
          {arrangementData.mockBagDataList.map((v) => (
            <>
              <GridBagItem
                key={v.id}
                imageUrl={v.thumbnailUrl}
                title={v.title}
                bagId={v.id}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default GridBagDisplay;
