import BackButton from "../../global/BackButton";
import SignButton from "./SignButton";
import TextBox from "./TextBox";

type Props = {
  handleSignUp: () => void;
  value: string;
  setValue: (value: string) => void;
  checkValue: (value: string) => boolean;
};

/**
 * Sign upフォームのコンポーネント
 * @param param0
 * @returns
 */
const SignUp = ({ handleSignUp, value, setValue, checkValue }: Props) => {
  return (
    <>
      <div className="login-sign-container-outer">
        <div className="login-sign-container-inner">
          <TextBox value={value} setValue={setValue} checkValue={checkValue} />
          <div className="mt-4">
            <SignButton text="Sign up" onClick={handleSignUp} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
