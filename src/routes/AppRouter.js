import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "../views/clientes/Login";
import RegistroClientes from "../views/clientes/SignUp";
import ForgotPassword from "../views/clientes/Forgot-Password";
import InviteToRegister from "../views/Asesor/Invite-To-Register";
import SignUpAsesor from "../views/Asesor/SignUp";
import LoginAsesores from "../views/Asesor/Login";
import Faq from "../views/clientes/Faq";
import NewTicket from "../views/clientes/NewTicket";
import Categories from "../views/Asesor/Categories";
import Category from "../views/Asesor/Category";
import Suggestions from "../views/Asesor/Suggestions";
import ShowTickets from "../views/Asesor/ShowTicketsByStatus";
import Home from "../views/clientes/Home";
import ChangePassword from "../views/Shared/change-password";
import AddCategory from "../views/Asesor/AddCategory";
import AddSuggestion from "../views/Asesor/AddSuggestion";
import AllAsesors from "../views/Asesor/AllAsesors";
import AllClients from "../views/Asesor/AllClients";
import TicketAsesor from "../views/Asesor/Ticket";
import Ticket from '../views/clientes/Ticket'
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";
import AsesorRoutes from "../routes/AsesorRoutes";
import InviteRoutes from "../routes/InviteRoutes";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/category/:id" component={Category} />
        <Route exact path="/signup" component={RegistroClientes} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <UserRoutes exact path="/new-ticket" component={NewTicket} />
        <UserRoutes exact path="/faq" component={Faq} />
        <UserRoutes
          exact
          path="/user/change-password"
          component={ChangePassword}
        />

        <AdminRoutes
          exact
          path="/invite-register"
          component={InviteToRegister}
        />
        <AdminRoutes
          exact
          path="/asesores/all-asesors"
          component={AllAsesors}
        />
        <AdminRoutes
          exact
          path="/asesores/all-clients"
          component={AllClients}
        />
        <Route exact path="/asesores/ticket/:id" component={Ticket} />
        <InviteRoutes exact path="/sign-up-asesores" component={SignUpAsesor} />

        <Route exact path="/asesores/login" component={LoginAsesores} />
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
        <AsesorRoutes
          exact
          path="/asesores/add-categories"
          component={AddCategory}
        />
        <AsesorRoutes
          exact
          path="/asesores/categories"
          component={Categories}
        />
        <AsesorRoutes
          exact
          path="/asesores/add-suggestion"
          component={AddSuggestion}
        />
        <AsesorRoutes
          exact
          path="/asesores/suggestion"
          component={Suggestions}
        />
        <AsesorRoutes
          exact
          path="/asesores/change-password"
          component={ChangePassword}
        />
        <AsesorRoutes
          exact
          path="/asesores/ticket"
          component={TicketAsesor}
        />
        <AsesorRoutes exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
