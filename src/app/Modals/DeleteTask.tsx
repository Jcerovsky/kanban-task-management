import React, { useContext } from "react";
import Modal from "@/app/Modals/Modal";
import { Context } from "@/app/context/Context";
import { setLocalStorage } from "@/app/utils/setLocalStorage";

interface Props {
  currentTask: string;
  isOpen: boolean;
  onClose: () => void;
}

function DeleteTask({ currentTask, isOpen, onClose }: Props) {
  const { data, currentBoard, updateState } = useContext(Context)!;

  const handleDelete = () => {
    const updatedData = data.map((board) => {
      if (board.name === currentBoard) {
        board.columns.forEach((column) => {
          column.tasks = column.tasks.filter(
            (task) => task.title !== currentTask,
          );
        });
      }
      return board;
    });

    updateState({ data: updatedData });
    setLocalStorage(updatedData);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-md font-semibold flex flex-col gap-6 p-6">
        <h3 className="text-xl text-red-600">Delete this task?</h3>
        <p className="text-slate-500 text-sm">
          {`Are you sure you want to delete the "${currentTask}" task and its subtasks? This action
    cannot be reversed.`}
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

export default DeleteTask;
