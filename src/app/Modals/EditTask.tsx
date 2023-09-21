import React, { FormEvent, useContext, useEffect, useState } from "react";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import Button from "@/app/components/Button";
import { ColumnProps, Context } from "@/app/context/Context";
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
  const [editedTask, setEditedTask] = useState({
    title: taskProp.title,
    description: taskProp.description,
    status: taskProp.status,
    subtasks: taskProp.subtasks,
  });

  const { data, setData, currentBoard } = useContext(Context)!;

  useEffect(() => {
    setEditedTask({
      title: taskProp.title,
      description: taskProp.description,
      status: taskProp.status,
      subtasks: taskProp.subtasks,
    });
  }, [taskProp]);

  const handleUpdateSubtask = (index: number, newTitle: string) => {
    setEditedTask((prevTask) => {
      const updatedSubtasks = [...prevTask.subtasks];
      updatedSubtasks[index].title = newTitle;
      return { ...prevTask, subtasks: updatedSubtasks };
    });
  };

  const handleDeleteSubtask = (index: number) => {
    setEditedTask((prevTask) => {
      const newSubtasks = [...prevTask.subtasks];
      newSubtasks.splice(index, 1);
      return { ...prevTask, subtasks: newSubtasks };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = data.map((board) => {
      if (board.name === currentBoard) {
        const newColumns = board.columns.map((col) => {
          const newTasks = col.tasks.map((currentCol) => {
            if (currentCol.title === taskProp.title) {
              if (
                editedTask.title.length > 0 &&
                currentCol.title === editedTask.title &&
                currentCol.status === taskProp.status &&
                currentCol.description === taskProp.description &&
                JSON.stringify(currentCol.subtasks) ===
                  JSON.stringify(taskProp.subtasks)
              ) {
                return currentCol;
              } else if (currentCol.status !== editedTask.status) {
                return editedTask;
              } else {
                return currentCol;
              }
            } else {
              return currentCol;
            }
          });

          return { ...col, tasks: newTasks };
        });

        return { ...board, columns: newColumns };
      } else {
        return board;
      }
    });

    const originalStatus = taskProp.status;

    const originalColumnIndex = columnData.findIndex(
      (column) => column.name === originalStatus,
    );

    if (originalColumnIndex !== -1) {
      updatedData.forEach((board) => {
        const column = board.columns[originalColumnIndex];
        if (column) {
          column.tasks = column.tasks?.filter(
            (task) => task.title !== taskProp.title,
          );
        }
      });
    }

    const newColumnIndex = columnData.findIndex(
      (column) => column.name === editedTask.status,
    );

    if (newColumnIndex !== -1) {
      updatedData.forEach((board) => {
        const column = board.columns[newColumnIndex];
        if (column) {
          if (!column.tasks) {
            column.tasks = [];
          }
          column.tasks.push(editedTask);
        }
      });
    }

    onClose();
    setData(updatedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-md flex flex-col gap-6 p-6 shadow-xl text-black max-h-[90%]">
        <h1 className="text-xl dark:text-white">Edit task</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
          <label htmlFor="taskName" className={labelStyle}>
            Task Name
          </label>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            id="taskName"
            className={`${inputStyle} text-sm font-light`}
          />
          <label htmlFor="subtask" className={labelStyle}>
            Description
          </label>
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className={`border rounded-md text-xs ${inputStyle}`}
          />
          <label className={labelStyle}>Subtasks</label>
          <div>
            {editedTask.subtasks.map((subtask, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={subtask.title}
                  className="border rounded-md p-2 px-3 w-[95%] text-sm font-light dark:bg-slate-800 dark:text-white dark:border-gray-700"
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
            style="w-full py-[0.625rem] text-white mb-4 dark:bg-slate-100 dark:text-violet-500"
            handleClick={() =>
              setEditedTask((prevTask) => ({
                ...prevTask,
                subtasks: [
                  ...prevTask.subtasks,
                  { title: "", isCompleted: false },
                ],
              }))
            }
          >
            + Add New Subtask
          </Button>
          <label className={labelStyle}>Current Status</label>
          <select
            className="mb-3 border-2 font-light text-sm p-3 rounded-md dark:bg-slate-800 dark:text-white dark:border-gray-700"
            onChange={(e) =>
              setEditedTask({ ...editedTask, status: e.target.value })
            }
            value={editedTask.status}
          >
            {columnData.map((column) => (
              <option key={crypto.randomUUID()} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <Button style="py-2 w-full text-white" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditTask;
