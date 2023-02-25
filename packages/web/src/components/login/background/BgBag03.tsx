import useWindowSize from "@/hooks/useWindowSize";
import { BgSpringData, PlaceData } from "@/types/login/BgSpringData";
import { LoginMode } from "@/types/login/LoginMode";
import { config, useSpring, a, useSpringRef } from "@react-spring/web";
import Image from 'next/image'
import { useEffect, useState } from "react";


type Props = {
  mode: LoginMode;
  bagName: string;
  width: number;
  height: number;
  springData: BgSpringData;
}

const BgBag03 = ({
  mode,
  bagName,
  width,
  height,
  springData,
}: Props) => {
  const { innerWidth, innerHeight } = useWindowSize();
  const [dest, setDest] = useState<PlaceData>({ pos: { x: 0, y: 0 }, rot: 0 });

  useEffect(() => {
    if (mode === 'TOP') {
      setDest(springData.top);
    } else if (mode === 'SIGN_IN') {
      setDest(springData.signIn);
    } else if (mode === 'SIGN_UP') {
      setDest(springData.signUp);
    }
  }, [mode]);

  const { x, y, rot } = useSpring({
    from: {
      x: innerWidth * 0.8,
      y: innerHeight * 0.2,
      rot: 0,
    },
    to: {
      x: dest.pos.x,
      y: dest.pos.y,
      rot: dest.rot,
    },
    config: config.default,
  })

  return <>
    <div className={'w-[100vw] h-[100vh] absolute overflow-hidden z-[-4]'}>
      <a.div style={{ x, y, rotateZ: rot }}>
        <Image src={`/bag-images/${bagName}.png`} alt={`${bagName}`} width={width} height={height} />
      </a.div>
    </div>
  </>
}

export default BgBag03