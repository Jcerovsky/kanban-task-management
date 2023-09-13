"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context, DataProps } from "@/app/context/Context";

function Sidebar() {
  const { theme, setTheme } = useContext(Context)!;
  const [isToggled, setIsToggled] = useState<boolean>(theme === "light");
  const [selectedBoard, setSelectedBoard] = useState();
  const [boardList, setBoardList] = useState<string[]>([]);

  const { data } = useContext(Context)!;

  useEffect(() => {
    if (data.length > 0) {
      setBoardList(data.map((board: DataProps) => board.name));
    }
  }, [boardList]);

  console.log(boardList);

  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 fixed top-[85px] bottom-0 left-0 text-slate-400 w-3/12">
      <p className="mt-5 p-4 text-sm tracking-widest">
        ALL BOARDS ({boardList.length})
      </p>

      <div className="flex flex-col ">
        {boardList.map((board) => (
          <div
            key={crypto.randomUUID()}
            className="flex gap-2 items-center p-4 mr-4 rounded-r-full cursor-pointer hover:text-violet-500 hover:bg-violet-100 "
          >
            <img src="../../../assets/icon-board.svg" alt="" />
            <p>{board}</p>
          </div>
        ))}
        <div className="flex gap-2 items-center p-4 text-violet-500">
          <img src="../../../assets/icon-board.svg" alt="" />
          <p>+ Create New Board</p>
        </div>
      </div>

      <div className="flex mt-auto items-center gap-2 justify-around bg-neutral-200 dark:bg-black py-3 px-4 m-5 rounded-md">
        <img src="../../../assets/icon-light-theme.svg" alt="sun icon" />

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer outline-none"
            checked={isToggled}
            onChange={() => setIsToggled((prevState) => !prevState)}
          />
          <div
            className="w-11 h-6 rounded-full peer-checked:after:translate-x-full
          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
          after:border after:rounded-full after:h-5 after:w-5 after:transition-all bg-violet-600 outline-none"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          ></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
        </label>

        <img
          src="../../../assets/icon-dark-theme.svg"
          alt="moon in a crescent icon"
        />
      </div>
    </div>
  );
}

export default Sidebar;
