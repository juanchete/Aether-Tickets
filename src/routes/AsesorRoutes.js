import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'
import { UserContext } from "../CreateContext";
import Cookies from 'js-cookie';

function AsesorRoutes({ component: Component, ...rest}) {
    
    const {user, setUser} = useContext(UserContext)

  console.log(user);
    
    return (
        <Route
        {...rest}
        render = { () => user !== undefined && (user.role=='asesor' || user.role=='admin')  ? (<Component/>) 
            : (
                <Redirect to='/'/>
            )
        }/>
    )
}

export default AsesorRoutes