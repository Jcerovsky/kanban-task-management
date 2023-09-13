"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { handleClickOutside } from "@/app/utils/handleClickOutside";
import { useContext } from "react";
import { Context } from "@/app/context/Context";

export default function Home() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}
