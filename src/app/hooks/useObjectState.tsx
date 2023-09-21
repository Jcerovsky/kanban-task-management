import React, { useState } from "react";

function useObjectState<T>(initialState: T) {
  const [state, setState] = useState(initialState);

  const setStatesFromObject = (stateObject: Partial<T>) => {
    setState((prevState) => {
      return { ...prevState, ...stateObject };
    });
  };

  return [state, setStatesFromObject];
}

export default useObjectState;
