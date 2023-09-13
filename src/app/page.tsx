"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { handleClickOutside } from "@/app/utils/handleClickOutside";
import { useContext } from "react";
import { Context } from "@/app/context/Context";

export default function Home() {
  const { isShown, setIsShown } = useContext(Context)!;

  // const hideShownDiv = (e: MouseEvent<Element, MouseEvent>) => {
  //   if (isShown) {
  //     handleClickOutside(e, ".add-new-board", setIsShown);
  //   }
  // };

  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}
