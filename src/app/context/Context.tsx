"use client";

import React, { createContext, useEffect, useState } from "react";

export const Context = createContext<ContextProps | null>(null);

interface ContextProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  data: DataProps[];
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
  currentBoard: string;
  setCurrentBoard: React.Dispatch<React.SetStateAction<string>>;
  isShown: { [elementId: string]: boolean };
  setIsShown: React.Dispatch<React.SetStateAction<ContextProps["isShown"]>>;
}

export interface DataProps {
  name: string;
  isActive: boolean;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      };
    };
  };
}

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );
  const [data, setData] = useState<DataProps[]>([]);
  const [currentBoard, setCurrentBoard] = useState<string>("");
  const [isShown, setIsShown] = useState<ContextProps["isShown"]>({});

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    fetch("http://localhost:3000/api/kanban")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.log(err));
  }, []);

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        data,
        setData,
        currentBoard,
        setCurrentBoard,
        isShown,
        setIsShown,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
