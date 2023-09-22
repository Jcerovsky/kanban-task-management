import { useState } from "react";

export function useObjectState<T>(
  initialState: T,
): [T, (newState: Partial<T>) => void] {
  const [state, setState] = useState<T>(initialState);

  const updateState = (newState: Partial<T>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return [state, updateState];
}
