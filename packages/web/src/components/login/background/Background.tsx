import useWindowSize from "@/hooks/useWindowSize";
import { LoginMode } from "@/types/login/LoginMode";
import BgBag03 from "./BgBag03";
import loginData from "@/data/loginData.json"

type Props = {
  mode: LoginMode;
}



const Background = ({ mode }: Props) => {
  const { innerWidth, innerHeight } = useWindowSize();

  return <>
    <div className="overflow-hidden w-[100vw]">

      {/* <BgBag mode={mode} bagName={""} width={0} height={0} springData={{
        top: {
          pos: {
            x: 0,
            y: 0
          },
          rot: 0
        },
        signIn: {
          pos: {
            x: 0,
            y: 0
          },
          rot: 0
        },
        signUp: {
          pos: {
            x: 0,
            y: 0
          },
          rot: 0
        }
      }} />

      <BgBag mode={mode} bagName={""} width={0} height={0} springData={{
        top: {
          pos: {
            x: 0,
            y: 0
          },
          rot: 0
        },
        signIn: {
          pos: {
            x: 0,
            y: 0
          },
          rot: 0
        },
        signUp: {
          pos: {
            x: 0,
            y: 0
          },
          rot: 0
        }
      }} /> */}
      <BgBag03 mode={mode} {...loginData.bgBag[2]} springData={{
        top: {
          pos: {
            x: innerWidth * 0.8,
            y: innerHeight * 0.2
          },
          rot: 0
        },
        signIn: {
          pos: {
            x: innerWidth * 0.1,
            y: innerHeight * 0.3
          },
          rot: 0
        },
        signUp: {
          pos: {
            x: innerWidth * 1.1,
            y: innerHeight * (-0.2)
          },
          rot: 0
        }
      }} />
    </div>
  </>
}

export default Background;