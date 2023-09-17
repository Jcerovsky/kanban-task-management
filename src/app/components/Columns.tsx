import React, { useContext, useEffect, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import Task from "@/app/components/Task";
import EditBoard from "@/app/Modals/EditBoard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceColumnIndex = columnData.findIndex(
      (column) => column.name === result.source.droppableId,
    );
    const destinationColumnIndex = columnData.findIndex(
      (column) => column.name === result.destination.droppableId,
    );

    const sourceColumn = columnData[sourceColumnIndex];
    const destinationColumn = columnData[destinationColumnIndex];

    const movedTask = sourceColumn.tasks[result.source.index];

    sourceColumn.tasks.splice(result.source.index, 1);

    destinationColumn.tasks.splice(result.destination.index, 0, movedTask);

    const updatedColumnData = [...columnData];

    updatedColumnData[sourceColumnIndex] = sourceColumn;
    updatedColumnData[destinationColumnIndex] = destinationColumn;

    setColumnData(updatedColumnData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`flex h-screen bg-neutral-200 ${
          !isSidebarHidden ? "md:ml-[250px]" : ""
        }  overflow-x-scroll dark:bg-slate-800`}
      >
        <div className="flex ">
          {columnData.map((column, columnIndex) => (
            <Droppable droppableId={column.name} key={column.name}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-w-[280px] p-3"
                >
                  <p className="text-slate-500 text-sm mb-5">
                    {column.name} ({column.tasks.length})
                  </p>
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.title}
                      draggableId={task.title}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task taskProp={task} columnData={columnData} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
    </DragDropContext>
  );
}

export default Columns;
