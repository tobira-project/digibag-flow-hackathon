import Image from "next/image";

type Props = {
  imageUrl: string;
};

/**
 * バッグ詳細画面のContentsタブのそれぞれのグッズ表示
 * @param param0
 * @returns
 */
const ContentItem = ({ imageUrl }: Props) => {
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

export default ContentItem;
