import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'
import { UserContext } from "../CreateContext";
import { useFirebaseApp } from "reactfire";

function InviteRoutes({ component: Component, ...rest}) {
    
    const firebase = useFirebaseApp()

    
    return (
        <Route
        {...rest}
        render = { () => firebase.auth().isSignInWithEmailLink(window.location.href)  ? (<Component/>) 
            : (
                <Redirect to='/'/>
            )
        }/>
    )
}

export default InviteRoutes