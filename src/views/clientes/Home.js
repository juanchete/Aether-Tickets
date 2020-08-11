import React, {useEffect,useContext} from 'react'
import {
    useUser, useFirebaseApp
} from 'reactfire'
import  { UserContext }  from '../../CreateContext'

import Cookies from 'js-cookie'

function Home() {

    const firebase = useFirebaseApp()

    const sesion = useUser()


    const {user, setUser} = useContext(UserContext)
    console.log(user);

    const logout = async () =>{

        try {

        await firebase.auth().signOut()

        setUser({})

        Cookies.remove('user')
        
            
        } catch (error) {
            console.log(error);
        }
        
    }



    return (
        <div>
        { user && 
             <>
             {user.email}
             <div>
               <h1>Bienvenidos al oasis Bienvenidos</h1>
               <button onClick={logout}> Log Out </button>
             </div>
             <pre>
               {JSON.stringify(user, null , 3)}
             </pre></>
        }

        { !user &&
        <>
         <h1>Registrate pana</h1>
        </>}
        
        </div>
    )
}

export default Home
