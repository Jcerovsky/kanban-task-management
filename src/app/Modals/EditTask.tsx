import React, { FormEvent, useEffect, useState } from "react";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import Button from "@/app/components/Button";
import { ColumnProps } from "@/app/context/Context";
import Modal from "@/app/Modals/Modal";

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
  isOpen: boolean;
  onClose: () => void;
}

function EditTask({ taskProp, columnData, isOpen, onClose }: TaskProps) {
  const [editedTaskName, setEditedTaskName] = useState<string>("");
  const [editedTaskDescription, setEditedTaskDescription] =
    useState<string>("");
  const [subtasks, setSubtasks] = useState<SubtaskProps[]>([]);

  useEffect(() => {
    setEditedTaskName(taskProp.title);
    setEditedTaskDescription(taskProp.description);
    setSubtasks(taskProp.subtasks);
  }, [taskProp]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDeleteSubtask = (index: number) => {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks.splice(index, 1);
      return newSubtasks;
    });
  };

  const handleUpdateSubtask = (index: number, newTitle: string) => {
    setSubtasks((prevSubtasks) => {
      const updatedSubtasks = [...prevSubtasks];
      updatedSubtasks[index].title = newTitle;
      return updatedSubtasks;
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-white dark:bg-slate-800 rounded-md flex flex-col gap-6 p-6 shadow-xl text-black
       max-h-[90%]"
      >
        <h1 className=" text-xl dark:text-white">Edit task</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 "
        >
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
          <textarea
            value={editedTaskDescription}
            onChange={(e) => setEditedTaskDescription(e.target.value)}
            className={`border rounded-md text-xs ${inputStyle}`}
          />
          <label className={labelStyle}>Subtasks</label>
          <div>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={subtask.title}
                  className="border rounded-md p-2 px-3 w-[95%] text-sm font-light dark:bg-slate-800 dark:text-white
                  dark:border-gray-700"
                  onChange={(e) => handleUpdateSubtask(index, e.target.value)}
                />
                <span
                  className="ml-auto self-center text-slate-600 text-xl font-bold"
                  onClick={() => handleDeleteSubtask(index)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
          <Button
            style={
              "w-full py-[0.625rem] text-white mb-4 dark:bg-slate-100 dark:text-violet-500"
            }
            handleClick={() =>
              setSubtasks((prevSubtasks) => [
                ...prevSubtasks,
                { title: "", isCompleted: false },
              ])
            }
          >
            + Add New Subtask
          </Button>
          <label className={labelStyle}>Current Status</label>
          <select
            className="mb-3 border-2 font-light text-sm p-3 rounded-md dark:bg-slate-800 dark:text-white
          dark:border-gray-700"
          >
            {columnData.map((column) => (
              <option key={crypto.randomUUID()} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <Button style={"py-2 w-full text-white"}>Save Changes</Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditTask;
