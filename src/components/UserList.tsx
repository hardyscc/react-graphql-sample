import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const UserList = () => {
  const { users } = useContext(GlobalContext);

  return <h2>{users.length}</h2>;
};
