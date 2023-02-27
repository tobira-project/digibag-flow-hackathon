import useWindowSize from "@/hooks/useWindowSize";
import { LoginMode } from "@/types/login/LoginMode";
import BgBag from "./BgBag";
import loginData from "@/data/loginData.json";

type Props = {
  mode: LoginMode;
};

/**
 * login画面の背景アニメーションを
 * @param param0
 * @returns
 */
const Background = ({ mode }: Props) => {
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <>
      <div className="overflow-hidden w-[100vw]">
        <BgBag
          mode={mode}
          {...loginData.bgBag[0]}
          springData={{
            top: {
              pos: {
                x: innerWidth * -0.55,
                y: innerHeight * 0.12,
              },
              rot: -32,
              scale: 1.8,
            },
            signIn: {
              pos: {
                x: innerWidth * -0.7,
                y: innerHeight * 0.03,
              },
              rot: -32,
              scale: 1.5,
            },
            signUp: {
              pos: {
                x: innerWidth * -0.57,
                y: innerHeight * -0.3,
              },
              rot: -32,
              scale: 1,
            },
          }}
        />
        <BgBag
          mode={mode}
          {...loginData.bgBag[1]}
          springData={{
            top: {
              pos: {
                x: innerWidth * -0.15,
                y: innerHeight * 0.6,
              },
              rot: -23,
              scale: 1.4,
            },
            signIn: {
              pos: {
                x: innerWidth * -0.53,
                y: innerHeight * 0.76,
              },
              rot: -23,
              scale: 1.4,
            },
            signUp: {
              pos: {
                x: innerWidth * 0.25,
                y: innerHeight * 0.41,
              },
              rot: 10,
              scale: 2.7,
            },
          }}
        />
        <BgBag
          mode={mode}
          {...loginData.bgBag[2]}
          springData={{
            top: {
              pos: {
                x: innerWidth * 0.52,
                y: innerHeight * 0.26,
              },
              rot: 16,
              scale: 1,
            },
            signIn: {
              pos: {
                x: innerWidth * 0.08,
                y: innerHeight * 0.3,
              },
              rot: 16,
              scale: 1.3,
            },
            signUp: {
              pos: {
                x: innerWidth * 0.9,
                y: innerHeight * -0.2,
              },
              rot: 14,
              scale: 1,
            },
          }}
        />
      </div>
    </>
  );
};

export default Background;
