import SignButton from "./sign/SignButton";

type Props = {
  moveSignInWithGoogle: () => void;
  moveSignInWithEmail: () => void;
};

const ModeNone = ({ moveSignInWithGoogle, moveSignInWithEmail }: Props) => {
  return (
    <>
      <div className="absolute bottom-[8%] w-full flex justify-center">
        <div className="login-top-container">
          <div className="flex flex-col gap-4">
            <div>
              <SignButton text="Sign in with google" onClick={moveSignInWithGoogle} withGoogleIcon />
            </div>
            <div>
              <SignButton text="Sign in  with email" onClick={moveSignInWithEmail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeNone;
