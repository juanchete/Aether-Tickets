import React from "react";
import Login from "./views/clientes/Login";
import RegistroClientes from "./views/clientes/SignUp";
import ForgotPassword from "./views/clientes/Forgot-Password";
import InviteToRegister from './views/asesores/Invite-To-Register';
import SignUpAsesor from './views/asesores/SignUp';
import LoginAsesores from './views/asesores/Login';
import Home from "./views/clientes/Home";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import { useFirebaseApp } from "reactfire";

function AppRouter() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={RegistroClientes} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/invite-register" component={InviteToRegister} />
        <Route exact path="/sign-up-asesores" component={SignUpAsesor} />
        <Route exact path="/asesores/login" component={LoginAsesores} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
