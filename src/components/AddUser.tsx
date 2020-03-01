import React, { useState } from "react";
import { UsersStore } from "../context/UsersStore";

export const AddUser = () => {
  const { addUser } = UsersStore.useContainer();

  const [name, setName] = useState("");
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button
        onClick={e => {
          addUser({ name });
          setName("");
        }}
      >
        Add
      </button>
    </div>
  );
};
