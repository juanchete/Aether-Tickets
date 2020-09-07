import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'
import { UserContext } from "../CreateContext";
import { useFirebaseApp } from "reactfire";

function InviteRoutes({ component: Component, ...rest}) {
    
    const firebase = useFirebaseApp()
    const {user} = useContext(UserContext)

    
    return (
        <Route
        {...rest}
        render = { () => firebase.auth().isSignInWithEmailLink(window.location.href) && !user ? (<Component/>) 
            : (
                <Redirect to='/login'/>
            )
        }/>
    )
}

export default InviteRoutes