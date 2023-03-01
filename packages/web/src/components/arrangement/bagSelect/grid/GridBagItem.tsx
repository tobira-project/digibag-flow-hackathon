import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string;
  title: string;
  bagId: number;
};

/**
 * グリッド表示のバッグ選択画面での、個々のバッグの表示コンポーネント
 * @param param0
 * @returns
 */
const GridBagItem = ({ imageUrl, title, bagId }: Props) => {
  return (
    <>
      <div className="btn w-full h-full border-none aspect-[3/3.7] rounded-[30px] glass-light-dark px-0 pb-2 normal-case hover:bg-black/40">
        <Link className="w-full h-full" href={`/bags/${bagId}/`}>
          <div className="h-full flex flex-col px-3 pt-3 pb-2 w-full">
            <div className="relative grow">
              <Image
                src={imageUrl}
                alt={"item"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="text-center text-white font-scandia-web-500 text-[21px]">
              {title}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default GridBagItem;
