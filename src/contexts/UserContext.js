import React, { createContext, useReducer } from "react";
import { initialState, UserReducer } from "../reducers/UserReducer";

export const UseContext = createContext();

export default function UserContext({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UseContext.Provider value={{ state, dispatch }}>
      {children}
    </UseContext.Provider>
  );
}
