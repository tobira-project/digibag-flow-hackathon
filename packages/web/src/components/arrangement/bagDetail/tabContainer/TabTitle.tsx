type Props = {
  title: string;
  tabId: number;
  onClick: (tabId: number) => void;
  isSelected: boolean;
};

/**
 * バッグ詳細画面。グッズ一覧用コンテナのタブの表示
 * @param param0
 * @returns
 */
const TabTitle = ({ title, tabId, onClick, isSelected }: Props) => {
  return (
    <>
      <div className="w-full pt-4">
        <button
          type="button"
          onClick={() => onClick(tabId)}
          className={"w-full h-full"}
        >
          <div className="text-center">{title}</div>
          <div
            className={`mx-2 mt-1 ${
              isSelected ? "border-b-[2px] border-[#707070]" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default TabTitle;
