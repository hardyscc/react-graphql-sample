import React from "react";
import "./App.css";
import { AddUser } from "./components/AddUser";
import { AlertMessage } from "./components/AlertMessage";
import { UserList } from "./components/UserList";
import { UsersStore } from "./context/UsersStore";

function App() {
  return (
    <UsersStore.Provider>
      <div className="App">
        <header className="App-header">
          <AlertMessage />
          <UserList />
          <AddUser />
        </header>
      </div>
    </UsersStore.Provider>
  );
}

export default App;
