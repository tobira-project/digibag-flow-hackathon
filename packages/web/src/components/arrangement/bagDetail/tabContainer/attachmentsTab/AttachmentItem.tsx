import Image from "next/image";

type Props = {
  imageUrl: string;
};

/**
 * バッグ詳細画面のAttachmentsタブのそれぞれのグッズ表示
 * @param param0
 * @returns
 */
const AttachmentItem = ({ imageUrl }: Props) => {
  const handleClick = () => {
    // グッズの詳細表示を開く
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
