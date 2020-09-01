import React, { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import AppRouter from "./routes/AppRouter";
import { UserContext } from "./CreateContext";
import { ThemeContext } from "./CreateContext";
import { LogoContext } from "./CreateContext";
import firebase from "firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Cookies from "js-cookie";

function App() {
  const usuario = Cookies.getJSON("user");

  const session = JSON.parse(sessionStorage.getItem("user"));

  const [user, setUser] = useState(usuario == undefined ? session : usuario);
  const [themes, setTheme] = useState();
  const [logos, setLogos] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const db = firebase.firestore();

    let docRef = db.collection("company").doc("color");
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setTheme(doc.data());
      } else {
        setTheme({
          primaryColor: "#fa7d09",
          primaryCColor: "#ff4301",
          thirdColor: "#2f2519",
          secondaryColor: "#4a3f35",
        });
      }
    });
    let docRef2 = db.collection("company").doc("logo");
    docRef2.get().then(function (doc) {
      if (doc.exists) {
        setLogos(doc.data());
        setLoading(false);
      } else {
        setLogos(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        themes,
        setTheme,
      }}
    >
      <LogoContext.Provider
        value={{
          logos,
          setLogos,
        }}
      >
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <AppRouter />
        </UserContext.Provider>
      </LogoContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
