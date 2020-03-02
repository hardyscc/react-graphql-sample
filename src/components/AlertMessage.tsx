import React from "react";
import { UsersStore } from "../context/UsersStore";

export const AlertMessage = () => {
  const { error } = UsersStore.useContainer();
  return <div className="App-error">{error}</div>;
};
