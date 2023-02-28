import { useRef } from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
  checkValue: (value: string) => boolean;
};

const TextBox = ({ value, setValue, checkValue }: Props) => {
  /**
   * Sign in/upフォームのテキストボックス
   */
  return (
    <>
      <div className="form-control w-full">
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full rounded-full border-none bg-[#EEF3F9] placeholder:text-xl px-6"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="h-[8px]">
          {value !== '' && !checkValue(value) && (
            <label className="label mt-[-4px]">
              <span className="label-text-alt">*invalid email</span>
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default TextBox;
