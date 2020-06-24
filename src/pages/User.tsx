import React from "react";
import { AddUser } from "../components/user/AddUser";
import { AlertMessage } from "../components/user/AlertMessage";
import { UserList } from "../components/user/UserList";
import { UsersStore } from "../context/UsersStore";

export const User = () => {
  return (
    <UsersStore.Provider>
      <AlertMessage />
      <UserList />
      <AddUser />
    </UsersStore.Provider>
  );
};
