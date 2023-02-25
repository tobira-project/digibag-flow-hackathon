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
    className={'absolute top-[8%] left-[4%] btn btn-circle btn-ghost'}
  >
    <div className="text-[30px] text-[#707070]">
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  </button>
)

export default BackButton