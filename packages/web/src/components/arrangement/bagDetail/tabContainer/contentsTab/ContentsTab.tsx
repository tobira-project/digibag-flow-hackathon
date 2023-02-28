import decorationData from "@/data/decorationData.json";
import ContentItem from "./ContentItem";

/**
 * バッグ詳細画面のContentsタブの内容表示
 * @returns
 */
const ContentsTab = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <div
          className="contents-grid-contianer mt-6"
          data-allowscroll="true"
        >
          <div className="grid grid-cols-3 gap-3 pb-2 px-3">
            {/* decorationから持ってきているのはあくまでmockとして。 */}
            {decorationData.mockItemList.map((v) => (
              <>
                <ContentItem key={v.id} itemId={v.id} imageUrl={v.imageUrl} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentsTab;
