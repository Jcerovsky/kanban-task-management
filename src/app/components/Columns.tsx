import React, { useContext, useEffect } from "react";
import { useObjectState } from "@/app/hooks/useObjectState";
import Task from "@/app/components/Task";
import EmptyBoard from "@/app/components/EmptyBoard";
import EditBoard from "@/app/Modals/EditBoard";
import { ColumnProps, Context } from "@/app/context/Context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { boxShadow } from "@/app/utils/tailwindStyles";
import { setLocalStorage } from "@/app/utils/setLocalStorage";

interface IColumnProps {
  columnData: ColumnProps[];
  isEditBoardModalOpen: boolean;
  areColumnsLoading: boolean;
}

function Columns() {
  const {
    data,
    currentBoard,
    isSidebarHidden,
    updateState: updateStateFromContext,
  } = useContext(Context)!;
  const [state, updateState] = useObjectState<IColumnProps>({
    columnData: [],
    isEditBoardModalOpen: false,
    areColumnsLoading: true,
  });

  useEffect(() => {
    if (currentBoard && data.length > 0) {
      const currentBoardData = data.filter(
        (board) => board.name.toLowerCase() === currentBoard.toLowerCase(),
      );
      const columns = currentBoardData[0]?.columns.map((column) => column);
      updateState({ columnData: columns, areColumnsLoading: false });
    }
  }, [currentBoard, data]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceColumnIndex = state.columnData.findIndex(
      (column) => column.name === result.source.droppableId,
    );
    const destinationColumnIndex = state.columnData.findIndex(
      (column) => column.name === result.destination.droppableId,
    );

    const sourceColumn = state.columnData[sourceColumnIndex];
    const destinationColumn = state.columnData[destinationColumnIndex];
    const movedTask = sourceColumn.tasks[result.source.index];

    movedTask.status = destinationColumn.name;
    sourceColumn.tasks.splice(result.source.index, 1);
    destinationColumn.tasks.splice(result.destination.index, 0, movedTask);

    const updatedColumnData = [...state.columnData];
    updatedColumnData[sourceColumnIndex] = sourceColumn;
    updatedColumnData[destinationColumnIndex] = destinationColumn;

    updateState({ columnData: updatedColumnData });

    const updatedData = data.map((board) => {
      if (board.name === currentBoard) {
        const updatedColumns = board.columns.map((col) => {
          return {
            ...col,
            columns: updatedColumnData,
          };
        });
        return {
          ...board,
          columns: updatedColumns,
        };
      } else {
        return board;
      }
    });

    updateStateFromContext({ data: updatedData });
    setLocalStorage(updatedData);
  };

  if (data.length === 0 && !state.areColumnsLoading) {
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
          {state.columnData.map((column) => (
            <Droppable droppableId={column.name} key={column.name}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-[17.5rem] p-3"
                >
                  <p className="text-gray-500 font-bold text-xs tracking-widest mb-5">
                    {column.name} ({column.tasks.length})
                  </p>
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={`${task.title}-${task.description}`}
                      draggableId={`${task.title}-${task.description}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task taskProp={task} columnData={state.columnData} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          {!state.areColumnsLoading && (
            <div
              className={`flex min-w-[15.625rem] self-center justify-center text-2xl font-bold 
            bg-stone-50 dark:bg-slate-700 cursor-pointer h-full mt-[8%] rounded-md mr-8 ml-3 dark:text-slate-300 
            text-slate-500 dark:hover:text-violet-500 hover:text-violet-500 ${boxShadow}`}
              onClick={() => updateState({ isEditBoardModalOpen: true })}
            >
              <p className="self-center ">+ New Column</p>
            </div>
          )}
        </div>
        <EditBoard
          onClose={() => updateState({ isEditBoardModalOpen: false })}
          isOpen={state.isEditBoardModalOpen}
        />
      </div>
    </DragDropContext>
  );
}

export default Columns;
