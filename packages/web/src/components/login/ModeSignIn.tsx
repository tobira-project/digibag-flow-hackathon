import BackButton from "../global/BackButton"
import SignButton from "./SignButton"
import TextBox from "./TextBox"

type Props = {
  handleSignIn: () => void;
  moveSignUp: () => void;
}

const ModeSignIn = ({ handleSignIn, moveSignUp }: Props) => {
  return <>
    <div className="login-sign-container">
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
  </>
}

export default ModeSignIn