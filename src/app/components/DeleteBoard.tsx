import React, { useContext, useState } from "react";
import { Context } from "@/app/context/Context";
import Button from "@/app/components/Button";

function DeleteBoard() {
  const { currentBoard, setIsShown } = useContext(Context)!;
  const [isHidden, setIsHidden] = useState<boolean>(false);

  return (
    <div
      className={`delete-board bg-white rounded-md absolute font-bold top-20 right-20 flex flex-col gap-3 w-1/2 p-6 ${
        isHidden ? "hidden" : ""
      }`}
    >
      <h3 className="text-xl text-red-600">Delete this board?</h3>
      <p className="text-slate-500 text-sm">
        {`Are you sure you want to delete the ${currentBoard} board? This action
              will remove all columns and tasks and cannot be reversed.`}
      </p>
      <div className="flex space-between">
        <button
          className={"bg-red-500 w-1/2  py-2 text-white bg-hover rounded-full"}
        >
          Delete
        </button>
        <button
          className={"bg-neutral-200 w-1/2 text-violet-400 py-2 rounded-full"}
          onClick={() => setIsHidden(true)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteBoard;
