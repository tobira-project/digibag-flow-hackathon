import { BgSpringData, PlaceData } from "@/types/login/BgSpringData";
import { LoginMode } from "@/types/login/LoginMode";
import { config, useSpring, a } from "@react-spring/web";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  mode: LoginMode;
  bagName: string;
  width: number;
  height: number;
  springData: BgSpringData;
};

/**
 * login背景のバッグのアニメーションを管理するコンポーネント
 * @param param0
 * @returns
 */
const BgBag = ({ mode, bagName, width, height, springData }: Props) => {
  // springの定義
  const [{ x, y, rot, scale }, api] = useSpring(
    () => ({
      x: 0,
      y: 0,
      rot: 0,
      scale: 1,
      config: config.default,
    }),
    []
  );

  // 初期化処理
  useEffect(() => {
    if (springData.top.pos.x === 0) {
      // springDataに値が入っていない時は遠くに飛ばしておく
      api.start({
        x: -9999,
        y: -9999,
        rot: 0,
        scale: 0,
        immediate: true,
      });
    } else {
      // 値が入ったら初期化完了
      // springDataは初期化以降、変更されない
      api.start({
        x: springData.top.pos.x,
        y: springData.top.pos.y,
        rot: springData.top.rot,
        scale: springData.top.scale,
        immediate: true,
      });
    }
  }, [springData.top.pos.x]);

  const getData = (m: LoginMode) => {
    let data: PlaceData;
    if (m === "TOP") {
      data = springData.top;
    } else if (m === "SIGN_IN_WITH_GOOGLE") {
      data = springData.signIn;
    } else {
      data = springData.signUp;
    }
    return data;
  };

  // mode変更時、アニメーション
  useEffect(() => {
    if (springData.top.pos.x === 0) return;
    const data = getData(mode);

    api.start({
      x: data.pos.x,
      y: data.pos.y,
      rot: data.rot,
      scale: data.scale,
      config: config.slow,
    });
  }, [mode]);

  return (
    <>
      <div className={"w-[100vw] h-[100vh] absolute overflow-hidden z-[-4]"}>
        <a.div style={{ x, y, scale, rotate: rot.to((v) => `${v}deg`) }}>
          <Image
            src={`/bag-images/${bagName}.png`}
            alt={`${bagName}`}
            width={width}
            height={height}
          />
        </a.div>
      </div>
    </>
  );
};

export default BgBag;
