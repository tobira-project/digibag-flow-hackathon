import { RefObject } from "react";

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

/**
 * ギフトモーダルのテキスト入力欄コンポーネント
 * @param param0
 * @returns
 */
const GiftInput = ({ inputRef }: Props) => {
  return (
    <>
      <div className="form-control w-full">
        <input
          type="text"
          placeholder="Address or domain name"
          className="gift-input placeholder:text-[18px] placeholder:text-[#ADADAD]"
        />
      </div>
    </>
  );
};

export default GiftInput;
