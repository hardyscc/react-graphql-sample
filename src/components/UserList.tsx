import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const UserList = () => {
  const { users, getUsers, deleteUser } = useContext(GlobalContext);

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
