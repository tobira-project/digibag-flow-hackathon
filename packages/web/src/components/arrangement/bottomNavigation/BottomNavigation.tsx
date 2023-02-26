import useArrangementStore from "@/stores/arrangementStore";
import NavButton from "./NavButton";
import BagView from "@/../public/arrangement/bagview.svg";
import { TfiPlus } from "react-icons/tfi";

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
      <div className="fixed bottom-10 pointer-events-none">
        <div className="w-[100vw] flex justify-center gap-2">
          <div className="pt-8">
            <NavButton onClick={() => {}} className="bottom-btn-sm">
              account
            </NavButton>
          </div>
          <div className="">
            <NavButton onClick={() => {}} className="bottom-btn-md">
              <TfiPlus size={40} />
            </NavButton>
          </div>
          <div className="pt-8">
            <NavButton onClick={() => {}} className="bottom-btn-sm p-[12.2px]">
              <BagView />
            </NavButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
