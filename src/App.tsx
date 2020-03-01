import React from "react";
import "./App.css";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import { UsersStore } from "./context/UsersStore";

function App() {
  return (
    <UsersStore.Provider>
      <div className="App">
        <header className="App-header">
          <UserList />
          <AddUser />
        </header>
      </div>
    </UsersStore.Provider>
  );
}

export default App;
