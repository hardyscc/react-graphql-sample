import React, { useState } from "react";
import { UsersStore } from "../context/UsersStore";

export const AddUser = () => {
  const [name, setName] = useState("");
  const { users, addUser } = UsersStore.useContainer();

  function userExists(name: string) {
    return users.filter(user => user.name === name).length > 0;
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button
        disabled={!name}
        onClick={e => {
          if (userExists(name)) {
            alert("user already exists");
            return;
          }
          addUser({ name });
          setName("");
        }}
      >
        Add
      </button>
    </div>
  );
};
