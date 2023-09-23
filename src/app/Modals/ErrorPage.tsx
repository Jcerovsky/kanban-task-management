"use client";

import React, { useContext } from "react";
import { Context } from "@/app/context/Context";
import { boxShadow } from "@/app/utils/tailwindStyles";

function ErrorPage() {
  const { errorMessage, updateState } = useContext(Context)!;

  if (errorMessage.length === 0) {
    return;
  }
  return (
    <div
      className="absolute inset-0 flex items-center justify-center "
      style={{ zIndex: 9999 }}
    >
      <div
        className={`cursor-pointer p-5 text-center bg-red-400 rounded-md text-slate-500 ${boxShadow}`}
      >
        <h1 className="text-slate 500">Oops! Something went wrong</h1>
        <p className="font-bold text-sm">{errorMessage}</p>
        <button
          onClick={() => updateState({ errorMessage: "" })}
          className="mt-3 px-4 py-2 text-white rounded-full bg-violet-300 hover:bg-violet-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
