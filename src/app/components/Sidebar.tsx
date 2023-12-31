"use client";

import React, { useContext, useEffect } from "react";
import { Context } from "@/app/context/Context";
import AddNewBoard from "@/app/Modals/AddNewBoard";
import { boxShadow } from "@/app/utils/tailwindStyles";
import { useObjectState } from "@/app/hooks/useObjectState";

interface ISidebarProps {
  isToggled: boolean;
  boardList: string[];
  isCreateBoardModalOpen: boolean;
}

function Sidebar() {
  const {
    theme,
    data,
    currentBoard,
    isSidebarHidden,
    isModalOpen,
    updateState: updateStateFromContext,
  } = useContext(Context)!;

  const [state, updateState] = useObjectState<ISidebarProps>({
    isToggled: theme === "light",
    boardList: [],
    isCreateBoardModalOpen: false,
  });

  useEffect(() => {
    if (data.length > 0) {
      updateState({ boardList: data.map((board) => board.name) });
    }
  }, [data]);

  const handleBoardClick = (index: number) => {
    updateStateFromContext({ currentBoard: state.boardList[index] });
  };

  return (
    <>
      <div className={` md:flex ${!isSidebarHidden ? "block" : "hidden"} `}>
        <div
          className={`bg-white sidebar flex flex-col gap-2 md:gap-0 right-0 m-auto w-[80%] rounded-md md:right-auto md:w-[15.625rem] 
          bg-white dark:bg-slate-700 fixed md:top-[4.375rem] md:bottom-0 top-[6.25rem] left-0 text-slate-400 font-semibold  
        transform-gpu transition-all duration-300 ease-in-out ${boxShadow} md:shadow-none dark:shadow-[0_10px_20px_rgba(54,78,126,.25)] ${
          isModalOpen ? "-z-10" : ""
        } ${isSidebarHidden ? "md:-translate-x-full" : "translate-x-0"}`}
        >
          <p className="mt-5 p-4 text-xs tracking-widest">
            ALL BOARDS ({state.boardList?.length})
          </p>

          <div className="flex flex-col mb-2 md:mb-0 ">
            {state.boardList?.map((board, index) => (
              <div
                key={board}
                className={`flex gap-2 items-center p-3 mr-4 rounded-r-full cursor-pointer 
              hover:bg-violet-100 hover:text-violet-500 transition-all duration-300 ease-in-out ${
                board === currentBoard
                  ? "text-white bg-violet-500 hover:text-violet-500 duration-300"
                  : ""
              }`}
                onClick={() => handleBoardClick(index)}
              >
                <img src="../../../assets/icon-board.svg" alt="" />
                <p className="">{board}</p>
              </div>
            ))}
            <div
              className="flex gap-2 items-center p-3 mr-4 rounded-r-full cursor-pointer
              hover:bg-violet-100 text-violet-500 transition-all duration-300 ease-in-out"
              onClick={() => updateState({ isCreateBoardModalOpen: true })}
            >
              <img src="../../../assets/icon-board.svg" alt="" />
              <p>+ Create New Board</p>
            </div>
          </div>

          <div
            className="flex mt-auto items-center gap-2 justify-around bg-sky-50 dark:bg-slate-900 py-3 px-4 m-5
        rounded-md transition-all duration-300 ease-in-out mb-2"
          >
            <img src="../../../assets/icon-light-theme.svg" alt="sun icon" />

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer outline-none"
                checked={state.isToggled}
                onChange={() => updateState({ isToggled: !state.isToggled })}
              />
              <div
                className="w-11 h-6 rounded-full hover:bg-violet-500 peer-checked:after:translate-x-full
          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[0.125rem] after:bg-white
          after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-400 ease-in-out bg-violet-600 outline-none"
                onClick={() =>
                  updateStateFromContext({
                    theme: theme === "light" ? "dark" : "light",
                  })
                }
              ></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
            </label>

            <img
              src="../../../assets/icon-dark-theme.svg"
              alt="moon in a crescent icon"
            />
          </div>
          {!isSidebarHidden && (
            <div
              className="
              flex gap-2 justify-center items-center p-3 mr-4 rounded-r-full cursor-pointer hover:text-violet-500
                hover:bg-violet-100 hover:text-violet-500 transition-all duration-300 ease-in-out"
            >
              <img
                src="../../../assets/icon-hide-sidebar.svg"
                alt="crossed eye"
              />
              <p
                onClick={() =>
                  updateStateFromContext({ isSidebarHidden: true })
                }
              >
                Hide Sidebar
              </p>
            </div>
          )}
        </div>
        {isSidebarHidden && (
          <div
            className="absolute flex justify-center bottom-10 items-center p-5  rounded-r-full cursor-pointer
          hover:bg-violet-400 bg-violet-500 w-14 hover:w-24 transition-all duration-300	 ease-in-out shadow-lg"
            onClick={() => updateStateFromContext({ isSidebarHidden: false })}
          >
            <img
              src="../../../assets/icon-show-sidebar.svg"
              alt="opened eye"
              className="w-5"
            />
          </div>
        )}
      </div>
      <AddNewBoard
        onClose={() => updateState({ isCreateBoardModalOpen: false })}
        isOpen={state.isCreateBoardModalOpen}
      />
    </>
  );
}

export default Sidebar;
