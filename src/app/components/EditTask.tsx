import React, { FormEvent, useEffect, useState } from "react";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import Button from "@/app/components/Button";
import { ColumnProps } from "@/app/context/Context";

interface SubtaskProps {
  title: string;
  isCompleted: boolean;
}

interface TaskProps {
  taskProp: {
    title: string;
    description: string;
    status: string;
    subtasks: SubtaskProps[];
  };
  columnData: ColumnProps[];
}

function EditTask({ taskProp, columnData }: TaskProps) {
  const [editedTaskName, setEditedTaskName] = useState<string>("");
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setEditedTaskName(taskProp.title);
  }, []);

  useEffect(() => {
    const subtasks = taskProp.subtasks.map((subtask) => subtask.title);
    setSubtasks(subtasks);
  }, []);

  return (
    <div
      className="edit-task bg-white dark:bg-slate-800 rounded-md absolute top-40 right-20 flex flex-col gap-6 w-[500px] p-6
      shadow-xl text-black overflow-y-scroll max-h-[600px]"
    >
      <h1 className=" text-xl dark:text-white">Edit task</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2 ">
        <label htmlFor="taskName" className={labelStyle}>
          Task Name
        </label>
        <input
          type="text"
          value={editedTaskName}
          onChange={(e) => setEditedTaskName(e.target.value)}
          id="taskName"
          className={` ${inputStyle} text-sm font-light `}
        />
        <label htmlFor="subtask" className={labelStyle}>
          Description
        </label>
        <textarea className="border rounded-md" />
        <label className={labelStyle}>Subtasks</label>
        <div>
          {taskProp.subtasks.map((subtask, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={subtask.title}
                className="border rounded-md p-2 px-3 w-[95%] text-sm font-light"
                onChange={(e) =>
                  setSubtasks(updateColumn(subtasks, e.target.value, index))
                }
              />
              <span
                className="ml-auto self-center text-slate-600 text-xl font-bold"
                onClick={() => setSubtasks(deleteColumn(subtasks, index))}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
        <Button
          style={"w-full py-[10px] text-white "}
          handleClick={() => setSubtasks(addColumn(subtasks))}
        >
          + Add New Subtask
        </Button>
        <label className={labelStyle}>Current Status</label>
        <select className="mb-3 border-2 font-light text-sm p-3 rounded-md">
          {columnData.map((column) => (
            <option key={crypto.randomUUID()} value={column.name}>
              {column.name}
            </option>
          ))}
        </select>
        <Button style={"py-2 w-full text-white"}>Create Task</Button>
      </form>
    </div>
  );
}

export default EditTask;
