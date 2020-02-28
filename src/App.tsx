import React, { useContext, useEffect } from "react";
import "./App.css";
import { GlobalContext } from "./context/GlobalState";
import { useUsersQuery } from "./generated/graphql";

function App() {
  const { updateUsers } = useContext(GlobalContext);
  const { data, loading, error } = useUsersQuery();

  useEffect(() => {
    if (data) {
      updateUsers(data.users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {data?.users.map(user => (
            <li>
              {user.id} {user.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
