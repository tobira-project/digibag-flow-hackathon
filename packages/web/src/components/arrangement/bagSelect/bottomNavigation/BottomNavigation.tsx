import useArrangementStore from "@/stores/arrangementStore";
import NavButton from "./NavButton";
import BagView from "@/../public/icon/bagview-icon.svg";
import { TfiPlus } from "react-icons/tfi";
import ProfileIcon from "@/../public/icon/profile-icon.svg";
import useWindowSize from "@/hooks/useWindowSize";

/**
 * バッグ選択画面でのbottom navigationのコンポーネント
 * @returns
 */
const BottomNavigation = () => {
  const { isGridBags, toggleIsGridBags } = useArrangementStore((state) => ({
    isGridBags: state.isGridBags,
    toggleIsGridBags: state.toggleIsGridBags,
  }));

  const { innerHeight, displayWidth, displayHeight } = useWindowSize();

  return (
    <>
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: (innerHeight - displayHeight) / 2.0 + 40,
        }}
      >
        <div
          className="flex justify-center gap-3"
          style={{ width: displayWidth }}
        >
          <div className="pt-8">
            <NavButton
              onClick={() => {}}
              className="bottom-btn-sm bottom-btn-sm-nav bottom-btn-gray p-[12px]"
            >
              <ProfileIcon />
            </NavButton>
          </div>
          <div className="">
            <NavButton
              onClick={() => {}}
              className="bottom-btn-md bottom-btn-gray "
            >
              <TfiPlus size={45} />
            </NavButton>
          </div>
          <div className="pt-8">
            <NavButton
              onClick={() => {}}
              className="bottom-btn-sm bottom-btn-sm-nav bottom-btn-gray p-[12.5px]"
            >
              <BagView />
            </NavButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
