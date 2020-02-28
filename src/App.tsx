import React, { useContext, useEffect } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { GlobalContext, GlobalProvider } from "./context/GlobalState";
import { useUsersQuery } from "./generated/graphql";

function App() {
  const { updateUsers } = useContext(GlobalContext);
  const { data, loading, error } = useUsersQuery();

  useEffect(() => {
    if (data) {
      updateUsers(data.users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;

  return (
    <GlobalProvider>
      <div className="App">
        <header className="App-header">
          <UserList />
          <ul>
            {data?.users.map(user => (
              <li key={user.id}>
                {user.id} {user.name}
              </li>
            ))}
          </ul>
        </header>
      </div>
    </GlobalProvider>
  );
}

export default App;
