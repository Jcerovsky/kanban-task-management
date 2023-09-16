import React from "react";

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
}

function Task({ taskProp }: TaskProps) {
  return (
    <div
      key={crypto.randomUUID()}
      className="bg-white dark:text-white dark:bg-slate-700 rounded-md shadow-xl p-3 mb-5 font-md cursor-pointer dark:text-white"
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
  );
}

export default Task;
