"use client";

import React, { useContext, useEffect, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import Task from "@/app/components/Task";
import EditBoard from "@/app/components/EditBoard";

function Columns() {
  const { data, currentBoard, isSidebarHidden, isShown, setIsShown } =
    useContext(Context)!;
  const [columnData, setColumnData] = useState<ColumnProps[]>([]);

  useEffect(() => {
    if (currentBoard) {
      const currentBoardData = data.filter(
        (board) => board.name.toLowerCase() === currentBoard.toLowerCase(),
      );
      const columns = currentBoardData[0].columns.map((column) => column);
      setColumnData(columns);
    }
  }, [currentBoard]);

  return (
    <div
      className={`flex h-screen bg-neutral-200 ${
        !isSidebarHidden ? "md:ml-[250px]" : ""
      }  overflow-x-scroll dark:bg-slate-800`}
    >
      <div className="flex ">
        {columnData.map((column) => (
          <div key={crypto.randomUUID()} className="min-w-[280px] p-3  ">
            <p className="text-slate-500 text-sm mb-5">
              {column.name} ({column.tasks.length})
            </p>
            {column.tasks.map((task) => (
              <Task taskProp={task} key={crypto.randomUUID()} />
            ))}
          </div>
        ))}
        <div
          className="flex min-w-[250px] self-center justify-center text-2xl font-bold hover:text-violet-500 bg-white
        dark:bg-slate-700 cursor-pointer py-[20%] rounded-md mr-8 ml-3 "
          onClick={() =>
            setIsShown((prevState) => {
              return { "edit-board": !prevState["edit-board"] };
            })
          }
        >
          <p className="self-center text-slate-500 hover:text-violet-500">
            + New Column
          </p>
        </div>
      </div>
      {isShown["edit-board"] && <EditBoard />}
    </div>
  );
}

export default Columns;
