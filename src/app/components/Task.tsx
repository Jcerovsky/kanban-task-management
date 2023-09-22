import React from "react";
import { ColumnProps } from "@/app/context/Context";
import ViewTask from "@/app/Modals/ViewTask";
import EditTask from "@/app/Modals/EditTask";
import DeleteTask from "@/app/Modals/DeleteTask";
import { boxShadow } from "@/app/utils/tailwindStyles";
import { useObjectState } from "@/app/hooks/useObjectState";

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
}

export interface IModifyTaskProps {
  deleteTaskModalVisible: boolean;
  editTaskModalVisible: boolean;
  isViewTaskModalOpen: boolean;
}

function Task({ taskProp, columnData }: TaskProps) {
  const [state, updateState] = useObjectState<IModifyTaskProps>({
    deleteTaskModalVisible: false,
    editTaskModalVisible: false,
    isViewTaskModalOpen: false,
  });

  const completed =
    taskProp.subtasks.filter((subtask) => subtask.isCompleted).length ===
    taskProp.subtasks.length;

  return (
    <>
      <div
        key={crypto.randomUUID()}
        className={`bg-stone-50 dark:text-white dark:bg-slate-700 rounded-md ${boxShadow} p-4 mb-5 font-md cursor-pointer
            dark:text-white dark:shadow-[0_10px_20px_rgba(54,78,126,.25)] ${
              completed && "bg-green-200"
            }`}
        onClick={() => updateState({ isViewTaskModalOpen: true })}
      >
        <p className="font-semibold mb-2 hover:text-violet-500">
          {taskProp.title}
        </p>
        <p className="text-slate-500 text-xs">
          {
            taskProp.subtasks.filter(
              (subtask: SubtaskProps) => subtask.isCompleted,
            ).length
          }{" "}
          of {taskProp.subtasks.length}
        </p>
      </div>
      <ViewTask
        taskProp={taskProp}
        onClose={() => updateState({ isViewTaskModalOpen: false })}
        isOpen={state.isViewTaskModalOpen}
        columnData={columnData}
        updateState={updateState}
      />
      <EditTask
        taskProp={taskProp}
        columnData={columnData}
        isOpen={state.editTaskModalVisible}
        onClose={() => updateState({ editTaskModalVisible: false })}
      />
      <DeleteTask
        currentTask={taskProp.title}
        onClose={() => updateState({ deleteTaskModalVisible: false })}
        isOpen={state.deleteTaskModalVisible}
      />
    </>
  );
}

export default Task;
