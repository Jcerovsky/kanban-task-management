import React, { useEffect } from "react";
import Button from "@/app/components/Button";

function AddNewBoard() {
  const inputStyle = "border rounded-md p-2 px-3 mb-5";
  const labelStyle = "text-xs text-slate-400";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="new-board absolute left-[150%] top-[25%] flex flex-col gap-6 text-black bg-white p-3 py-6
    rounded-md w-[450px] font-bold text-sm"
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
          className={`placeholder-taskName ${inputStyle}`}
        />
        <label htmlFor="subtask" className={labelStyle}>
          Board Columns
        </label>
        {}
        <Button style={"w-full py-[10px] text-white "}>+ Add New Column</Button>
        <Button style={"w-full py-[10px] text-white mt-5 "}>
          Create New Board
        </Button>
      </form>
    </div>
  );
}

export default AddNewBoard;
