import useArrangementStore from "@/stores/arrangementStore";
import Image from "next/image";
import ItemModalButton from "./ui/ItemModalButton";
import TakeThisOutIcon from "@/../public/icon/takethisout-icon.svg";
import MoveItemIcon from "@/../public/icon/moveitem-icon.svg";

const ItemModal = () => {
  const { closeItemModal } = useArrangementStore((state) => ({
    closeItemModal: state.closeItemModal,
  }));

  const handleOuterClick = () => {
    // グッズの詳細表示を開く
    closeItemModal();
  };

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
          <h2 className="item-modal-title">Item name</h2>
          <div className="item-modal-border" />
          <p className="item-modal-author">Gorakuba!</p>
          <div className="item-modal-image">
            {/* 画像表示 */}
            <Image
              src={"/decoration/test/tbr_inutanuki.png"}
              alt={"item"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className="item-modal-description">
            desfffffffffffffffffffffffffffffcriptiondescriptiondescription
            descriptiondescriptiondescription
          </p>
          <div className="item-modal-btn-container">
            {/* ボタン */}
            <ItemModalButton onClick={() => {}}>
              <div className="item-modal-btn-icon">
                <div className="ml-[60%] w-5 aspect-square">
                  <TakeThisOutIcon />
                </div>
              </div>
              <div className="item-modal-btn-text ">
                <div className="text-start pl-4">{"Take This out"}</div>
              </div>
            </ItemModalButton>
            {/* ボタン */}
            <ItemModalButton onClick={() => {}}>
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
