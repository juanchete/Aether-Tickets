import React, { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import AppRouter from "./routes/AppRouter";
import { UserContext } from "./CreateContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Cookies from "js-cookie";

function App() {
  const usuario = Cookies.getJSON("user");

  const session = JSON.parse(sessionStorage.getItem("user"));

  const [user, setUser] = useState(usuario == undefined ? session : usuario);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <AppRouter />
    </UserContext.Provider>
  );
}

export default App;
