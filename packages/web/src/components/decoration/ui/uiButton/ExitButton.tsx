import useDecorationStore from "@/stores/decorationStore";
import { useRouter } from "next/router";
import ExitIcon from "../../../../../public/decoration/icon/exit.svg";

const ExitButton = () => {
  const { bagId, setBagId } = useDecorationStore((state) => ({
    bagId: state.bagId,
    setBagId: state.setBagId,
  }));
  const router = useRouter();

  const handleClick = () => {
    // 保存して退出
    //
    router.push(`/bags/${bagId}/`);
    setBagId(-1);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-ghost w-20 h-10 text-[20px]"
      >
        {/* <ExitIcon /> */}
        aiueo
      </button>
    </>
  );
};

export default ExitButton;
