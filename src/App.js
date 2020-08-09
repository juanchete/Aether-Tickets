import React from "react";
import Login from "./views/clientes/Login";
import RegistroClientes from "./views/clientes/RegistroClientes";
import Home from "./views/clientes/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useFirebaseApp } from "reactfire";

function App() {
  const fire = useFirebaseApp();
  console.log(fire);
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={RegistroClientes} />
      </div>
    </Router>
  );
}

export default App;
