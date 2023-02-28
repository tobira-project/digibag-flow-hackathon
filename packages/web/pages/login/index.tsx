import { useEffect, useState } from "react";
import BackButton from "@/components/global/BackButton";
import { useRouter } from "next/router";
import TBRLogo from "../../public/login/tbr-logo.svg";
import SignButton from "@/components/login/sign/SignButton";
import SignUp from "@/components/login/sign/SignUp";
import Top from "@/components/login/Top";
import Background from "@/components/login/background/Background";
import { LoginMode } from "@/types/login/LoginMode";
import { useFlow } from "context/flow";
import Loading from "@/components/login/sign/Loading";

/**
 * ログイン（Sign in/up)画面
 * @returns
 */
const Login = () => {
  const { magic } = useFlow();

  // モードによって背景の動きが変わるためには、背景移動のspring用に数値の変数を用意する必要があるかも
  // useSpringで使っていたbooleanの数値バージョン
  const [mode, setMode] = useState<LoginMode>("LOADING");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // GoogleでSign inする
  const moveSignInWithGoogle = () => {
    setMode("SIGN_IN_WITH_GOOGLE");
    handleSignInWithGoogle();
  }
  // EmailでSign inする
  const moveSignInWithEmail = () => setMode("SIGN_IN_WITH_EMAIL");
  // 初期表示へ戻る
  const back = () => setMode("TOP");

  // GoogleでSign inの実行
  const handleSignInWithGoogle = async () => {
    if (!magic) return;
    await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${window.location.href}`
    });
  };

  // Emailのバリデーション
  const checkEmail = (email: string) => {
    if (email.length === 0) {
      return false;
    }
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexp.test(email);
  };

  // EmailでSign inの実行
  const handleSignInWithEmail = async () => {
    console.log(email)
    if (!checkEmail(email)) return;
    if (!magic) return;
    await magic.auth.loginWithEmailOTP({ email: 'nagato.kasaki@gmail.com' });
    setMode("SUCCESS_SIGN_UP");
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  const handleSignOut = async () => {
    if (!magic) return;
    await magic.user.logout();
    setMode("TOP");
  }

  useEffect(() => {
    console.log(mode)
  }, [mode])

  useEffect(() => {
    if (magic) {
      magic.user.isLoggedIn().then(async (magicIsLoggedIn) => {
        if (magicIsLoggedIn) {
          const userMetadata = await magic.user.getMetadata();
          setMode("SUCCESS_SIGN_UP");
          setTimeout(() => {
            router.push("/");
          }, 5000);
        } else {
          setMode("TOP");
        }
      });
    }
  }, [magic]);

  return (
    <>
      {/* バックグラウンドにバッグ画像を表示 */}
      <Background mode={mode} />

      {mode !== "TOP" && (
        <>
          <BackButton onClick={back} className={"login-back-btn"} />
        </>
      )}
      <div className="login-title-container">
        <div className="login-tbr-logo">
          <TBRLogo />
        </div>
        <h1 className="login-title">DIGIBAG</h1>
      </div>

      <div>
          <>
            {mode === "LOADING" && (
            <>
              <Loading />
            </>
            )}
            {mode === "TOP" && (
            <>
              <Top moveSignInWithGoogle={moveSignInWithGoogle} moveSignInWithEmail={moveSignInWithEmail} />
            </>
            )}
            {mode === "SIGN_IN_WITH_GOOGLE" && (
              <>
                <Loading />
              </>
            )}
            {mode === "SIGN_IN_WITH_EMAIL" && (
              <>
                <SignUp handleSignUp={handleSignInWithEmail} value={email} setValue={setEmail} checkValue={checkEmail} />
              </>
            )}
            {mode === "SUCCESS_SIGN_UP" && (
              <>
                <SignButton text="Sign out" onClick={handleSignOut} />
              </>
            )}
          </>
      </div>
    </>
  );
};

export default Login;
