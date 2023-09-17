"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import Modal, { ModalProps } from "@/app/Modals/Modal";

function AddTaskForm({ isOpen, onClose }: ModalProps) {
  const [subtasks, setSubtasks] = useState<string[]>(["", ""]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="flex flex-col gap-6 text-black bg-white py-6
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
            className={`placeholder-taskName ${inputStyle}`}
          />
          <label htmlFor="description" className={labelStyle}>
            Description
          </label>
          <textarea id="description" className={inputStyle} />
          <label htmlFor="subtask" className={labelStyle}>
            Subtasks
          </label>
          <div>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={subtask}
                  className="border rounded-md p-2 px-3 w-[95%]"
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
    </Modal>
  );
}

export default AddTaskForm;
