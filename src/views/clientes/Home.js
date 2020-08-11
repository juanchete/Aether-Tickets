import React, {useEffect,useContext} from 'react'
import {
    useUser, useFirebaseApp
} from 'reactfire'
import  { UserContext }  from '../../CreateContext'

function Home() {



    const {user, setUser} = useContext(UserContext)
    console.log(user);

    const logout =  () =>{
        // setUser({})
    }



    return (
        <>
        <div>
            <h1>Bienvenidos al oasis Bienvenidos</h1>
            <button onClick={logout}> Log Out </button>
        </div>
        <pre>
            {JSON.stringify(user, null , 3)}
        </pre>
        </>
    )
}

export default Home
