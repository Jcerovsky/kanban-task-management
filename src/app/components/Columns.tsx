"use client";

import React, { useContext, useEffect, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import Task from "@/app/components/Task";

function Columns() {
  const { data, currentBoard, isSidebarHidden } = useContext(Context)!;
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
          <div key={crypto.randomUUID()} className="min-w-[280px] p-5  ">
            <p className="text-slate-500 text-sm mb-5">
              {column.name} ({column.tasks.length})
            </p>
            {column.tasks.map((task) => (
              <Task taskProp={task} key={crypto.randomUUID()} />
            ))}
          </div>
        ))}
        <div
          className="flex min-w-[250px] self-center justify-center text-2xl font-bold hover:text-violet-500 bg-neutral-200
        dark:bg-slate-700 cursor-pointer py-[20%] rounded-md "
        >
          <p className="self-center">+ New Column</p>
        </div>
      </div>
    </div>
  );
}

export default Columns;
