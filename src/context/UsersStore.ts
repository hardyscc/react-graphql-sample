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
  const [error, setError] = useState("");

  const client = useApolloClient();

  const getUsers = async () => {
    const result = await client.query<UsersQuery>({
      query: UsersDocument
    });
    if (result.data?.users) {
      setUsers(result.data.users);
      setError("");
    } else {
      setError(`cannot querys users`);
    }
  };

  const addUser = async (user: CreateUserInput) => {
    const result = await client.mutate<
      CreateUserMutation,
      CreateUserMutationVariables
    >({
      mutation: CreateUserDocument,
      variables: { input: user }
    });
    if (result.data?.createUser) {
      setUsers([...users, result.data.createUser]);
      setError("");
    } else {
      setError(`cannot add user ${user}`);
    }
  };

  const deleteUser = async (id: string) => {
    const result = await client.mutate<
      RemoveUserMutation,
      RemoveUserMutationVariables
    >({
      mutation: RemoveUserDocument,
      variables: { id }
    });
    if (result.data?.removeUser) {
      setUsers(users.filter(user => user.id !== id));
      setError("");
    } else {
      setError(`cannot delete user ${id}`);
    }
  };

  return { users, error, getUsers, addUser, deleteUser };
}

export const UsersStore = createContainer(useUsersStore);
