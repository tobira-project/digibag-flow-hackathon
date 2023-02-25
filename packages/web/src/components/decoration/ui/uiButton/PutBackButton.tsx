import UIButton from "./UIButton";
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
        className="bottom-btn-sm p-[13px] pt-[8px]"
      >
        <PutBackIcon />
      </UIButton>
    </>
  );
};

export default PutBackButton;
