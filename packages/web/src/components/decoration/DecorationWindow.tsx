import DecorationCanvas from "./canvas/DecorationCanvas";
import DecorationUI from "./ui/DecorationUI";

/**
 * 装飾作業を行う画面を表示するコンポーネント
 * @returns
 */
const DecorationWindow = () => {
  return (
    <>
      <DecorationCanvas />
      <DecorationUI />
    </>
  );
};

export default DecorationWindow;
