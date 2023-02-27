import useArrangementStore from "@/stores/arrangementStore";
import Image from "next/image";

type Props = {
  itemId: string;
  imageUrl: string;
};

/**
 * バッグ詳細画面のAttachmentsタブのそれぞれのグッズ表示
 * @param param0
 * @returns
 */
const AttachmentItem = ({ itemId, imageUrl }: Props) => {
  const { openItemModal } = useArrangementStore((state) => ({
    openItemModal: state.openItemModal,
  }));

  const handleClick = () => {
    if (itemId === "") return;
    // グッズの詳細表示を開く
    openItemModal(itemId);
  };

  return (
    <>
      <button onClick={handleClick}>
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt={"item"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </button>
    </>
  );
};

export default AttachmentItem;
