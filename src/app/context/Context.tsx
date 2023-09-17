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
  isShown: { [elementClass: string]: boolean };
  setIsShown: React.Dispatch<React.SetStateAction<ContextProps["isShown"]>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ColumnProps {
  name: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}

export interface DataProps {
  name: string;
  isActive: boolean;
  columns: ColumnProps[];
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
  const [columns, setColumns] = useState<string[]>([]);
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (data.length > 0) {
      setCurrentBoard(data[0].name);
    }
  }, [data]);

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
        columns,
        setColumns,
        isSidebarHidden,
        setIsSidebarHidden,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
