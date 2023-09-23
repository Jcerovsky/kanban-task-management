import React, { useContext } from "react";
import { Context } from "@/app/context/Context";
import Modal, { ModalProps } from "@/app/Modals/Modal";
import { setLocalStorage } from "@/app/utils/setLocalStorage";

function DeleteBoard({ isOpen, onClose }: ModalProps) {
  const { currentBoard, data, updateState } = useContext(Context)!;

  const handleDelete = () => {
    const updatedData = data.filter((board) => board.name !== currentBoard);

    if (updatedData.length === 0) {
      updateState({ currentBoard: "", data: [] });
    } else {
      updateState({ currentBoard: updatedData[0].name, data: updatedData });
      setLocalStorage(updatedData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="dark:bg-slate-800 font-semibold bg-slate-100 flex flex-col gap-6 rounded-lg py-10 px-5 overflow-y-scroll
      p-4 w-[100%]"
      >
        <h3 className="text-xl text-red-600">Delete this board?</h3>
        <p className="text-slate-500 text-sm font-semibold">
          {`Are you sure you want to delete the "${currentBoard}" board? This action
              will remove all columns and tasks and cannot be reversed.`}
        </p>
        <div className="flex justify-between ">
          <button
            className={
              "bg-red-500 hover:bg-red-400 py-2 w-[48%] text-white bg-hover rounded-full transition-all ease-in-out duration-300"
            }
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={
              "bg-neutral-200 hover:bg-neutral-300 w-[48%] text-violet-400 py-2 rounded-full transition-all ease-in-out duration-300"
            }
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBoard;
