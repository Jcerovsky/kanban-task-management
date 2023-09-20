"use client";

import React, { createContext, useEffect, useState } from "react";

export const Context = createContext<ContextProps | null>(null);

interface ContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  data: DataProps[];
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
  currentBoard: string;
  setCurrentBoard: React.Dispatch<React.SetStateAction<string>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
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
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "dark",
  );
  const [data, setData] = useState<DataProps[]>(
    JSON.parse(localStorage.getItem("data") || "[]"),
  );
  const [currentBoard, setCurrentBoard] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([]);
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("data");

    if (!localStorageData) {
      fetch("http://localhost:3000/api/kanban")
        .then((res) => res.json())
        .then((fetchedData) => {
          setData(fetchedData);
          localStorage.setItem("data", JSON.stringify(fetchedData));
        })
        .catch((err) => setErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0 && !currentBoard)
      if (data.length > 0) {
        setCurrentBoard(data[0].name);
      }
  }, [data, currentBoard]);

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        data,
        setData,
        currentBoard,
        setCurrentBoard,
        columns,
        setColumns,
        isSidebarHidden,
        setIsSidebarHidden,
        isModalOpen,
        setIsModalOpen,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
