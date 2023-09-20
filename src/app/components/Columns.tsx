import React, { useContext, useEffect, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import Task from "@/app/components/Task";
import EditBoard from "@/app/Modals/EditBoard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { boxShadow } from "@/app/utils/inputStyle";
import EmptyBoard from "@/app/components/EmptyBoard";

function Columns() {
  const { data, currentBoard, isSidebarHidden } = useContext(Context)!;
  const [columnData, setColumnData] = useState<ColumnProps[]>([]);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);
  const [areColumnsLoading, setAreColumnsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentBoard && data.length > 0) {
      const currentBoardData = data.filter(
        (board) => board.name.toLowerCase() === currentBoard.toLowerCase(),
      );
      const columns = currentBoardData[0]?.columns.map((column) => column);
      setColumnData(columns);
      setAreColumnsLoading(false);
    }
  }, [currentBoard, data]);

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

    movedTask.status = destinationColumn.name;

    sourceColumn.tasks.splice(result.source.index, 1);

    destinationColumn.tasks.splice(result.destination.index, 0, movedTask);

    const updatedColumnData = [...columnData];

    updatedColumnData[sourceColumnIndex] = sourceColumn;
    updatedColumnData[destinationColumnIndex] = destinationColumn;

    setColumnData(updatedColumnData);
  };

  if (data.length === 0 && !areColumnsLoading) {
    return <EmptyBoard />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`flex h-screen bg-blue-50 mb-10 scroll-smooth ${
          !isSidebarHidden ? "md:ml-[15.625rem]" : ""
        }  overflow-x-scroll dark:bg-slate-800`}
      >
        <div className="flex ">
          {columnData?.map((column, columnIndex) => (
            <Droppable droppableId={column.name} key={column.name}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-w-[17.5rem] p-3"
                >
                  <p className="text-gray-500 font-bold text-xs tracking-widest mb-5">
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
          {!areColumnsLoading && (
            <div
              className={`flex min-w-[15.625rem] self-center justify-center text-2xl font-bold hover:text-violet-500 
            bg-stone-50 dark:bg-slate-700 cursor-pointer h-full mt-[8%] rounded-md mr-8 ml-3 dark:text-slate-300 
            text-slate-500 hover:text-violet-500 ${boxShadow}`}
              onClick={() => setIsEditBoardModalOpen(true)}
            >
              <p className="self-center ">+ New Column</p>
            </div>
          )}
        </div>
        <EditBoard
          onClose={() => setIsEditBoardModalOpen(false)}
          isOpen={isEditBoardModalOpen}
        />
      </div>
    </DragDropContext>
  );
}

export default Columns;
