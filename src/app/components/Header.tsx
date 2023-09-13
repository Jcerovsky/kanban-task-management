"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import BoardSettings from "@/app/components/BoardSettings";
import { Context } from "@/app/context/Context";

function Header() {
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);

  const { currentBoard, setCurrentBoard, data, theme } = useContext(Context)!;

  useEffect(() => {
    if (data.length > 0) {
      setCurrentBoard(data[0].name);
    }
  }, [data]);

  const handleAddTaskClick = () => {
    setIsBtnClicked(true);
  };

  return (
    <header className="flex items-center p-5 py-6 bg-white dark:bg-gray-800	gap-4 relative">
      <img
        src={`../../../assets/logo-${theme === "dark" ? "dark" : "light"}.svg`}
        alt="kanban logo"
        className=""
      />
      <p className="text-2xl font-bold self-center ml-20">{currentBoard}</p>
      <Button style={"py-2 px-4 text-white "} handleClick={handleAddTaskClick}>
        + Add New Task
      </Button>
      <BoardSettings />
    </header>
  );
}

export default Header;
