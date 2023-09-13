import React, { MouseEvent } from "react";

export const handleClickOutside = (
  e: MouseEvent,
  toBeHiddenClass: string,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const target = e.target as HTMLElement;
  const elementToHide = document.querySelector(toBeHiddenClass) as HTMLElement;

  if (elementToHide && !elementToHide.contains(target)) {
    setState(false);
  }
};
