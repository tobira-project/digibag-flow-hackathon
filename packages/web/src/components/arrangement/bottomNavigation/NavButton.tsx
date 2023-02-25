import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

/**
 * バッグ選択画面でのBottom Navigationのボタン
 * @param param0
 * @returns
 */
const NavButton = ({ onClick, children, className }: Props) => {
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

export default NavButton;
