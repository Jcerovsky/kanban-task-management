import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";

function AddNewBoard() {
  const [columns, setColumns] = useState<string[]>(["Todo", "Doing"]);

  const inputStyle = "border rounded-md p-2 px-3 mb-5";
  const labelStyle = "text-xs text-slate-400";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="new-board absolute left-[150%] top-[10%] flex flex-col gap-6 text-black bg-white p-3 py-6
    rounded-md w-[450px] font-bold text-sm overflow-y-scroll max-h-[75%]"
    >
      <h1 className=" text-xl">Add new board</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2 ">
        <label htmlFor="taskName" className={labelStyle}>
          Board Name
        </label>
        <input
          type="text"
          placeholder="e.g. Write Report"
          id="taskName"
          className={`${inputStyle}`}
        />
        <label htmlFor="subtask" className={labelStyle}>
          Board Columns
        </label>
        <div className="flex flex-col ">
          {columns.map((column, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={column}
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

        <Button
          style={"w-full py-[10px] text-white "}
          handleClick={() => setColumns(addColumn(columns))}
        >
          + Add New Column
        </Button>
        <Button style={"w-full py-[10px] text-white mt-5 "}>
          Create New Board
        </Button>
      </form>
    </div>
  );
}

export default AddNewBoard;
