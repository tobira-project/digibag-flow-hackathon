import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Loading = () => {
  return (
    <>
      <div className="login-sign-container-outer">
        <div className="login-sign-container-inner">
          <div className="mt-3 text-center">
            <FontAwesomeIcon icon={faSpinner} size="2x" spin />
            <div>Loading...</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Loading;