import SignButton from "./sign/SignButton";

type Props = {
  moveSignIn: () => void;
  moveSignUp: () => void;
};

const ModeNone = ({ moveSignIn, moveSignUp }: Props) => {
  return (
    <>
      <div className="absolute bottom-[8%] w-full flex justify-center">
        <div className="login-top-container">
          <div className="flex flex-col gap-4">
            <div>
              <SignButton text="Sign in" onClick={moveSignIn} />
            </div>
            <div>
              <SignButton text="Sign out" onClick={moveSignUp} />
            </div>

            <p className="mt-4 text-sm text-center">
              Or Login With Social Media
            </p>
            <div className="flex justify-center">google</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeNone;
