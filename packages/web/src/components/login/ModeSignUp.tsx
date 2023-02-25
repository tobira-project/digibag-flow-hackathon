import BackButton from "../global/BackButton"
import SignButton from "./SignButton"
import TextBox from "./TextBox";

type Props = {
  handleSignUp: () => void;
  moveSignIn: () => void;
}

const ModeSignUp = ({ handleSignUp, moveSignIn }: Props) => {
  return <>
    <div className="login-sign-container">
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
  </>
}

export default ModeSignUp