"use client";

import React from "react";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskSettings({
  isVisible,
  setIsVisible,
  setDeleteTaskModalVisible,
  setEditTaskModalVisible,
}: Props) {
  return (
    <>
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } task-settings absolute shadow-xl right-[4%] top-[60px] w-[150px] bg-white dark:bg-gray-600 rounded-md p-3`}
      >
        <p
          className="opacity-50 text-black mb-5 cursor-pointer"
          onClick={() => {
            setIsVisible(false);
            setEditTaskModalVisible(true);
          }}
        >
          Edit task
        </p>
        <p
          className="text-red-500 cursor-pointer"
          onClick={() => {
            setIsVisible(false);
            setDeleteTaskModalVisible(true);
          }}
        >
          Delete task
        </p>
      </div>
    </>
  );
}

export default TaskSettings;
