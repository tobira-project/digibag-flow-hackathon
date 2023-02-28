import Google from "../../../../public/login/google.svg";

type SignButtonProps = {
  text: string;
  onClick: () => void;
  withGoogleIcon?: boolean;
};

/**
 * Sign in/up用のボタン
 * @param param0
 * @returns
 */
const SignButton = ({ onClick, text, withGoogleIcon }: SignButtonProps) => (
  <button onClick={onClick} className={"login-btn"}>
    {withGoogleIcon && <Google className="login-icon" />}
    {text}
  </button>
);

export default SignButton;
