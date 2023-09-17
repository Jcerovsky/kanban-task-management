"use client";

import React, { useContext, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import TaskSettings from "@/app/components/TaskSettings";
import EditTask from "@/app/components/EditTask";

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
  setDeleteTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewTask({
  taskProp,
  columnData,
  setDeleteTaskModalVisible,
  setEditTaskModalVisible,
}: TaskProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<SubtaskProps[]>(taskProp.subtasks);

  const updateSubtask = (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setSubtasks(updatedSubtasks);
  };

  return (
    <>
      <div className="view-task absolute top-[20%] bg-blue-200 rounded-md p-5 w-[75%]">
        <div className="flex justify-between items-center">
          <h1 className="mb-5">{taskProp.title}</h1>
          <img
            src="../../../assets/icon-vertical-ellipsis.svg"
            alt="three dots"
            className="cursor-pointer self-center"
            onClick={() => setIsVisible((prevState) => !prevState)}
          />
        </div>
        <p className="text-slate-500 text-sm tracking-widest mb-2">
          Subtasks (
          {taskProp.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {taskProp.subtasks.length})
        </p>
        {taskProp.subtasks.map((subtask, index) => (
          <div
            className=" cursor-pointer flex gap-2 bg-neutral-200 p-2 py-3 text-sm mb-2 rounded-sm hover:bg-neutral-400  "
            key={crypto.randomUUID()}
          >
            <input
              type="checkbox"
              name={"checkbox"}
              id={"checkbox"}
              checked={subtask.isCompleted}
              onChange={() => updateSubtask(index)}
            />
            <label
              htmlFor={"checkbox"}
              className={`${
                subtask.isCompleted ? "line-through text-slate-500" : ""
              }`}
            >
              {subtask.title}
            </label>
          </div>
        ))}
        <p className="text-slate-500 text-sm mb-2">Current Status</p>
        <select className="border rounded-md w-full p-2 px-3 text-sm">
          {columnData.map((column) => (
            <option
              key={crypto.randomUUID()}
              value={column.name}
              className="p-2"
            >
              {column.name}
            </option>
          ))}
        </select>
        {
          <TaskSettings
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setDeleteTaskModalVisible={setDeleteTaskModalVisible}
            setEditTaskModalVisible={setEditTaskModalVisible}
          />
        }
      </div>
    </>
  );
}

export default ViewTask;
