import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
};

/**
 * インベントリ（バッグ）の閉じるボタン
 * @param param0
 * @returns
 */
const CloseButton = ({ onClick }: Props) => {
  return (
    <>
      <div className="absolute right-6 top-2">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-circle btn-ghost text-[#B0B0B0] text-[30px]"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </>
  );
};

export default CloseButton;
