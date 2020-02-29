import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddUser = () => {
  const { addUser } = useContext(GlobalContext);
  const [name, setName] = useState("");
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)}></input>
      <button
        onClick={e => {
          addUser({ name });
        }}
      >
        Add
      </button>
    </div>
  );
};
