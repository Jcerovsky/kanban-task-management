import React, { useContext, useState } from "react";
import { Context } from "@/app/context/Context";

function DeleteBoard() {
  const { currentBoard } = useContext(Context)!;
  const [isHidden, setIsHidden] = useState<boolean>(false);

  return (
    <div
      className={`delete-board bg-white dark:bg-slate-800 rounded-md absolute font-semibold top-60 right-20 flex flex-col gap-6 w-1/2 p-6 
      shadow-xl ${isHidden ? "hidden" : ""}`}
    >
      <h3 className="text-xl text-red-600">Delete this board?</h3>
      <p className="text-slate-500 text-sm">
        {`Are you sure you want to delete the ${currentBoard} board? This action
              will remove all columns and tasks and cannot be reversed.`}
      </p>
      <div className="flex justify-between ">
        <button
          className={
            "bg-red-500 hover:bg-red-400 py-2 w-[48%] text-white bg-hover rounded-full transition-all ease-in-out duration-300"
          }
        >
          Delete
        </button>
        <button
          className={
            "bg-neutral-200 hover:bg-neutral-300 w-[48%] text-violet-400 py-2 rounded-full transition-all ease-in-out duration-300"
          }
          onClick={() => setIsHidden(true)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteBoard;
