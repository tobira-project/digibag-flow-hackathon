import useDecorationStore from "@/stores/decorationStore";
import { PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/directMoveType";
import { ThreeEvent } from "@react-three/fiber";
import { ReactNode, Suspense, useEffect, useRef } from "react";
import { Group } from "three";

type Props = {
  itemData: PlacedItemData;
  handleDirectDown: DirectDownType;
  children: ReactNode;
};

/**
 * 痛バッグ上に設置するグッズについて、実際に表示処理を実行するコンポーネント。
 * @param param0
 * @returns
 */
const PlacedItemImpl = ({ itemData, handleDirectDown, children }: Props) => {
  const { selectItem } = useDecorationStore((state) => ({
    selectItem: state.selectItem,
  }));
  const modelGroupRef = useRef<Group>(null);

  // モデルを接地面の法線方向に向ける
  useEffect(() => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.lookAt(itemData.position.sub(itemData.lookDir));
    console.log(itemData.lookDir, itemData.position);
  }, [itemData.lookDir]);

  // グッズの選択
  const handleOnClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectItem(itemData.id);
  };

  return (
    <>
      <Suspense fallback={null}>
        <group>
          <group
            ref={modelGroupRef}
            onClick={handleOnClick}
            onPointerDown={(e) => handleDirectDown(e, itemData.id)}
            position={itemData.position}
            scale={[itemData.scale, itemData.scale, 1]}
          >
            {children}
          </group>
        </group>
      </Suspense>
    </>
  );
};

export default PlacedItemImpl;
