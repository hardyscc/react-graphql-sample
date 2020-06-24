import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { useHistory } from "react-router";

export const Logout = () => {
  const [keycloak] = useKeycloak();
  const history = useHistory();

  history.push("/");
  if (keycloak.authenticated) {
    keycloak.logout();
  }
  return <div />;
};
