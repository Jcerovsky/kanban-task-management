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
          } absolute shadow-xl right-[4%] top-[95px] w-[150px] bg-white dark:bg-gray-600 rounded-md p-3`}
        >
          <p
            className="opacity-50 text-black mb-5"
            onClick={() => {
              setIsEditBoardModalOpen(true);
              setIsMenuShown(false);
              setIsModalOpen(true);
            }}
          >
            Edit board
          </p>
          <p
            className="text-red-500"
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
