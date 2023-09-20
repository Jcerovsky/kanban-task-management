import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-200">
      <div className="flex items-center">
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        <h1 className="text-3xl">Loading...</h1>
      </div>
    </div>
  );
}

export default Loading;
