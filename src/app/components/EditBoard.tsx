"use client";

import Button from "@/app/components/Button";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/Context";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";

function EditBoard() {
  const { currentBoard, setCurrentBoard, data } = useContext(Context)!;
  const [columns, setColumns] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getColumns = () => {
    const currentBoardData = data.filter(
      (board) => board.name.toLowerCase() === currentBoard.toLowerCase(),
    );
    return currentBoardData[0].columns.map((item) => item.name);
  };

  useEffect(() => {
    setColumns(getColumns);
  }, []);

  return (
    <div
      className="edit-board bg-white dark:bg-slate-800 rounded-md absolute top-40 right-40 flex flex-col gap-6 w-1/2 p-6
      shadow-xl"
    >
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2 ">
        <label htmlFor="taskName" className={labelStyle}>
          Board Name
        </label>
        <input
          type="text"
          value={currentBoard}
          onChange={(e) => setCurrentBoard(e.target.value)}
          id="taskName"
          className={` ${inputStyle}`}
        />
        <label htmlFor="subtask" className={labelStyle}>
          Board Columns
        </label>
        <div>
          {columns.map((subtask, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={subtask}
                className="border rounded-md p-2 px-3 w-[95%]"
                onChange={(e) =>
                  setColumns(updateColumn(columns, e.target.value, index))
                }
              />
              <span
                className="ml-auto self-center text-slate-600 text-xl font-bold"
                onClick={() => setColumns(deleteColumn(columns, index))}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
      </form>
      <div className="flex flex-col gap-4 ">
        <Button
          style={"w-full py-[10px] text-white "}
          handleClick={() => setColumns(addColumn(columns))}
        >
          + Add New Column
        </Button>
        <Button style={"py-2 w-full text-white"}>Save Changes</Button>
      </div>
    </div>
  );
}

export default EditBoard;
