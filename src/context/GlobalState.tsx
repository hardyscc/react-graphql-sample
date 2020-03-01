import { useApolloClient } from "@apollo/react-hooks";
import React, { createContext, useReducer } from "react";
import {
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
  RemoveUserDocument,
  RemoveUserMutation,
  RemoveUserMutationVariables,
  User,
  UsersDocument,
  UsersQuery
} from "../generated/graphql";
import { AppReducer } from "./AppReducer";

export enum Actions {
  UPDATE_USERS,
  ADD_USER,
  DELETE_USER
}

// Initial state
export type State = {
  users: User[];
  getUsers: () => void;
  addUser: (user: CreateUserInput) => void;
  deleteUser: (id: string) => void;
};

const initialState: State = {
  users: [],
  getUsers: () => {},
  addUser: (user: CreateUserInput) => {},
  deleteUser: (id: string) => {}
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

  async function deleteUser(id: string) {
    const result = await client.mutate<
      RemoveUserMutation,
      RemoveUserMutationVariables
    >({
      mutation: RemoveUserDocument,
      variables: { id }
    });
    if (result.data) {
      dispatch({ type: Actions.DELETE_USER, payload: id });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        getUsers,
        addUser,
        deleteUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
