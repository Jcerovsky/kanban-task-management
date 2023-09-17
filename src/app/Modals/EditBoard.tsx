"use client";

import Button from "@/app/components/Button";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/Context";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import { ModalProps } from "@/app/Modals/Modal";
import Modal from "@/app/Modals/Modal";

function EditBoard({ isOpen, onClose }: ModalProps) {
  const { currentBoard, columns, setColumns, data } = useContext(Context)!;
  const [editedBoardName, setEditedBoardName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (currentBoard) {
      const currentBoardData = data.filter(
        (board) => board.name.toLowerCase() === currentBoard.toLowerCase(),
      );
      const columns = currentBoardData[0].columns.map((column) => column.name);
      setColumns(columns);
    }
  }, [currentBoard]);

  useEffect(() => {
    setEditedBoardName(currentBoard);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" dark:bg-slate-800 bg-blue-500 flex flex-col gap-6 text-black p-4 ">
        <h1 className=" text-xl">Edit board</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 "
        >
          <label htmlFor="taskName" className={labelStyle}>
            Board Name
          </label>
          <input
            type="text"
            value={editedBoardName}
            onChange={(e) => setEditedBoardName(e.target.value)}
            id="taskName"
            className={` ${inputStyle} `}
          />
          <label htmlFor="subtask" className={labelStyle}>
            Board Columns
          </label>
          <div>
            {columns?.map((subtask, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={subtask}
                  className="border rounded-md p-2 px-3 w-[95%]"
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
        </form>
        <div className="flex flex-col gap-4 ">
          <Button
            style={"w-full py-[10px] text-white "}
            handleClick={() => setColumns(addColumn(columns))}
          >
            + Add New Column
          </Button>
          <Button style={"py-2 w-full text-white"}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditBoard;
