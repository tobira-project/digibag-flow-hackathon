type SignButtonProps = {
  text: string;
  onClick: () => void;
};

/**
 * Sign in/up用のボタン
 * @param param0
 * @returns
 */
const SignButton = ({ onClick, text }: SignButtonProps) => (
  <button onClick={onClick} className={"login-btn"}>
    {text}
  </button>
);

export default SignButton;
