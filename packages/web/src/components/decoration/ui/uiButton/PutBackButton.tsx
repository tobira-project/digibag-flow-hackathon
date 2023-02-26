import UIButton from "../../../global/UIButton";
import PutBackIcon from "../../../../../public/decoration/icon/putBackIcon.svg";

/**
 * バッグにしまうボタン
 */
const PutBackButton = () => {
  const handleClick = () => {};

  return (
    <>
      <UIButton
        onClick={handleClick}
        className="bottom-btn-sm overflow-hidden p-[13.5px] pt-[8px]"
      >
        <PutBackIcon />
      </UIButton>
    </>
  );
};

export default PutBackButton;
