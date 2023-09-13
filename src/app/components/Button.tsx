import React from "react";

interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  style?: string;
}

function Button({ children, handleClick, style }: Props) {
  return (
    <button
      className={` ${style} bg-violet-500 rounded-full ml-auto cursor-pointer hover:bg-violet-400
      transition-all duration-300`}
      onClick={() => handleClick!()}
    >
      {children}
    </button>
  );
}

export default Button;
