import BackButton from "../../global/BackButton"
import SignButton from "./SignButton"
import TextBox from "./TextBox"

type Props = {
  handleSignIn: () => void;
  moveSignUp: () => void;
}

/**
 * Sign inフォームのコンポーネント
 * @param param0 
 * @returns 
 */
const SignIn = ({ handleSignIn, moveSignUp }: Props) => {
  return <>
    <div className="login-sign-container-outer">
      <div className="login-sign-container-inner">
        <TextBox />
        <div className="mt-4">
          <SignButton text="Sign in" onClick={handleSignIn} />
        </div>
        <p className="mt-3 text-center">
          {"Don't have an account? "}
          <button onClick={moveSignUp} className="text-[#177CED] font-bold">
            {"Sign Up"}
          </button>
        </p>
      </div>
    </div>
  </>
}

export default SignIn