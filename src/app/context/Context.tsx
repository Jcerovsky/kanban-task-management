"use client";

import React, { createContext, useEffect } from "react";
import { useObjectState } from "@/app/hooks/useObjectState";
import { boardsData } from "../data/data";

export const Context = createContext<ContextProps | null>(null);

interface ContextProps {
  theme: string;
  data: DataProps[];
  currentBoard: string;
  columns: string[];
  isSidebarHidden: boolean;
  isModalOpen: boolean;
  errorMessage: string;
  updateState: (newState: Partial<ContextProps>) => void;
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

const getLocalStorageItem = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  return defaultValue;
};

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, updateState] = useObjectState<ContextProps>({
    theme: getLocalStorageItem("theme", "dark"),
    data: getLocalStorageItem("data", []),
    currentBoard: "",
    columns: [],
    isSidebarHidden: false,
    isModalOpen: false,
    errorMessage: "",
    updateState: () => {},
  });

  useEffect(() => {
    if (state.theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", JSON.stringify(state.theme));
    }
  }, [state.theme]);

  useEffect(() => {
    let localStorageData;
    if (typeof window !== "undefined") {
      localStorageData = localStorage.getItem("data");
    }

    if (!localStorageData) {
      const allBoardsData = boardsData.boards;
      updateState({ data: allBoardsData });
      if (typeof window !== "undefined") {
        localStorage.setItem("data", JSON.stringify(allBoardsData));
      }
      //**Used for fetching from local json server** //
      //   fetch("http://localhost:3000/api/kanban")
      //     .then((res) => res.json())
      //     .then((fetchedData) => {
      //       updateState({ data: fetchedData });
      //       if (typeof window !== "undefined") {
      //         localStorage.setItem("data", JSON.stringify(fetchedData));
      //       }
      //     })
      //     .catch((err) => updateState({ errorMessage: err }));
    }
  }, []);

  useEffect(() => {
    if (state.data.length > 0 && !state.currentBoard) {
      updateState({ currentBoard: state.data[0].name });
    }
  }, [state.data, state.currentBoard]);

  return (
    <Context.Provider
      value={{
        theme: state.theme,
        data: state.data,
        currentBoard: state.currentBoard,
        columns: state.columns,
        isSidebarHidden: state.isSidebarHidden,
        isModalOpen: state.isModalOpen,
        errorMessage: state.errorMessage,
        updateState,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export default ContextProvider;
