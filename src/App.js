import React from "react";
import Login from "./views/clientes/Login";
import RegistroClientes from "./views/clientes/SignUp";
import Home from "./views/clientes/Home";
import NewTicket from "./views/clientes/NewTicket";
import Categories from "./views/Asesor/Categories";
import Suggestions from "./views/Asesor/Suggestions";
import AddSuggestion from "./views/Asesor/AddSuggestion";
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
        <Route exact path="/newticket" component={NewTicket} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/suggestions" component={Suggestions} />
        <Route exact path="/addcategory" component={AddSuggestion} />
      </div>
    </Router>
  );
}

export default App;
