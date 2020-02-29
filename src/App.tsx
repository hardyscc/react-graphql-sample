import React from "react";
import "./App.css";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserList />
        <AddUser />
      </header>
    </div>
  );
}

export default App;
