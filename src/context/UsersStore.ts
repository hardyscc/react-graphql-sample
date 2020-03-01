import { useApolloClient } from "@apollo/react-hooks";
import { useState } from "react";
import { createContainer } from "unstated-next";
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

function useUsersStore() {
  const [users, setUsers] = useState<User[]>([]);
  const client = useApolloClient();

  const getUsers = async () => {
    const result = await client.query<UsersQuery>({
      query: UsersDocument
    });
    setUsers(result.data.users);
  };

  const addUser = async (user: CreateUserInput) => {
    const result = await client.mutate<
      CreateUserMutation,
      CreateUserMutationVariables
    >({
      mutation: CreateUserDocument,
      variables: { input: user }
    });
    if (!result.data) {
      throw new Error("addUser error!");
    }
    setUsers([...users, result.data.createUser]);
  };

  const deleteUser = async (id: string) => {
    const result = await client.mutate<
      RemoveUserMutation,
      RemoveUserMutationVariables
    >({
      mutation: RemoveUserDocument,
      variables: { id }
    });
    if (!result.data) {
      throw new Error("deleteUser error!");
    }
    setUsers(users.filter(user => user.id !== id));
  };

  return { users, getUsers, addUser, deleteUser };
}

export const UsersStore = createContainer(useUsersStore);
