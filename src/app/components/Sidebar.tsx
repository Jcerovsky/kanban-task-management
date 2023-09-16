"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context, DataProps } from "@/app/context/Context";
import AddNewBoard from "@/app/components/AddNewBoard";

function Sidebar() {
  const { theme, setTheme } = useContext(Context)!;
  const [isToggled, setIsToggled] = useState<boolean>(theme === "light");
  const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0);
  const [boardList, setBoardList] = useState<string[]>([]);
  const [isSidebarHidden, setIsSideBarHidden] = useState<boolean>(false);
  const { data, setCurrentBoard, isShown, setIsShown } = useContext(Context)!;

  useEffect(() => {
    if (data.length > 0) {
      setBoardList(data.map((board: DataProps) => board.name));
    }
  }, [data]);

  const handleBoardClick = (index: number) => {
    setSelectedBoardIndex(index);
    setCurrentBoard(boardList[index]);
  };

  return (
    <div
      className={` md:flex ${isShown["sidebar"] ? "block" : "hidden"} sticky] `}
    >
      <div
        className={` sidebar flex flex-col right-0 m-auto w-[80%] rounded-md md:right-auto md:w-[250px] bg-white dark:bg-slate-800 fixed 
        md:top-[70px] md:bottom-0 top-[100px] left-0 text-slate-400  
        transform-gpu transition-all duration-300 ease-in-out ${
          isSidebarHidden ? "md:-translate-x-full" : "translate-x-0"
        }`}
      >
        <p className="mt-5 p-4 text-sm tracking-widest">
          ALL BOARDS ({boardList?.length})
        </p>

        <div className="flex flex-col ">
          {boardList?.map((board, index) => (
            <div
              key={board}
              className={`flex gap-2 items-center p-3 mr-4 rounded-r-full cursor-pointer 
              hover:bg-violet-100 hover:text-violet-500 transition-all duration-300 ease-in-out ${
                selectedBoardIndex === index
                  ? "text-white bg-violet-500 hover:text-violet-500 duration-300"
                  : ""
              }`}
              onClick={() => handleBoardClick(index)}
            >
              <img src="../../../assets/icon-board.svg" alt="" />
              <p>{board}</p>
            </div>
          ))}
          <div
            className="flex gap-2 items-center p-3 mr-4 rounded-r-full cursor-pointer
              hover:bg-violet-100 text-violet-500 transition-all duration-300 ease-in-out"
            onClick={() =>
              setIsShown((prevState) => {
                return {
                  "new-board": !prevState["new-board"],
                };
              })
            }
          >
            <img src="../../../assets/icon-board.svg" alt="" />
            <p>+ Create New Board</p>
          </div>
        </div>

        <div
          className="flex mt-auto items-center gap-2 justify-around bg-neutral-200 dark:bg-black py-3 px-4 m-5
        rounded-md transition-all duration-300 ease-in-out"
        >
          <img src="../../../assets/icon-light-theme.svg" alt="sun icon" />

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer outline-none"
              checked={isToggled}
              onChange={() => setIsToggled((prevState) => !prevState)}
            />
            <div
              className="w-11 h-6 rounded-full hover:bg-violet-500 peer-checked:after:translate-x-full
          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
          after:border after:rounded-full after:h-5 after:w-5 after:transition-all transition-all duration-700 ease-in-out bg-violet-600 outline-none"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            ></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
          </label>

          <img
            src="../../../assets/icon-dark-theme.svg"
            alt="moon in a crescent icon"
          />
        </div>
        {!isShown["sidebar"] && (
          <div
            className="flex gap-2 justify-center items-center p-3 mr-4 rounded-r-full cursor-pointer hover:text-violet-500
              hover:bg-violet-100 hover:text-violet-500 transition-all duration-300 ease-in-out"
          >
            <img
              src="../../../assets/icon-hide-sidebar.svg"
              alt="crossed eye"
            />
            <p onClick={() => setIsSideBarHidden(true)}>Hide Sidebar</p>
          </div>
        )}
        {isShown["new-board"] && <AddNewBoard />}
      </div>
      {isSidebarHidden && (
        <div
          className="absolute flex justify-center bottom-10 items-center p-5  rounded-r-full cursor-pointer
          hover:bg-violet-400 bg-violet-500 w-14 hover:w-24 transition-all duration-300	 ease-in-out shadow-lg"
          onClick={() => setIsSideBarHidden(false)}
        >
          <img
            src="../../../assets/icon-show-sidebar.svg"
            alt="opened eye"
            className="w-5"
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
