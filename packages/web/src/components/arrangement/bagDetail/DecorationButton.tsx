import UIButton from "@/components/global/UIButton";
import { useRouter } from "next/router";

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
      <UIButton onClick={handleClick} className="bottom-btn-md">
        {"decorate"}
      </UIButton>
    </>
  );
};

export default DecorationButton;
