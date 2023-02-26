import useDecorationStore from "@/stores/decorationStore";
import UIButton from "../../../global/UIButton";

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
      <UIButton onClick={handleClick} className="bottom-btn-sm">
        {isCameraMode ? "カメラ" : "グッズ操作"}
      </UIButton>
    </>
  );
};

export default ToggleModeButton;
