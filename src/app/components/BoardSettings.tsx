"use client";

import React, { useContext, useState } from "react";
import { Context } from "@/app/context/Context";
import DeleteBoard from "@/app/Modals/DeleteBoard";
import EditBoard from "@/app/Modals/EditBoard";

function BoardSettings() {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] =
    useState<boolean>(false);

  const { setIsModalOpen } = useContext(Context)!;

  return (
    <>
      <div className=" cursor-pointer">
        <img
          src="../../../assets/icon-vertical-ellipsis.svg"
          alt="three dots"
          onClick={() => {
            setIsMenuShown((prevState) => !prevState);
          }}
        />
        <div
          className={`${
            isMenuShown ? "block" : "hidden"
          } absolute text-sm shadow-xl right-[3%] top-[5rem] w-[9.375rem] bg-stone-50 dark:bg-slate-900 dark:ring-white 
          rounded-md py-5 p-3 dark:shadow-[0_10px_20px_rgba(54,78,126,.25)]`}
        >
          <p
            className="opacity-50 mb-5 text-black dark:text-white hover:text-gray-700"
            onClick={() => {
              setIsEditBoardModalOpen(true);
              setIsMenuShown(false);
              setIsModalOpen(true);
            }}
          >
            Edit board
          </p>
          <p
            className="text-red-500 hover:text-red-600"
            onClick={() => {
              setIsDeleteBoardModalOpen(true);
              setIsModalOpen(true);
              setIsMenuShown(false);
            }}
          >
            Delete board
          </p>
        </div>
      </div>
      <DeleteBoard
        isOpen={isDeleteBoardModalOpen}
        onClose={() => {
          setIsDeleteBoardModalOpen(false);
          setIsModalOpen(false);
        }}
      />
      <EditBoard
        isOpen={isEditBoardModalOpen}
        onClose={() => {
          setIsEditBoardModalOpen(false);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

export default BoardSettings;
