import React, { useEffect } from "react";
import { UsersStore } from "../context/UsersStore";

export const UserList = () => {
  const { users, getUsers, deleteUser } = UsersStore.useContainer();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} <button onClick={() => deleteUser(user.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};
