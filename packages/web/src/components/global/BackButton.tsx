import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type BackButtonProps = {
  onClick: () => void;
  className: string;
};

/**
 * 戻るボタン
 * @param param0
 * @returns
 */
const BackButton = ({ onClick, className }: BackButtonProps) => (
  <button onClick={onClick} className={className}>
    <div className="text-[30px] text-[#707070]">
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  </button>
);

export default BackButton;
