import useArrangementStore from "@/stores/arrangementStore";
import Image from "next/image";
import ItemModalButton from "./ui/ItemModalButton";
import TakeThisOutIcon from "@/../public/icon/takethisout-icon.svg";
import MoveItemIcon from "@/../public/icon/moveitem-icon.svg";
import decorationData from "@/data/decorationData.json";
import { ItemDataType } from "@/types/arrangement/itemData";
import { useEffect, useState } from "react";

/**
 * グッズ詳細を表示するモーダルのコンポーネント
 * @returns
 */
const ItemModal = () => {
  const { closeItemModal, selectedItemModalId } = useArrangementStore(
    (state) => ({
      closeItemModal: state.closeItemModal,
      selectedItemModalId: state.selectedItemModalId,
    })
  );

  const DEFAULT_ITEM_DATA: ItemDataType = {
    id: "",
    imageUrl: "",
    title: "",
    author: "",
    description: "",
  };
  const [itemData, setItemData] = useState<ItemDataType>(DEFAULT_ITEM_DATA);

  // データのセット
  useEffect(() => {
    const newData = decorationData.mockItemList.find(
      (v) => v.id === selectedItemModalId
    );
    if (!newData) return;
    setItemData(newData);
  }, []);

  // 外側をクリックでモーダルを閉じる
  const handleOuterClick = () => {
    // グッズの詳細表示を開く
    closeItemModal();
  };

  // 内側のクリックではモーダルを閉じない
  const handleContainerClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
  };

  return (
    <>
      <div className="item-modal-outer" onClick={handleOuterClick}>
        <div
          className="item-modal-container"
          onClick={(ev) => handleContainerClick(ev)}
        >
          <h2 className="item-modal-title">{itemData.title}</h2>
          <div className="item-modal-border" />
          <p className="item-modal-author">{itemData.author}</p>
          <div className="item-modal-image">
            {/* 画像表示 */}
            <Image
              src={itemData.imageUrl}
              alt={"item"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className="item-modal-description">{itemData.description}</p>
          <div className="item-modal-btn-container">
            {/* ボタン */}
            <ItemModalButton onClick={() => { }}>
              <div className="item-modal-btn-icon">
                <div className="ml-[60%] w-5 aspect-square">
                  <TakeThisOutIcon />
                </div>
              </div>
              <div className="item-modal-btn-text ">
                <div className="text-start pl-4">{"Take this out"}</div>
              </div>
            </ItemModalButton>
            {/* ボタン */}
            <ItemModalButton onClick={() => { }}>
              <div className="item-modal-btn-icon">
                <div className="w-12 ml-[30%]">
                  <MoveItemIcon />
                </div>
              </div>
              <div className="item-modal-btn-text">
                <div className="text-start pl-2">{"Move to another"}</div>
              </div>
            </ItemModalButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModal;
