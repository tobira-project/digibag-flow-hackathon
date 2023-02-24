import { useState } from "react";
import SignButton from '@/components/login/SignButton';
import BackButton from "@/components/global/BackButton";
import { useRouter } from "next/router";

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
    <div>logo</div>
    <h1>DIGIBAG</h1>
    {mode === "NONE" && (<>
      <div>
        <SignButton text='Sign in' onClick={moveSignIn} />
      </div>
      <div>
        <SignButton text='Sign out' onClick={moveSignUp} />
      </div>
    </>)}
    {mode === "SIGN_IN" && (<>
      <BackButton onClick={back} />
      signin
      <SignButton text="Sign in" onClick={handleSignIn} />
    </>)}
    {mode === "SIGN_UP" && (<>
      <BackButton onClick={back} />
      signup
      <SignButton text="Sign up" onClick={handleSignUp} />
    </>)}
    {mode === "SUCCESS_SIGN_UP" && (<>
      you are successfully registered!!
      <SignButton text='Next' onClick={handleNext} />
    </>)}
  </>
}

export default Login