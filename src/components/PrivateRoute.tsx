import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Route, RouteProps } from "react-router";

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  render,
  ...rest
}) => {
  const [keycloak, initialized] = useKeycloak();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!initialized) {
          return <div>Keycloak initialing...</div>;
        }

        if (!keycloak.authenticated) {
          keycloak.login();
          return <div>redirect to login</div>;
        }

        if (Component) {
          return <Component {...props} />;
        }

        return render ? render(props) : null;
      }}
    />
  );
};
