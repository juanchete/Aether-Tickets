<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React from "react";
import Login from "./views/clientes/Login";
import RegistroClientes from "./views/clientes/SignUp";
import Home from "./views/clientes/Home";
import NewTicket from "./views/clientes/NewTicket";
import Categories from "./views/Asesor/Categories";
import Suggestions from "./views/Asesor/Suggestions";
import Faq from "./views/clientes/Faq";
import { BrowserRouter as Router, Route } from "react-router-dom";
>>>>>>> feature/addCategoryDesign
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
