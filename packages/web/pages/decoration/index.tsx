import DecorationWindow from "@/components/decoration/DecorationWindow";
import { NextPage } from "next";

const DecorationPage: NextPage = () => {
  return (
    <>
      <div className="overflow-hidden">
        <DecorationWindow />
      </div>
    </>
  );
};

export default DecorationPage;
