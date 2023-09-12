"use client";

import React, { useState } from "react";

function BoardSettings() {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  return (
    <div className="cursor-pointer">
      <img
        src="../../../assets/icon-vertical-ellipsis.svg"
        alt="three dots"
        onClick={() => setIsMenuShown((prevState) => !prevState)}
      />
      <div
        className={`${
          isMenuShown ? "block" : "hidden"
        } absolute shadow-xl right-[4%] top-[90%] w-[150px] bg-white rounded-md p-3`}
      >
        <p className="opacity-50 text-black mb-5">Edit board</p>
        <p className="text-red-500">Delete board</p>
      </div>
    </div>
  );
}

export default BoardSettings;
