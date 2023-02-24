import useDecorationStore from "@/stores/decorationStore";
import { PlacedItemData } from "@/types/decorationItemType";
import { DirectDownType } from "@/types/gestureType";
import { ThreeEvent } from "@react-three/fiber";
import { ReactNode, Suspense, useContext, useEffect, useRef } from "react";
import { Group, Vector2 } from "three";
import { DirectMoveContext, RaycastContext } from "../DecorationCanvas";

type Props = {
  itemData: PlacedItemData;
  children: ReactNode;
};

/**
 * 痛バッグ上に設置するグッズについて、実際に表示処理を実行するコンポーネント。
 * @param param0
 * @returns
 */
const PlacedItemImpl = ({ itemData, children }: Props) => {
  const { selectItem, setItemPos, setItemLookDir, isCameraMode, toggleCameraMode } = useDecorationStore(
    (state) => ({
      selectItem: state.selectItem,
      setItemPos: state.setItemPos,
      setItemLookDir: state.setItemLookDir,
      isCameraMode: state.isCameraMode,
      toggleCameraMode: state.toggleCameraMode,
    })
  );
  const handleDirectDown = useContext(DirectMoveContext)
  const modelGroupRef = useRef<Group>(null);
  const raycastContext = useContext(RaycastContext);

  // 新規生成時、グッズを画面中心からのraycastにより初期配置に移動させる
  useEffect(() => {
    if (!raycastContext) return;
    const { raycaster, cameraRef, itaBagRef } = raycastContext;
    if (!cameraRef.current || !itaBagRef.current) return;
    raycaster.setFromCamera(new Vector2(0, 0), cameraRef.current);

    // raycastのターゲットを取得
    const intersects = raycaster.intersectObject(itaBagRef.current);
    // 衝突なし
    if (intersects.length === 0) return;

    const pointerTarget = intersects[0];

    if (pointerTarget.face) {
      // 姿勢の更新
      setItemLookDir(itemData.id, pointerTarget.face.normal);
    }
    // 座標の更新
    setItemPos(itemData.id, pointerTarget.point);
  }, [])

  // モデルを接地面の法線方向に向ける
  useEffect(() => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.lookAt(itemData.position.clone().sub(itemData.lookDir));
  }, [itemData.lookDir]);

  // グッズの選択
  const handleOnClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    // カメラモードで選択した場合、グッズ操作モードへ切り替える
    if (isCameraMode) {
      toggleCameraMode();
    }

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
