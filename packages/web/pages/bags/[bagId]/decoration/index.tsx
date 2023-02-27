import DecorationWindow from "@/components/decoration/DecorationWindow";
import { NextPage } from "next";

/**
 * バッグの装飾ページ
 * @returns
 */
const DecorationPage: NextPage = () => {
  return (
    <>
      <div className="page-top-container overflow-hidden">
        <DecorationWindow />
      </div>
    </>
  );
};

export default DecorationPage;
