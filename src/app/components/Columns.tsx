"use client";

import React, { useContext, useEffect, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import Task from "@/app/components/Task";

function Columns() {
  const { data, currentBoard } = useContext(Context)!;
  const [columnData, setColumnData] = useState<ColumnProps[]>([]);

  // useEffect(() => {
  //   if (currentBoard) {
  //     const cols = data.flatMap((item) => item.columns);
  //     setColumnData(cols);
  //   }
  // }, [currentBoard]);

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
    <div className="flex h-screen bg-neutral-200 md:ml-[250px] overflow-x-scroll 	 ">
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
        <div className="min-w-[250px] self-center">Add new column</div>
      </div>
    </div>
  );
}

///adjust columns width based on sidebar width - correct approach to allow sticky sidebar

export default Columns;
