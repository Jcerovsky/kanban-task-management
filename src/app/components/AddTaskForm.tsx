"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";

function AddTaskForm() {
  const [subtasks, setSubtasks] = useState<number[]>([1, 1]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const addSubtaskClick = () => {
    setSubtasks((prevState) => prevState + 1);
  };

  const inputStyle = "border rounded-md p-2 px-3 mb-5";
  const labelStyle = "text-xs text-slate-400";

  return (
    <div className="flex flex-col gap-6 text-black bg-white p-3 py-6 rounded-md w-[450px] font-bold text-sm">
      <h1 className=" text-xl">Add New Task</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2 ">
        <label htmlFor="taskName" className={labelStyle}>
          Task Name
        </label>
        <input
          type="text"
          placeholder="e.g. Write work report"
          id="taskName"
          className={`placeholder-taskName ${inputStyle}`}
        />
        <label htmlFor="description" className={labelStyle}>
          Description
        </label>
        <textarea id="description" className={inputStyle} />
        <label htmlFor="subtask" className={labelStyle}>
          Subtasks
        </label>
        {}
        <Button
          style={"w-full py-[10px] text-white "}
          handleClick={addSubtaskClick}
        >
          + Add New Subtask
        </Button>
        <label htmlFor="currentStatus" className={`${labelStyle} mt-5`}>
          Current Status
        </label>
        <select className={inputStyle}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <Button style={"w-full py-[10px] text-white "}>Create Task</Button>
      </form>
    </div>
  );
}

export default AddTaskForm;
