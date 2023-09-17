import React, { useContext, useState } from "react";
import { ColumnProps, Context } from "@/app/context/Context";
import ViewTask from "@/app/Modals/ViewTask";
import EditTask from "@/app/Modals/EditTask";
import DeleteTask from "@/app/components/DeleteTask";

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

function Task({ taskProp, columnData }: TaskProps) {
  const [deleteTaskModalVisible, setDeleteTaskModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <div
        key={crypto.randomUUID()}
        className="bg-white dark:text-white dark:bg-slate-700 rounded-md shadow-xl p-3 mb-5 font-md cursor-pointer dark:text-white"
        onClick={() => setIsViewTaskModalOpen(true)}
      >
        <p className="font-bold mb-2 hover:text-violet-500">{taskProp.title}</p>
        <p className="text-slate-500 text-xs">
          {
            taskProp.subtasks.filter(
              (subtask: SubtaskProps) => subtask.isCompleted,
            ).length
          }{" "}
          of {taskProp.subtasks.length}
        </p>
      </div>
      {isViewTaskModalOpen && (
        <ViewTask
          taskProp={taskProp}
          onClose={() => setIsViewTaskModalOpen(false)}
          isOpen={isViewTaskModalOpen}
          columnData={columnData}
          setDeleteTaskModalVisible={setDeleteTaskModalVisible}
          setEditTaskModalVisible={setEditTaskModalVisible}
        />
      )}
      {editTaskModalVisible && (
        <EditTask taskProp={taskProp} columnData={columnData} />
      )}
      {deleteTaskModalVisible && <DeleteTask currentTask={taskProp.title} />}
    </>
  );
}

export default Task;
