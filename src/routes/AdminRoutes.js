import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "../CreateContext";
import Cookies from "js-cookie";

function AdminRoutes({ component: Component, ...rest }) {
  const { user, setUser } = useContext(UserContext);

  console.log(user);
    
    return (
        <Route
        {...rest}
        render = { () => user && user.role=='admin' ? (<Component/>) 
            : (
                <Redirect to='/login'/>
            )
        }/>
    )
}

export default AdminRoutes;
