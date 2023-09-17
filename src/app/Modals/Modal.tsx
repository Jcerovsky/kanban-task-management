import React, { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className=" absolute left-1/2 transform -translate-x-1/2 rounded-lg shadow-lg z-10 max-h-[80%] w-[500px] overflow-y-scroll
       "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
