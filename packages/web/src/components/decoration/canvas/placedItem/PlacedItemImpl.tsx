import useDirectMove from "@/hooks/useDirectMove";
import { PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/directMoveType";
import { ReactNode, Suspense, useEffect, useRef } from "react";
import { Euler, Group, Vector3 } from "three";

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
  const modelGroupRef = useRef<Group>(null);

  // モデルを接地面の法線方向に向ける
  useEffect(() => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.lookAt(itemData.lookDir.sub(itemData.position));
  }, [itemData.lookDir]);

  return (
    <>
      <Suspense fallback={null}>
        <group>
          <group
            ref={modelGroupRef}
            // onClick={handle}
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
