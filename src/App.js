import React, { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import AppRouter from "./routes/AppRouter";
import { UserContext } from "./CreateContext";

import Cookies from 'js-cookie';

function App() {
  
  

  const usuario = Cookies.getJSON('user')

  const [user, setUser] = useState( usuario )
 

  
  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      <AppRouter/>
    </UserContext.Provider>
  );
}

export default App;
