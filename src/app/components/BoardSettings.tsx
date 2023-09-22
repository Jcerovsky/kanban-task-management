"use client";

import React, { useContext } from "react";
import { Context } from "@/app/context/Context";
import DeleteBoard from "@/app/Modals/DeleteBoard";
import EditBoard from "@/app/Modals/EditBoard";
import { boxShadow } from "@/app/utils/tailwindStyles";
import { useObjectState } from "@/app/hooks/useObjectState";

interface IBoardProps {
  isMenuShown: boolean;
  isEditBoardModalOpen: boolean;
  isDeleteBoardModalOpen: boolean;
}

function BoardSettings() {
  const [state, updateState] = useObjectState<IBoardProps>({
    isMenuShown: false,
    isEditBoardModalOpen: false,
    isDeleteBoardModalOpen: false,
  });

  const { setIsModalOpen } = useContext(Context)!;

  return (
    <>
      <div className=" cursor-pointer">
        <img
          src="../../../assets/icon-vertical-ellipsis.svg"
          alt="three dots"
          onClick={() => updateState({ isMenuShown: !state.isMenuShown })}
        />
        <div
          className={`${
            state.isMenuShown ? "block" : "hidden"
          } absolute text-sm shadow-xl right-[3%] top-[5rem] w-[9.375rem] bg-stone-50 dark:bg-slate-900 dark:ring-white 
          rounded-md py-5 p-3 ${boxShadow} dark:shadow-[0_10px_20px_rgba(54,78,126,.25)]`}
        >
          <p
            className="opacity-50 mb-5 text-black dark:text-white hover:text-gray-700"
            onClick={() => {
              updateState({ isEditBoardModalOpen: true, isMenuShown: false });
              setIsModalOpen(true);
            }}
          >
            Edit board
          </p>
          <p
            className="text-red-500 hover:text-red-600"
            onClick={() => {
              updateState({ isDeleteBoardModalOpen: true, isMenuShown: false });
              setIsModalOpen(true);
            }}
          >
            Delete board
          </p>
        </div>
      </div>
      <DeleteBoard
        isOpen={state.isDeleteBoardModalOpen}
        onClose={() => {
          updateState({ isDeleteBoardModalOpen: false });
          setIsModalOpen(false);
        }}
      />
      <EditBoard
        isOpen={state.isEditBoardModalOpen}
        onClose={() => {
          updateState({ isEditBoardModalOpen: false });
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

export default BoardSettings;
