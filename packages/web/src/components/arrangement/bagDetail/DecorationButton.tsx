import UIButton from "@/components/global/UIButton";
import { useRouter } from "next/router";
import TwinklehoiIcon from "../../../../public/icon/twinklehoi-icon.svg"

/**
 * 装飾ページへの移動用ボタンコンポーネント
 * @returns
 */
const DecorationButton = () => {
  const router = useRouter();

  const handleClick = () => {
    if (!router.query.bagId) return;
    console.log(router.query.bagId);
    router.push(`/bags/${router.query.bagId}/decoration/`);
  };

  return (
    <>
      <UIButton onClick={handleClick} className="bottom-btn-md p-2 pr-[13px] pb-[10px] bg-white hover:bg-[#ddd] border-none drop-shadow-lg">
        <TwinklehoiIcon />
      </UIButton>
    </>
  );
};

export default DecorationButton;
