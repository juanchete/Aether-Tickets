/* global gapi */
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const auth2 = gapi.auth2.getAuthInstance();
    const getLoginState = () => auth2.isSignedIn.get();
    setisLoggedIn(getLoginState());

    auth2.isSignedIn.listen(() => {
      setisLoggedIn(getLoginState());
    });
  });

  const handleLoginClick = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((user) => {
      const profile = user.getBasicProfile();
      console.log("Name: " + profile.getName());
    });
  };

  const handleLogoutClick = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(console.log("User signed out."));
  };

  let content;
  if (isLoggedIn) {
    content = (
      <div>
        <h3>Hello</h3>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    );
  } else {
    content = (
      <div>
        <h3>Login with Google</h3>
        <button onClick={handleLoginClick}>Log in with Google</button>
      </div>
    );
  }

  return <div>{content}</div>;
}
