import Image from "next/image";
import arrangementData from "@/data/arrangementData.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  imageUrl: string;
};

/**
 * バッグ画像を拡大して背景色に使うコンポーネント
 * @returns
 */
const PersonalizeBg = ({ imageUrl }: Props) => {
  return (
    <>
      <div className="absolute overflow-hidden w-full h-full z-[-20]">
        <div className="relative flex justify-center grid content-center w-full h-full">
          <div className="relative w-[150vw] h-[150vh] saturate-150">
            <Image
              src={imageUrl}
              alt="bg"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="absolute w-full h-full bg-white/10 backdrop-blur-[25px]" />
        </div>
      </div>
    </>
  );
};

export default PersonalizeBg;
