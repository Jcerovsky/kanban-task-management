"use client";

import Button from "@/app/components/Button";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/Context";
import { addColumn, deleteColumn, updateColumn } from "@/app/utils/columnUtils";
import { inputStyle, labelStyle } from "@/app/utils/inputStyle";
import { ModalProps } from "@/app/Modals/Modal";
import Modal from "@/app/Modals/Modal";

function EditBoard({ isOpen, onClose }: ModalProps) {
  const { currentBoard, columns, setColumns, data, setData, setCurrentBoard } =
    useContext(Context)!;
  const [editedBoardName, setEditedBoardName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setCurrentBoard(editedBoardName);

    e.preventDefault();

    const updatedColumns = columns.map((col) => {
      const currentBoardData = data.filter(
        (board) => board.name === currentBoard,
      );
      const originalColumn = currentBoardData[0].columns.find(
        (originalCol) => originalCol.name === col,
      );

      if (originalColumn) {
        return {
          ...originalColumn,
        };
      }
      return {
        name: col,
        tasks: [],
      };
    });

    const newBoardData = {
      name: editedBoardName,
      isActive: false,
      columns: updatedColumns,
    };

    setData((prevState) =>
      prevState.map((board) => {
        if (board.name === currentBoard) {
          return { ...board, ...newBoardData };
        } else {
          return board;
        }
      }),
    );
    onClose();
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
  }, [currentBoard]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" dark:bg-slate-800 bg-white w-100 flex flex-col gap-6 text-black dark:text-white p-4 ">
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
            className={` ${inputStyle} text-sm font-light dark:bg-slate-800`}
          />
          <label htmlFor="subtask" className={labelStyle}>
            Board Columns
          </label>
          <div>
            {columns?.map((colName, index) => (
              <div key={crypto.randomUUID()} className="flex mb-2">
                <input
                  type="text"
                  value={colName}
                  required={true}
                  className="border rounded-md p-2 px-3 w-[95%] font-light text-sm dark:bg-slate-800 dark:border-gray-700"
                  onChange={(e) => {
                    setColumns(updateColumn(columns, e.target.value, index));
                  }}
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
          <div className="flex flex-col gap-4 ">
            <Button
              style={
                "w-full py-[0.625rem] text-white text-sm dark:bg-slate-100 dark:text-violet-500"
              }
              handleClick={() => setColumns(addColumn(columns))}
            >
              + Add New Column
            </Button>
            <Button style={"py-2 w-full text-white text-sm"} type={"submit"}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditBoard;
