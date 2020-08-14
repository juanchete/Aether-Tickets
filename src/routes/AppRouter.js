import React, { useContext } from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";

import Login from "../views/clientes/Login";
import RegistroClientes from "../views/clientes/SignUp";
import ForgotPassword from "../views/clientes/Forgot-Password";
import InviteToRegister from "../views/Asesor/Invite-To-Register";
import SignUpAsesor from "../views/Asesor/SignUp";
import LoginAsesores from "../views/Asesor/Login";
import Faq from "../views/clientes/Faq";
import NewTicket from "../views/clientes/NewTicket";
import Categories from "../views/Asesor/Categories";
import Suggestions from "../views/Asesor/Suggestions";
import ShowTickets from "../views/Asesor/ShowTicketsByStatus";
import Home from "../views/clientes/Home";
import ChangePassword from '../views/Shared/change-password'

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
        <UserRoutes exact path='/user/change-password' component={ChangePassword} />

        <AdminRoutes
          exact
          path="/invite-register"
          component={InviteToRegister}
        />
        <InviteRoutes exact path="/sign-up-asesores" component={SignUpAsesor} />

        <Route exact path="/asesores/login" component={LoginAsesores} />
        <Route exact path="/asesores/categories" component={Categories} />
        <Route exact path="/asesores/suggestion" component={Suggestions} />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/tickets/pending"
          component={() => <ShowTickets filter="Pending" />}
        />
        <Route
          exact
          path="/tickets/open"
          component={() => <ShowTickets filter="Open" />}
        />
        <Route
          exact
          path="/tickets/solved"
          component={() => <ShowTickets filter="Solved" />}
        />
        <Route
          exact
          path="/tickets/unsolved"
          component={() => <ShowTickets filter="Unsolved" />}
        />
        <AsesorRoutes exact path="/asesores/add-categories" component={AddCategory} />
        <AsesorRoutes exact path="/asesores/categories" component={Categories} />
        <AsesorRoutes exact path="/asesores/add-suggestion" component={AddSuggestion} />
        <AsesorRoutes exact path="/asesores/suggestion" component={Suggestions} />
        <AsesorRoutes exact path="/asesores/change-password" component={ChangePassword} />
        <AsesorRoutes exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
