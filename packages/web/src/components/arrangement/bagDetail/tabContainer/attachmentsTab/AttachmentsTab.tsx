import decorationData from "@/data/decorationData.json";
import AttachmentItem from "./AttachmentItem";

/**
 * バッグ詳細画面のContentsタブの内容表示
 * @returns
 */
const AttachmentsTab = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <div className="contents-grid-contianer mt-6">
          <div className="grid grid-cols-4 gap-3 pb-2 px-3">
            {/* decorationから持ってきているのはあくまでmockとして。 */}
            {decorationData.mockItemList.map((v) => (
              <>
                <AttachmentItem
                  key={v.id}
                  itemId={v.id}
                  imageUrl={v.imageUrl}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AttachmentsTab;
