import React, { useState } from "react";
import AddNewBoard from "@/app/Modals/AddNewBoard";

function EmptyBoard() {
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <div className="absolute bg-slate-100 dark:bg-slate-800 flex flex-col dark:text-white h-screen w-screen z-50 justify-center">
        <div className="text-center">
          <h1 className="text-slate-500 font-bold mb-2">
            You have no boards and tasks to do
          </h1>
          <h2 className="text-slate-500 font-bold mb-5">
            Create a board to get started
          </h2>
          <p
            className="text-violet-500 hover:violet-400 cursor-pointer"
            onClick={() => setIsCreateBoardModalOpen(true)}
          >
            +Add New Board
          </p>
        </div>
      </div>
      <AddNewBoard
        onClose={() => setIsCreateBoardModalOpen(false)}
        isOpen={isCreateBoardModalOpen}
      />
    </>
  );
}

export default EmptyBoard;
