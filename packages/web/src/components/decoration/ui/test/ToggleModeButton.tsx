import useDecorationStore from "@/stores/decorationStore";

/**
 * 検証用に作成。グッズ操作モード/カメラモードを切り替えるボタンコンポーネント。
 * @returns 
 */
const ToggleModeButton = () => {
  const { isCameraMode, toggleCameraMode } = useDecorationStore((state) => ({
    isCameraMode: state.isCameraMode,
    toggleCameraMode: state.toggleCameraMode
  }))

  // トグル式でモードを切り替える
  const handleClick = () => {
    toggleCameraMode();
  }

  return <>
    <div className="bg-white rounded-full w-20 h-10 grid content-center">
      <button type="button" onClick={handleClick}>
        {
          isCameraMode ? 'カメラ' : 'グッズ操作'
        }
      </button>
    </div>
  </>
}

export default ToggleModeButton;