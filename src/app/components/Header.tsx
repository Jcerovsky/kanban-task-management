"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import BoardSettings from "@/app/components/BoardSettings";

function Header() {
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);

  const handleAddTaskClick = () => {
    setIsBtnClicked(true);
  };

  return (
    <header className="flex items-center p-5 py-6 bg-white dark:bg-gray-800	gap-4 relative">
      <img src={`../../../assets/logo-dark.svg`} alt="kanban logo" />
      <p className="text-2xl font-bold self-center ml-10">[Big Law Case]</p>
      <Button style={"py-2 px-4 text-white "} handleClick={handleAddTaskClick}>
        + Add New Task
      </Button>
      <BoardSettings />
    </header>
  );
}

export default Header;
