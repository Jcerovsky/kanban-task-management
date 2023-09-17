"use client";

import React, { useContext } from "react";
import { Context } from "@/app/context/Context";
import DeleteBoard from "@/app/components/DeleteBoard";
import EditTask from "@/app/components/EditTask";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskSettings({ isVisible, setIsVisible }: Props) {
  const { isShown, setIsShown } = useContext(Context)!;

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
            setIsShown((prevState) => {
              return {
                "edit-task": !prevState["edit-task"],
              };
            });
            setIsVisible(false);
          }}
        >
          Edit task
        </p>
        <p
          className="text-red-500 cursor-pointer"
          onClick={() => {
            setIsShown((prevState) => {
              return {
                "delete-task": !prevState["delete-task"],
              };
            });
            setIsVisible(false);
          }}
        >
          Delete task
        </p>
      </div>
      {isShown["delete-task"] && <DeleteBoard />}
    </>
  );
}

export default TaskSettings;
