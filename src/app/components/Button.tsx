import React from "react";

interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  style?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}

function Button({ children, handleClick, style, type, disabled }: Props) {
  return (
    <button
      className={` ${style} bg-violet-600 rounded-full ml-auto cursor-pointer ${
        !disabled && "hover:bg-violet-400"
      }
      transition-all duration-300 ${disabled && "opacity-20"}`}
      onClick={handleClick}
      type={!type ? `button` : type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
