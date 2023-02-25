import useDecorationStore from "@/stores/decorationStore";
import { a, useSpring } from "@react-spring/web";
import { transform } from "typescript";
import CloseButton from "./CloseButton";
import GridItems from "./GridItems";

/**
 * インベントリ（バッグ）のコンポーネント
 * @returns 
 */
const InventoryBag = () => {
  const { closeInventoryBag } = useDecorationStore((state) => ({
    closeInventoryBag: state.closeInventoryBag,
  }))

  return <>
    <div className={'absolute inset-0 bg-black/50'}>
      <div className="flex justify-center h-full pt-[400px]">
        <div className="relative bg-[#414142] h-full w-full rounded-t-[50px]">
          <CloseButton onClick={closeInventoryBag} />
          <GridItems />

        </div>
      </div>
    </div>
  </>
}

export default InventoryBag