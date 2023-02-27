import useDecorationStore from "@/stores/decorationStore";
import UIButton from "../../../global/UIButton";
import MoveObjIconW from "../../../../../public/icon/moveobj-icon-w.svg";
import MoveObjIconB from "../../../../../public/icon/moveobj-icon-b.svg";

/**
 * 検証用に作成。グッズ操作モード/カメラモードを切り替えるボタンコンポーネント。
 * @returns
 */
const ToggleModeButton = () => {
  const { isCameraMode, toggleCameraMode } = useDecorationStore((state) => ({
    isCameraMode: state.isCameraMode,
    toggleCameraMode: state.toggleCameraMode,
  }));

  // トグル式でモードを切り替える
  const handleClick = () => {
    toggleCameraMode();
  };

  return (
    <>
      <UIButton
        onClick={handleClick}
        className={`bottom-btn-sm ${
          isCameraMode ? "bottom-btn-gray-active" : "bottom-btn-gray"
        }`}
      >
        <MoveObjIconW />
      </UIButton>
    </>
  );
};

export default ToggleModeButton;
