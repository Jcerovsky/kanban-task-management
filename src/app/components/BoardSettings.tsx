"use client";

import React, { useContext, useState } from "react";
import { Context } from "@/app/context/Context";
import DeleteBoard from "@/app/components/DeleteBoard";

function BoardSettings() {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const { setIsShown, isShown } = useContext(Context)!;

  return (
    <>
      <div className="cursor-pointer">
        <img
          src="../../../assets/icon-vertical-ellipsis.svg"
          alt="three dots"
          onClick={() => setIsMenuShown((prevState) => !prevState)}
        />
        <div
          className={`${
            isMenuShown ? "block" : "hidden"
          } absolute shadow-xl right-[4%] top-[95px] w-[150px] bg-white dark:bg-gray-600 rounded-md p-3`}
        >
          <p className="opacity-50 text-black mb-5">Edit board</p>
          <p
            className="text-red-500"
            onClick={() =>
              setIsShown((prevState) => {
                return {
                  "delete-board": !prevState["delete-board"],
                };
              })
            }
          >
            Delete board
          </p>
        </div>
      </div>
      {isShown["delete-board"] && <DeleteBoard />}
    </>
  );
}

export default BoardSettings;
