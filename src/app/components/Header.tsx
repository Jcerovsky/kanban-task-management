"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import BoardSettings from "@/app/components/BoardSettings";
import { Context } from "@/app/context/Context";
import AddTaskForm from "@/app/Modals/AddTaskForm";
import Sidebar from "@/app/components/Sidebar";

function Header() {
  const { currentBoard, theme, isSidebarHidden, setIsSidebarHidden, data } =
    useContext(Context)!;

  const [smallerScreen, setSmallerScreen] = useState(window.innerWidth <= 767);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setSmallerScreen(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (smallerScreen) {
      setIsSidebarHidden(true);
    }
  }, [currentBoard]);

  return (
    <>
      <header className="sticky top-0 flex items-center p-4 bg-white dark:bg-slate-700	gap-4 relative">
        <img
          src={`../../../assets/logo-${
            theme === "dark" ? "dark" : "light"
          }.svg`}
          alt="kanban logo"
          className="hidden md:block"
        />
        <img
          src="../../../assets/logo-mobile.svg"
          alt="kanban logo three stripes"
          className="md:hidden"
        />
        <p className="text-xl font-semibold self-center md:ml-20 ">
          {currentBoard}
        </p>
        <img
          src={`../../../assets/icon-chevron-${
            !isSidebarHidden ? "up" : "down"
          }.svg`}
          alt="arrow down"
          className="md:hidden mr-auto cursor-pointer"
          onClick={() => setIsSidebarHidden((prevState) => !prevState)}
        />
        {data.length !== 0 && (
          <>
            {" "}
            <Button
              style={"py-2 px-4 text-white "}
              handleClick={() => setIsAddTaskModalOpen(true)}
            >
              {smallerScreen ? (
                <img src="../../../assets/icon-add-task-mobile.svg" />
              ) : (
                "+ Add New Task"
              )}
            </Button>
            <BoardSettings />
          </>
        )}

        {!isSidebarHidden && <Sidebar />}
      </header>
      <AddTaskForm
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </>
  );
}

export default Header;
