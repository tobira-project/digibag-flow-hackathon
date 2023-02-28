import useDecorationStore from "@/stores/decorationStore";
import { useRouter } from "next/router";
import ExitIcon from "../../../../../public/icon/exit-icon.svg";

/**
 * 退出ボタンのコンポーネント
 * @returns
 */
const ExitButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    if (!router.query.bagId) return;
    if (typeof router.query.bagId !== "string") return;
    // 保存して退出
    //
    router.push(`/bags/${router.query.bagId}/`);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-ghost btn-square w-16 h-16 p-3 ml-3 text-[10px] icon-exit"
      >
        <ExitIcon />
      </button>
    </>
  );
};

export default ExitButton;
