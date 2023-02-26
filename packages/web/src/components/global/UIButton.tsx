import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

/**
 * 装飾画面のUIボタン
 * @returns
 */
const UIButton = ({ onClick, children, className }: Props) => {
  return (
    <>
      <button
        type={"button"}
        onClick={onClick}
        className={`btn btn-circle pointer-events-auto p-[8px]  ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default UIButton;
