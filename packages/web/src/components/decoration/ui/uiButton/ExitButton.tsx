import useDecorationStore from "@/stores/decorationStore";
import { useRouter } from "next/router";
import ExitIcon from "../../../../../public/icon/exit-icon.svg";

/**
 * 退出ボタンのコンポーネント
 * @returns
 */
const ExitButton = () => {
  const { bagId, setBagId } = useDecorationStore((state) => ({
    bagId: state.bagId,
    setBagId: state.setBagId,
  }));
  const router = useRouter();

  const handleClick = async () => {
    // 保存して退出
    //
    await router.push(`/bags/${bagId}/`);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-ghost btn-square w-16 h-16 p-3 ml-3 text-[10px]"
      >
        <ExitIcon />
      </button>
    </>
  );
};

export default ExitButton;
