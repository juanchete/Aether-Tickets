import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHome from "../components/ApiGmail/App/App";
import InviteToRegister from "../views/Asesor/Invite-To-Register";
import SignUpAsesor from "../views/Asesor/SignUp";
import LoginAsesores from "../views/Asesor/Login";
import Categories from "../views/Asesor/Categories";
import Category from "../views/Asesor/Category";
import Suggestions from "../views/Asesor/Suggestions";
import ShowTickets from "../views/Asesor/ShowTicketsByStatus";
import Home from "../views/Asesor/Home";
import ChangePassword from "../views/Shared/change-password";
import AddCategory from "../views/Asesor/AddCategory";
import AddSuggestion from "../views/Asesor/AddSuggestion";
import AllAsesors from "../views/Asesor/AllAsesors";
import AllClients from "../views/Asesor/AllClients";
import TicketAsesor from "../views/Asesor/Ticket";
import AdminRoutes from "../routes/AdminRoutes";
import AsesorRoutes from "../routes/AsesorRoutes";
import InviteRoutes from "../routes/InviteRoutes";
import ForgotPassword from "../views/Asesor/ForgotPassword";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/category/:id" component={Category} />

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
        <InviteRoutes exact path="/sign-up-asesores" component={SignUpAsesor} />

        <Route exact path="/login" component={LoginAsesores} />
        <Route exact path="/forgot-password" component={ForgotPassword} />

        <AsesorRoutes
          exact
          path="/tickets/pending"
          component={() => <ShowTickets filter="Pending" />}
        />
        <AsesorRoutes
          exact
          path="/tickets/open"
          component={() => <ShowTickets filter="Open" />}
        />
        <AsesorRoutes
          exact
          path="/tickets/solved"
          component={() => <ShowTickets filter="Solved" />}
        />
        <AsesorRoutes
          exact
          path="/tickets/unsolved"
          component={() => <ShowTickets filter="Unsolved" />}
        />
        <AsesorRoutes
          exact
          path="/tickets/closed"
          component={() => <ShowTickets filter="Closed" />}
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
          path="/asesores/ticket/:id"
          component={TicketAsesor}
        />
        <AsesorRoutes exact path="/" component={Home} />
        <AsesorRoutes exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
