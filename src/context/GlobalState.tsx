import { useApolloClient } from "@apollo/react-hooks";
import React, { createContext, useReducer } from "react";
import {
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
  User,
  UsersDocument,
  UsersQuery
} from "../generated/graphql";
import { AppReducer } from "./AppReducer";

export enum Actions {
  UPDATE_USERS,
  ADD_USER
}

// Initial state
export type State = {
  users: User[];
  getUsers: () => void;
  addUser: (user: CreateUserInput) => void;
};

const initialState: State = {
  users: [],
  getUsers: () => {},
  addUser: (user: CreateUserInput) => {}
};

// Create context
export const GlobalContext = createContext<State>(initialState);

// Provider component
export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const client = useApolloClient();

  // Actions
  async function getUsers() {
    const result = await client.query<UsersQuery>({
      query: UsersDocument
    });
    dispatch({ type: Actions.UPDATE_USERS, payload: result.data.users });
  }

  async function addUser(user: CreateUserInput) {
    const result = await client.mutate<
      CreateUserMutation,
      CreateUserMutationVariables
    >({
      mutation: CreateUserDocument,
      variables: { input: user }
    });
    if (result.data) {
      dispatch({ type: Actions.ADD_USER, payload: result.data.createUser });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        getUsers,
        addUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
