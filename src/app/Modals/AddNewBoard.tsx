import React, { useContext, useState } from "react";
import Button from "@/app/components/Button";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import Modal, { ModalProps } from "@/app/Modals/Modal";
import { Context } from "@/app/context/Context";

function AddNewBoard({ isOpen, onClose }: ModalProps) {
  const [columns, setColumns] = useState<string[]>(["Todo", "Doing"]);
  const [boardName, setBoardName] = useState<string>("");
  const { data, setData } = useContext(Context)!;

  const transformedColumns = columns.map((columnName) => ({
    name: columnName,
    tasks: [],
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBoardData = {
      name: boardName,
      isActive: true,
      columns: transformedColumns,
    };
    setData([...data, newBoardData]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="  flex flex-col gap-6 text-black bg-white dark:bg-slate-800 p-3 py-6
    rounded-md font-semibold text-sm"
      >
        <h1 className=" text-xl dark:text-white">Add new board</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 "
        >
          <label htmlFor="taskName" className={labelStyle}>
            Board Name
          </label>
          <input
            type="text"
            placeholder="e.g. Write Report"
            id="taskName"
            required={true}
            pattern=".{3,}"
            title="Please enter at least three characters"
            className={`${inputStyle} text-sm font-light text-black border invalid:ring-2 invalid:ring-red-200 
            invalid:border-red-500 dark:border-slate-700`}
            onChange={(e) => setBoardName(e.target.value)}
          />

          <label htmlFor="subtask" className={labelStyle}>
            Board Columns
          </label>
          <div className="flex flex-col ">
            {columns.map((column, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={column}
                  required={true}
                  pattern=".{3,}"
                  title="Please enter at least three characters"
                  className="border rounded-md py-2 px-4 w-[95%] text-sm font-light text-black border invalid:ring-2
                  invalid:ring-red-300 invalid:border-red-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  onChange={(e) =>
                    setColumns(updateColumn(columns, e.target.value, index))
                  }
                />
                <span
                  className="ml-auto self-center text-slate-600 text-xl font-bold"
                  onClick={() => setColumns(deleteColumn(columns, index))}
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
            handleClick={() => setColumns(addColumn(columns))}
          >
            + Add New Column
          </Button>
          <Button
            style={"w-full py-[0.625rem] text-white mt-5 "}
            type={"submit"}
          >
            Create New Board
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AddNewBoard;
