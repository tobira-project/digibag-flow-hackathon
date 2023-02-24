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
    className={'btn btn-circle'}
  >
    {'<'}
  </button>
)

export default BackButton