import Image from "next/image";

type Props = {
  imageUrl: string;
};

/**
 * バッグのプレビュー。現状は画像表示のみ。
 * @param param0
 * @returns
 */
const BagPreview = ({ imageUrl }: Props) => {
  return (
    <Image src={imageUrl} alt={"bag"} fill style={{ objectFit: "contain" }} />
  );
};

export default BagPreview;
