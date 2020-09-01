import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHome from "../components/ApiGmail/App/App";
import { ThemeContext } from "../CreateContext";
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
import AsesorDetail from "../views/Asesor/AsesorDetail";
import AllClients from "../views/Asesor/AllClients";
import Reports from "../views/Asesor/Reports";
import IndividualReports from "../views/Asesor/IndividualReports";
import TicketAsesor from "../views/Asesor/Ticket";
import Amonestados from "../views/Asesor/Amonestados";
import Settings from "../views/Asesor/Settings";
import AdminRoutes from "../routes/AdminRoutes";
import AsesorRoutes from "../routes/AsesorRoutes";
import InviteRoutes from "../routes/InviteRoutes";
import ForgotPassword from "../views/Asesor/ForgotPassword";

function AppRouter() {
  const { themes, setTheme } = useContext(ThemeContext);
  return (
    <>
      {themes ? (
        <Router>
          <Switch>
            <Route
              exact
              path="/category/:id"
              component={() => <Category theme={themes} />}
            />

            <AdminRoutes
              exact
              path="/invite-register"
              component={() => <InviteToRegister theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/settings"
              component={() => <Settings theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/asesores/all-asesors"
              component={() => <AllAsesors theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/asesores/reports"
              component={Reports}
              component={() => <Reports theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/asesores/individual-reports"
              component={() => <IndividualReports theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/asesores/admonished-asesors"
              component={() => <Amonestados theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/asesor/:id"
              component={() => <AsesorDetail theme={themes} />}
            />
            <AdminRoutes
              exact
              path="/asesores/all-clients"
              component={() => <AllClients theme={themes} />}
            />
            <InviteRoutes
              exact
              path="/sign-up-asesores"
              component={() => <SignUpAsesor theme={themes} />}
            />

            <Route
              exact
              path="/login"
              component={() => <LoginAsesores theme={themes} />}
            />
            <Route
              exact
              path="/forgot-password"
              component={() => <ForgotPassword theme={themes} />}
            />

            <AsesorRoutes
              exact
              path="/tickets/pending"
              component={() => <ShowTickets filter="Pending" theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/tickets/open"
              component={() => <ShowTickets filter="Open" theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/tickets/solved"
              component={() => <ShowTickets filter="Solved" theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/tickets/unsolved"
              component={() => <ShowTickets filter="Unsolved" theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/tickets/closed"
              component={() => <ShowTickets filter="Closed" theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/asesores/add-categories"
              component={() => <AddCategory theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/asesores/categories"
              component={() => <Categories theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/asesores/add-suggestion"
              component={() => <AddSuggestion theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/asesores/suggestion"
              component={() => <Suggestions theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/asesores/change-password"
              component={() => <ChangePassword theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/asesores/ticket/:id"
              component={() => <TicketAsesor theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/"
              component={() => <Home theme={themes} />}
            />
            <AsesorRoutes
              exact
              path="/home"
              component={() => <Home theme={themes} />}
            />
          </Switch>
        </Router>
      ) : null}
    </>
  );
}

export default AppRouter;
