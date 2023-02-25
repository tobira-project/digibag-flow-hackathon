import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

type BackButtonProps = {
  onClick: () => void;
}

/**
 * 戻るボタン
 * @param param0 
 * @returns 
 */
const BackButton = ({ onClick }: BackButtonProps) => (
  <button onClick={onClick}
    className={'login-back-btn'}
  >
    <div className="text-[30px] text-[#707070]">
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  </button>
)

export default BackButton