import useArrangementStore from "@/stores/arrangementStore";

/**
 * バッグ選択画面でのbottom navigationのコンポーネント
 * @returns
 */
const BottomNavigation = () => {
  const { isGridBags, toggleIsGridBags } = useArrangementStore((state) => ({
    isGridBags: state.isGridBags,
    toggleIsGridBags: state.toggleIsGridBags,
  }));

  return (
    <>
      <div className="fixed bottom-0 pointer-events-none">
        <button className="btn btn-circle pointer-events-auto">
          バッグ追加
        </button>
        <button className="btn btn-circle pointer-events-auto">
          アカウント設定
        </button>
        <button
          className="btn btn-circle pointer-events-auto"
          onClick={toggleIsGridBags}
        >
          {isGridBags ? "グリッドへ" : "カルーセルへ"}
        </button>
      </div>
    </>
  );
};

export default BottomNavigation;
