import Image from "next/image"
import arrangementData from "@/data/arrangementData.json"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

/**
 * バッグ画像を拡大して背景色に使うコンポーネント
 * @returns 
 */
const PersonalizeBg = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== 'string') return;
    const id = parseInt(router.query.bagId);
    const url = arrangementData.mockBagDataList[id].thumbnailUrl
    setImageUrl(url);
  }, [router.query.bagId])

  return <>
    <div className="absolute overflow-hidden w-[100vw] h-[100vh] z-[-20]">
      <div className="flex justify-center grid content-center w-full h-full">
        <div className="relative w-[150vw] h-[150vh]">
          <Image src={imageUrl} alt='bg' fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  </>
}

export default PersonalizeBg