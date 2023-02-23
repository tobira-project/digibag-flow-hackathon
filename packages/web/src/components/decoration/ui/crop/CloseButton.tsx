type Props = {
  handleClick: () => void;
}

const CloseButton = ({ handleClick }: Props) => {
  return <>
    <div className="absolute top-6 right-4">
      <button className="crop-close-btn" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </>
}

export default CloseButton;