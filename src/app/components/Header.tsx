"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import BoardSettings from "@/app/components/BoardSettings";
import { Context } from "@/app/context/Context";
import AddTaskForm from "@/app/components/AddTaskForm";
import Sidebar from "@/app/components/Sidebar";

function Header() {
  const { currentBoard, setCurrentBoard, data, theme, isShown, setIsShown } =
    useContext(Context)!;

  const [smallerScreen, setSmallerScreen] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setSmallerScreen(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (data.length > 0) {
      setCurrentBoard(data[0].name);
    }
  }, [data]);

  return (
    <header className="flex items-center p-4 bg-white dark:bg-gray-800	gap-4 relative">
      <img
        src={`../../../assets/logo-${theme === "dark" ? "dark" : "light"}.svg`}
        alt="kanban logo"
        className="hidden md:block"
      />
      <img
        src="../../../assets/logo-mobile.svg"
        alt="kanban logo three stripes"
        className="md:hidden"
      />
      <p className="text-2xl font-bold self-center md:ml-20 ">{currentBoard}</p>
      <img
        src={`../../../assets/icon-chevron-${
          isShown["sidebar"] ? "up" : "down"
        }.svg`}
        alt="arrow down"
        className="md:hidden mr-auto cursor-pointer"
        onClick={() =>
          setIsShown((prevState) => {
            return {
              sidebar: !prevState["sidebar"],
            };
          })
        }
      />
      <Button
        style={"py-2 px-4 text-white "}
        handleClick={() =>
          setIsShown((prevState) => {
            return {
              "new-form": !prevState["new-form"],
            };
          })
        }
      >
        {smallerScreen ? (
          <img src="../../../assets/icon-add-task-mobile.svg" />
        ) : (
          "+ Add New Task"
        )}
      </Button>
      <BoardSettings />
      {isShown["new-form"] && <AddTaskForm />}
      {isShown["sidebar"] && <Sidebar />}
    </header>
  );
}

export default Header;
