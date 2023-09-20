"use client";

import React, { useContext, useState } from "react";
import Button from "@/app/components/Button";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import Modal, { ModalProps } from "@/app/Modals/Modal";
import { Context } from "@/app/context/Context";

function AddTaskForm({ isOpen, onClose }: ModalProps) {
  const { data, setData, currentBoard } = useContext(Context)!;
  const currentBoardData = data.filter((board) => board.name === currentBoard);

  const [subtasks, setSubtasks] = useState<string[]>(["", ""]);
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("select");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStatus !== "select") {
      const transformSubtasks = subtasks.map((subtask) => ({
        title: subtask,
        isCompleted: false,
      }));

      const newTask = {
        title: taskName,
        description: description,
        status: currentStatus,
        subtasks: transformSubtasks,
      };

      const updatedData = data.map((board) => {
        if (board.name === currentBoard) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.name.toLowerCase() === currentStatus?.toLowerCase()) {
                return {
                  ...column,
                  tasks: [...column.tasks, newTask],
                };
              }
              return column;
            }),
          };
        }
        return board;
      });
      updatedData
        .filter((board) => board.name === currentBoard)
        .map((col) => col.columns.map((item) => console.log(item)));
      setData(updatedData);

      setTaskName("");
      setDescription("");
      setSubtasks(["", ""]);
      setCurrentStatus("");

      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="flex flex-col gap-6 text-black dark:bg-slate-800 dark:text-white bg-white py-6 p-5
    rounded-md font-bold text-sm"
      >
        <h1 className=" text-xl">Add New Task</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 "
        >
          <label htmlFor="taskName" className={labelStyle}>
            Task Name
          </label>
          <input
            type="text"
            placeholder="e.g. Write work report"
            id="taskName"
            required={true}
            pattern=".{3,}"
            title="Please enter at least three characters"
            className={` ${inputStyle} font-light invalid:ring-2 invalid:ring-red-200 invalid:border-red-500 placeholder:-opacity-50`}
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
          />
          <label htmlFor="description" className={labelStyle}>
            Description
          </label>
          <textarea
            id="description"
            className={`${inputStyle} font-light`}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="subtask" className={labelStyle}>
            Subtasks
          </label>
          <div>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={subtask}
                  required={true}
                  pattern=".{3,}"
                  title="Please enter at least three characters"
                  className="border rounded-md p-2 px-3 w-[95%] font-light invalid:ring-2 invalid:ring-red-300
                  invalid:border-red-300 dark:bg-slate-800"
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
            style={
              "w-full py-[0.625rem] text-white dark:bg-slate-100 dark:text-violet-500 "
            }
            handleClick={() => setSubtasks(addColumn(subtasks))}
          >
            + Add New Subtask
          </Button>
          <label htmlFor="currentStatus" className={`${labelStyle} mt-5`}>
            Current Status
          </label>
          <select
            className={`${inputStyle} font-light ${
              currentStatus === "select" && "bg-red-200"
            }`}
            onChange={(e) => setCurrentStatus(e.target.value)}
            value={currentStatus}
          >
            <option value="select">Select</option>
            {currentBoardData.map((board) =>
              board.columns.map((col) => (
                <option key={crypto.randomUUID()} value={col.name}>
                  {col.name}
                </option>
              )),
            )}
          </select>
          <Button style={"w-full py-[0.625rem] text-white "} type={"submit"}>
            Create Task
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddTaskForm;
