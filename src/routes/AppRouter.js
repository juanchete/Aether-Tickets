import React, { useContext } from "react";
import Login from "../views/clientes/Login";
import RegistroClientes from "../views/clientes/SignUp";
import ForgotPassword from "../views/clientes/Forgot-Password";
import InviteToRegister from '../views/Asesor/Invite-To-Register';
import SignUpAsesor from '../views/Asesor/SignUp';
import LoginAsesores from '../views/Asesor/Login';
import Faq from '../views/clientes/Faq';
import NewTicket from '../views/clientes/NewTicket';
import AddCategory from '../views/Asesor/AddCategory';
import Categories from '../views/Asesor/AddCategory';
import AddSuggestion from '../views/Asesor/AddSuggestion';
import Suggestions from '../views/Asesor/Suggestions';
import Home from "../views/clientes/Home";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import AdminRoutes from '../routes/AdminRoutes'
import UserRoutes from '../routes/UserRoutes'
import AsesorRoutes from '../routes/AsesorRoutes'
import InviteRoutes from '../routes/InviteRoutes'



function AppRouter() {


  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={RegistroClientes} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <UserRoutes exact path="/new-ticket" component={NewTicket} />      
        <UserRoutes exact path="/faq" component={Faq} />

        <AdminRoutes exact path="/invite-register" component={InviteToRegister} />
        <InviteRoutes exact path="/sign-up-asesores" component={SignUpAsesor} />

        <Route exact path="/asesores/login" component={LoginAsesores} />
        <AsesorRoutes exact path="/asesores/add-categories" component={AddCategory} />
        <AsesorRoutes exact path="/asesores/categories" component={Categories} />
        <AsesorRoutes exact path="/asesores/add-suggestion" component={AddSuggestion} />
        <AsesorRoutes exact path="/asesores/suggestion" component={Suggestions} />
        <AsesorRoutes exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
