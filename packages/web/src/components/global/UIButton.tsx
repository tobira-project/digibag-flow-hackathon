import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

/**
 * 装飾画面のUIボタン
 * @returns
 */
const UIButton = ({
  onClick,
  children,
  className,
  disabled = false,
}: Props) => {
  return (
    <>
      <button
        type={"button"}
        onClick={onClick}
        className={`btn btn-circle pointer-events-auto p-[8px]  ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default UIButton;
