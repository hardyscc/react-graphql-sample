import React, { createContext, useReducer } from "react";
import { User } from "../generated/graphql";
import AppReducer from "./AppReducer";

// Initial state
type State = {
  users: User[];
  updateUsers: Function;
};

const initialState: State = {
  users: [],
  updateUsers: () => {}
};

// Create context
export const GlobalContext = createContext<State>(initialState);

// Provider component
export const GlobalProvider = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function updateUsers(users: User[]) {
    dispatch({ type: "UPDATE_USERS", payload: users });
  }

  return (
    <GlobalContext.Provider
      value={{ users: state.users, updateUsers }}
    ></GlobalContext.Provider>
  );
};
