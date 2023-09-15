import React, { useContext } from "react";
import { Context } from "@/app/context/Context";

function Columns() {
  const { data } = useContext(Context)!;
  return <div className="flex bg-red-500 h-screen">test</div>;
}

export default Columns;
