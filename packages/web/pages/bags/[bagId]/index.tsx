import BagDetailContainer from "@/components/arrangement/bagDetail/BagDetailContainer";
import BagPreview from "@/components/arrangement/bagDetail/BagPreview";
import BackButton from "@/components/global/BackButton"
import { NextPage } from "next"
import { useRouter } from "next/router"

/**
 * バッグの詳細ページ
 * @returns 
 */
const BagDetail: NextPage = () => {
  const router = useRouter();

  console.log(router.query.bagId)

  const handleBack = () => {

    router.push('/')
  }

  return <>
    <div>
      <BackButton onClick={handleBack} className={'back-btn'} />
      <div className="h-[100vh] flex flex-col">
        <h1 className="mt-[10vh] text-[40px] text-center align-top">title</h1>
        <div className="relative w-full h-[30vh] p-10 bg-green-100">
          {/* プレゼント */}

          {/* バッグ画像 */}
          <div className="relative w-full h-full">
            <BagPreview imageUrl="/decoration/test/toruto.png" />
          </div>
        </div>
        <div className="grow">
          <BagDetailContainer />
        </div>
      </div>
    </div>
  </>
}

export default BagDetail