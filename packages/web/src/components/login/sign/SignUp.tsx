import BackButton from "../../global/BackButton"
import SignButton from "./SignButton"
import TextBox from "./TextBox";

type Props = {
  handleSignUp: () => void;
  moveSignIn: () => void;
}

/**
 * Sign upフォームのコンポーネント
 * @param param0 
 * @returns 
 */
const SignUp = ({ handleSignUp, moveSignIn }: Props) => {
  return <>
    <div className="login-sign-container-outer">
      <div className="login-sign-container-inner">
        <TextBox />
        <div className="mt-4">
          <SignButton text="Sign up" onClick={handleSignUp} />
        </div>
        <p className="mt-3 text-center">
          {"You have an account? "}
          <button onClick={moveSignIn} className="text-[#177CED] font-bold">
            {"Sign In"}
          </button>
        </p>
      </div>
    </div>
  </>
}

export default SignUp