import React, {useEffect} from 'react'
import {
    useUser, useFirebaseApp
} from 'reactfire'
import { useLocation } from 'react-router-dom'

function Home() {

    const firebase = useFirebaseApp()

    const logout = async () =>{
        await firebase.auth().signOut()
    }


    
    
  const user = useUser()
    return (
        <div>
            <h1>Bienvenidos al oasis Bienvenidos</h1>
            <button onClick={logout}> Log Out </button>
        </div>
    )
}

export default Home
