import { useState } from "react";
import SignButton from '@/components/login/SignButton';
import BackButton from "@/components/global/BackButton";
import { useRouter } from "next/router";
import ModeNone from "@/components/login/ModeNone";
import TextBox from "@/components/login/TextBox";
import TBRLogo from "../../public/login/tbr-logo.svg"
import ModeSignIn from "@/components/login/ModeSignIn";
import ModeSignUp from "@/components/login/ModeSignUp";

type Mode = "NONE" | "SIGN_IN" | "SIGN_UP" | "SUCCESS_SIGN_UP";

/**
 * ログイン（Sign in/up)画面
 * @returns 
 */
const Login = () => {
  // モードによって背景の動きが変わるためには、背景移動のspring用に数値の変数を用意する必要があるかも
  // useSpringで使っていたbooleanの数値バージョン
  const [mode, setMode] = useState<Mode>('NONE')
  const router = useRouter();

  // Sign inモードへ
  const moveSignIn = () => setMode('SIGN_IN');
  const moveSignUp = () => setMode("SIGN_UP");
  // 初期表示へ戻る
  const back = () => setMode("NONE")

  // Sign inの実行
  const handleSignIn = () => {
    // バリデーションチェック
    //
    // okならばトップ画面へ
    router.push('/');
  }

  // Sign upの実行
  const handleSignUp = () => {
    // バリデーションチェック
    //（バリデーションokならば）

    // sign up中modeへ
    // await アカウント生成のリクエスト
    //（Suspend表示）
    //（生成成功したとき）

    // sign up完了modeへ
    setMode('SUCCESS_SIGN_UP')
    //（you are successfully registered!!の表示）
  }

  const handleNext = () => router.push('/');

  return <>
    {mode !== "NONE" && <>
      <BackButton onClick={back} />
    </>}
    {/* タイトルを中央にしつつ、ロゴをタイトルと左側でそろえるのは無理
    タイトルの幅を決定したほうが綺麗にはなりそうだ */}
    <div className="login-title-container">
      <div className="login-tbr-logo">
        <TBRLogo />
      </div>
      <h1 className="login-title">DIGIBAG</h1>
    </div>

    <div>
      {mode === "NONE" && (<>
        <ModeNone moveSignIn={moveSignIn} moveSignUp={moveSignUp} />
      </>)}
      <div className="mt-4 w-[100vw] flex justify-center ">
        {mode === "SIGN_IN" && (<>
          <ModeSignIn handleSignIn={handleSignIn} moveSignUp={moveSignUp} />
        </>)}
        {mode === "SIGN_UP" && (<>
          <ModeSignUp handleSignUp={handleSignUp} moveSignIn={moveSignIn} />
        </>)}
      </div>
      {mode === "SUCCESS_SIGN_UP" && (<>
        you are successfully registered!!
        <SignButton text='Next' onClick={handleNext} />
      </>)}
    </div>
  </>
}

export default Login