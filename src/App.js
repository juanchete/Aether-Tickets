import React, { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import AppRouter from "./AppRouter";
import { UserContext } from "./CreateContext";

import Cookies from 'js-cookie';

function App() {
  
  const [user, setUser] = useState()

  const usuario = Cookies.getJSON('user');

  useEffect(() => {
    setUser( usuario)
  }, [])
  
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
