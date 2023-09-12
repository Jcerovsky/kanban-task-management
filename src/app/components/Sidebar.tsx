"use client";

import React, { useContext, useState } from "react";
import { Context } from "@/app/context/Context";

function Sidebar() {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState();

  const { theme, setTheme } = useContext(Context)!;

  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 fixed top-[85px] bottom-0 left-0 text-slate-400 w-3/12">
      <p className="mt-5 p-4 text-sm tracking-widest">ALL BOARDS (3)</p>

      <div className="flex flex-col ">
        <div className="flex gap-2 items-center p-4 mr-4 rounded-r-full cursor-pointer hover:text-violet-500 hover:bg-violet-100 ">
          <img src="../../../assets/icon-board.svg" alt="" />
          <p>Roadmap</p>
        </div>
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
