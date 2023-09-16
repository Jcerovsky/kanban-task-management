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
      className="bg-white rounded-md shadow-xl p-3 mb-5 font-md"
    >
      <p className="font-bold">{taskProp.title}</p>
      <p className="text-slate-500 text-sm">
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
