import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "../CreateContext";

function AuthRoutes({ component: Component, ...rest }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() =>
        !user  ? (
          <Component />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default AuthRoutes;