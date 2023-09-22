"use client";

import React from "react";
import { boxShadow } from "@/app/utils/tailwindStyles";

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
        } absolute shadow-2xl right-[4%] top-[3.75rem] w-[9.375rem] font-semibold text-sm bg-stone-50 dark:bg-gray-600 
        rounded-md py-5 p-3 ${boxShadow} dark:shadow-[0_10px_20px_rgba(54,78,126,.25)]`}
      >
        <p
          className="opacity-50 mb-5 text-black dark:text-white hover:text-gray-700 cursor-pointer"
          onClick={() => {
            setIsVisible(false);
            setEditTaskModalVisible(true);
          }}
        >
          Edit task
        </p>
        <p
          className="text-red-500 hover:text-red-600 cursor-pointer"
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
