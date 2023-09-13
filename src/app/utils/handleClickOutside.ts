import React, { MouseEvent } from "react";

export const handleClickOutside = (
  e: MouseEvent,
  toBeHiddenClass: string,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const target = e.target as HTMLElement;
  if (!target.closest(toBeHiddenClass)) {
    setState(false);
  }
};
