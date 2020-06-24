import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  const [keycloak] = useKeycloak();
  return (
    <>
      {keycloak.authenticated && (
        <Link className="App-link" to="/logout">
          logout
        </Link>
      )}
    </>
  );
};
