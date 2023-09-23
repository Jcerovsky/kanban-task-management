"use client";

import React, { useContext, useEffect, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import TaskSettings from "@/app/components/TaskSettings";
import { ModalProps } from "@/app/Modals/Modal";
import Modal from "@/app/Modals/Modal";
import { IModifyTaskProps } from "@/app/components/Task";
import { setLocalStorage } from "@/app/utils/setLocalStorage";

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
  updateState: (newState: Partial<IModifyTaskProps>) => void;
}

function ViewTask({
  taskProp,
  columnData,
  updateState,
  isOpen,
  onClose,
}: TaskProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<SubtaskProps[]>(taskProp.subtasks);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const {
    data,
    currentBoard,
    updateState: updateStateFromContext,
  } = useContext(Context)!;

  useEffect(() => {
    setSelectedColumn(taskProp.status);
  }, [taskProp.status]);

  const updateSubtask = (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    setSubtasks(updatedSubtasks);

    const updatedData = [...data];

    updatedData.forEach((board) => {
      if (board.name === currentBoard) {
        board.columns.forEach((col) => {
          col.tasks.forEach((task) => {
            if (task.title === taskProp.title) {
              task.subtasks = updatedSubtasks;
              task.status = selectedColumn;
            }
          });
        });
      }
    });
    updateStateFromContext({ data: updatedData });
    setLocalStorage(updatedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-stone-50 dark:bg-slate-800 dark:text-white rounded-md p-6 dark:text-black ">
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
        <p className="text-gray-400 font-bold text-xs tracking-widest mb-3">
          Subtasks (
          {taskProp.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
          {taskProp.subtasks.length})
        </p>
        <div className="mb-5">
          {taskProp.subtasks.map((subtask, index) => (
            <div
              className=" cursor-pointer flex items-center gap-2 bg-violet-50 p-2 py-3 mb-2
            rounded-sm hover:bg-violet-100 dark:bg-slate-900  "
              key={crypto.randomUUID()}
            >
              <input
                type="checkbox"
                className={`w-4 h-4 transform duration-100 ease-in ${
                  subtask.isCompleted && "bg-violet-500"
                }`}
                checked={subtask.isCompleted}
                onChange={() => updateSubtask(index)}
              />
              <label
                className={`${
                  subtask.isCompleted ? "line-through text-slate-500" : ""
                } text-xs font-semibold`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
        </div>
        <p className="text-slate-500 font-semibold text-xs mb-3">
          Current Status
        </p>
        <select
          className="border rounded-md w-full p-3 text-xs dark:bg-slate-800 dark:border-gray-700"
          onChange={(e) => {
            setSelectedColumn(e.target.value);
          }}
          value={selectedColumn}
        >
          {columnData.map((column) => (
            <option
              key={crypto.randomUUID()}
              value={column.name}
              className="p-2 font-light"
            >
              {column.name}
            </option>
          ))}
        </select>
        {
          <TaskSettings
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            updateState={updateState}
          />
        }
      </div>
    </Modal>
  );
}

export default ViewTask;
