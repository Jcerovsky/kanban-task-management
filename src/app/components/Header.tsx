"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import BoardSettings from "@/app/components/BoardSettings";
import { Context } from "@/app/context/Context";
import AddTaskForm from "@/app/Modals/AddTaskForm";
import Sidebar from "@/app/components/Sidebar";

function Header() {
  const { currentBoard, theme } = useContext(Context)!;

  const [smallerScreen, setSmallerScreen] = useState(window.innerWidth <= 767);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setSmallerScreen(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <header className="sticky top-0 flex items-center p-4 bg-white dark:bg-gray-800	gap-4 relative">
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
        <p className="text-2xl font-bold self-center md:ml-20 ">
          {currentBoard}
        </p>
        <img
          src={`../../../assets/icon-chevron-${
            isSidebarVisible ? "up" : "down"
          }.svg`}
          alt="arrow down"
          className="md:hidden mr-auto cursor-pointer"
          onClick={() => setIsSidebarVisible((prevState) => !prevState)}
        />
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

        {isSidebarVisible && <Sidebar isSidebarVisible={isSidebarVisible} />}
      </header>
      <AddTaskForm
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </>
  );
}

export default Header;
