/* global gapi */
import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import { FaBatteryThreeQuarters } from "react-icons/fa";

const config = {
  clientId:
    "568280133217-hbqdet1g3089es9trln0m8e9qj7o8l86.apps.googleusercontent.com",
  scope: "https://mail.google.com/",
};

export default function App() {
  const [gapiLoaded, setgapiLoaded] = useState(false);
  const handleSigninStatusChange = (isSignedIn) => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (isSignedIn) {
      const currentUser = auth2.currentUser.get();
      const authResponse = currentUser.getAuthResponse(true);
      if (authResponse) {
        // save access token

        console.log(authResponse);
      }
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      console.log("OnLoad");
      const initClient = () => {
        gapi.client.init(config).then(() => {
          const gapi = window.gapi;
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.isSignedIn.listen(handleSigninStatusChange());

          const currentUser = auth2.currentUser.get();
          const authResponse = currentUser.getAuthResponse(true);
          if (authResponse && currentUser) {
            // save access token
            console.log(authResponse);
          }
          setgapiLoaded(true);
        });
      };
      gapi.load("client:auth2", initClient);
    };

    document.body.appendChild(script);
  }, [handleSigninStatusChange]);

  return gapiLoaded ? (
    <div>
      <Home />
    </div>
  ) : (
    <div>Please provide clientId in the config</div>
  );
}
