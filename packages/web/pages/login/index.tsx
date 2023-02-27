import { useState } from "react";
import BackButton from "@/components/global/BackButton";
import { useRouter } from "next/router";
import TBRLogo from "../../public/login/tbr-logo.svg";
import SignButton from "@/components/login/sign/SignButton";
import SignIn from "@/components/login/sign/SignIn";
import SignUp from "@/components/login/sign/SignUp";
import Top from "@/components/login/Top";
import Background from "@/components/login/background/Background";
import { LoginMode } from "@/types/login/LoginMode";

/**
 * ログイン（Sign in/up)画面
 * @returns
 */
const Login = () => {
  // モードによって背景の動きが変わるためには、背景移動のspring用に数値の変数を用意する必要があるかも
  // useSpringで使っていたbooleanの数値バージョン
  const [mode, setMode] = useState<LoginMode>("TOP");
  const router = useRouter();

  // Sign inモードへ
  const moveSignIn = () => setMode("SIGN_IN");
  const moveSignUp = () => setMode("SIGN_UP");
  // 初期表示へ戻る
  const back = () => setMode("TOP");

  // Sign inの実行
  const handleSignIn = () => {
    // バリデーションチェック
    //
    // okならばトップ画面へ
    router.push("/");
  };

  // Sign upの実行
  const handleSignUp = () => {
    // バリデーションチェック
    //（バリデーションokならば）

    // sign up中modeへ
    // await アカウント生成のリクエスト
    //（Suspend表示）
    //（生成成功したとき）

    // sign up完了modeへ
    setMode("SUCCESS_SIGN_UP");
    //（you are successfully registered!!の表示）
  };

  const handleNext = () => router.push("/");

  return (
    <>
      <div className="page-top-container">
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
          {mode === "TOP" && (
            <>
              <Top moveSignIn={moveSignIn} moveSignUp={moveSignUp} />
            </>
          )}
          {mode === "SIGN_IN" && (
            <>
              <SignIn handleSignIn={handleSignIn} moveSignUp={moveSignUp} />
            </>
          )}
          {mode === "SIGN_UP" && (
            <>
              <SignUp handleSignUp={handleSignUp} moveSignIn={moveSignIn} />
            </>
          )}
        </div>
        {mode === "SUCCESS_SIGN_UP" && (
          <>
            you are successfully registered!!
            <SignButton text="Next" onClick={handleNext} />
          </>
        )}
      </div>
    </>
  );
};

export default Login;
