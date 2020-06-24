import { ApolloProvider } from "@apollo/react-hooks";
import { KeycloakProvider } from "@react-keycloak/web";
import React from "react";
import ReactDOM from "react-dom";
import { client } from "./apollo";
import App from "./App";
import "./index.css";
import { keycloak } from "./keycloak";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <KeycloakProvider keycloak={keycloak}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </KeycloakProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
