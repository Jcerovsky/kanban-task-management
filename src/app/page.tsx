"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { useContext, useEffect, useRef } from "react";
import { Context } from "@/app/context/Context";

export default function Home() {
  const { isShown, setIsShown } = useContext(Context)!;

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const parent = e.target.parentElement.classList.contains("new-board");
      console.log(e.target.classList.contains("new-board"));
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !e.target.classList.contains("new-board") &&
        !e.target.classList.contains("new-form")
      ) {
        setIsShown({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Header />
      <Sidebar />
    </div>
  );
}
