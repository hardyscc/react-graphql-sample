import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Menu } from "./components/Menu";
import { PrivateRoute } from "./components/PrivateRoute";
import { Logout } from "./pages/Logout";
import { User } from "./pages/User";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Menu />
          <PrivateRoute exact path="/" component={User} />
          <Route path="/logout" component={Logout} />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
