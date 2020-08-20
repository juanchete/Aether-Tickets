import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebaseConfig from "./firebase-config";
import Spinner from "./components/Spinner";
import { FirebaseAppProvider } from "reactfire";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Spinner />
        </div>
      }
    >
      <App />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
const PageLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;
