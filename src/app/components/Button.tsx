import React from "react";

interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  style?: string;
  type?: "button" | "reset" | "submit";
}

function Button({ children, handleClick, style, type }: Props) {
  return (
    <button
      className={` ${style} bg-violet-500 rounded-full ml-auto cursor-pointer hover:bg-violet-400
      transition-all duration-300`}
      onClick={handleClick}
      type={!type ? `button` : type}
    >
      {children}
    </button>
  );
}

export default Button;
