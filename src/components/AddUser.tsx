import React, { useState } from "react";
import { UsersStore } from "../context/UsersStore";

export const AddUser = () => {
  const [name, setName] = useState("");
  const { users, addUser } = UsersStore.useContainer();

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button
        onClick={e => {
          if (users.filter(user => user.name === name).length > 0) {
            alert("already exists");
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
