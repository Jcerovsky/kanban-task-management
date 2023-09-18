"use client";

import React, { useState } from "react";
import { ColumnProps } from "@/app/context/Context";
import TaskSettings from "@/app/components/TaskSettings";
import { ModalProps } from "@/app/Modals/Modal";
import Modal from "@/app/Modals/Modal";

interface SubtaskProps {
  title: string;
  isCompleted: boolean;
}

interface TaskProps extends ModalProps {
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
  isOpen,
  onClose,
}: TaskProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<SubtaskProps[]>(taskProp.subtasks);

  const updateSubtask = (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setSubtasks(updatedSubtasks);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white w-[500px] rounded-md p-5 dark:text-black ">
        <div className="flex justify-between items-center">
          <h1 className="mb-5 text-lg">{taskProp.title}</h1>
          <img
            src="../../../assets/icon-vertical-ellipsis.svg"
            alt="three dots"
            className="cursor-pointer self-center"
            onClick={() => setIsVisible((prevState) => !prevState)}
          />
        </div>
        {taskProp.description.length > 0 && (
          <p className="text-slate-500 font-semibold text-sm mb-5">
            {taskProp.description}
          </p>
        )}
        <p className="text-slate-500 text-xs tracking-widest mb-3">
          Subtasks (
          {taskProp.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {taskProp.subtasks.length})
        </p>
        <div className="mb-5">
          {taskProp.subtasks.map((subtask, index) => (
            <div
              className=" cursor-pointer flex items-center gap-2 bg-neutral-200 p-2 py-3 mb-2
            rounded-sm hover:bg-neutral-400  "
              key={crypto.randomUUID()}
            >
              <input
                type="checkbox"
                name={"checkbox"}
                id={"checkbox"}
                className={`w-4 h-4 transform duration-300 ${
                  subtask.isCompleted && "bg-violet-500"
                }`}
                checked={subtask.isCompleted}
                onChange={() => updateSubtask(index)}
              />
              <label
                htmlFor={"checkbox"}
                className={`${
                  subtask.isCompleted ? "line-through text-slate-500" : ""
                } text-xs`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
        </div>
        <p className="text-slate-500 font-semibold text-xs mb-3">
          Current Status
        </p>
        <select className="border rounded-md w-full p-2 px-3 text-xs">
          {columnData.map((column) => (
            <option
              key={crypto.randomUUID()}
              value={column.name}
              className="p-2"
              defaultValue={
                column.name === taskProp.status ? column.name : column.name
              }
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
    </Modal>
  );
}

export default ViewTask;
