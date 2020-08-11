import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'
import { UserContext } from "../CreateContext";
import Cookies from 'js-cookie';

function UserRoutes({ component: Component, ...rest}) {
    
    const {user, setUser} = useContext(UserContext)

  console.log(user);
    
    return (
        <Route
        {...rest}
        render = { () => user !== undefined && user.role=='usuario' ? (<Component/>) 
            : (
                <Redirect to='/'/>
            )
        }/>
    )
}

export default UserRoutes