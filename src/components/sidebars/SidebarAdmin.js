import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useUser, useFirebaseApp } from "reactfire";
import { FaTicketAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Spinner from "../../components/Spinner";
import AddCategory from "../../views/Asesor/AddCategory";
import AddSuggestion from "../../views/Asesor/AddSuggestion";
import { UserContext } from "../../CreateContext";
import { NavLink, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

export default function SidebarAdmin({
  ticket,
  asesor,
  category,
  report,
  theme,
  setting,
  logo,
}) {
  const [categoryShow, setCategoryShow] = React.useState(false);
  const [suggestionShow, setSuggestionShow] = React.useState(false);
  const [categoriesSide, setCategoriesSide] = React.useState();
  const [suggestionsSide, setSuggestionsSide] = React.useState();
  const [asesorSide, setAsesorSide] = React.useState();
  const [clientsSide, setClientsSide] = React.useState();
  const [ticketsSide, setTicketsSide] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [tickets, setTickets] = React.useState(ticket ? true : false);
  const [asesors, setAsesors] = React.useState(asesor ? true : false);
  const [settings, setSettings] = React.useState(setting ? true : false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [categories, setCategories] = React.useState(category ? true : false);
  const [reports, setReports] = React.useState(report ? true : false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [allAsesors, setAllAsesors] = React.useState(false);
  const [allClients, setAllClients] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const firebase = useFirebaseApp();

  const { user, setUser } = useContext(UserContext);

  const renderRedirect = () => {
    if (flag) {
      return <Redirect to="/invite-register" />;
    }
  };

  const renderRedirectPassword = () => {
    if (changePassword) {
      return <Redirect to="/asesores/change-password" />;
    }
  };

  const renderRedirectAllAsessors = () => {
    if (allAsesors) {
      return <Redirect to="/asesores/all-asesors" />;
    }
  };

  const renderRedirectAllUsers = () => {
    if (allClients) {
      return <Redirect to="/asesores/all-clients" />;
    }
  };

  const logout = async () => {
    try {
      sessionStorage.removeItem("user");
      Cookies.remove("user");
      await firebase.auth().signOut();

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("tickets").onSnapshot((snapshot) => {
      const ticketsData = [];
      snapshot.forEach((doc) =>
        ticketsData.push({ ...doc.data(), id: doc.id })
      );
      console.log(ticketsData); // <------
      setTicketsSide(ticketsData);
    });

    db.collection("categories").onSnapshot((snapshot) => {
      const categoriesData = [];
      snapshot.forEach((doc) =>
        categoriesData.push({ ...doc.data(), id: doc.id })
      );
      console.log(categoriesData); // <------
      setCategoriesSide(categoriesData);
    });
    db.collection("suggestions").onSnapshot((snapshot) => {
      const suggestionsData = [];
      snapshot.forEach((doc) =>
        suggestionsData.push({ ...doc.data(), id: doc.id })
      );
      console.log(suggestionsData); // <------
      setSuggestionsSide(suggestionsData);
    });
    db.collection("usuarios").onSnapshot((snapshot) => {
      const clientsData = [];
      snapshot.forEach((doc) =>
        clientsData.push({ ...doc.data(), id: doc.id })
      );
      console.log(clientsData); // <------
      setClientsSide(clientsData);
    });
    db.collection("asesores").onSnapshot((snapshot) => {
      const asesoresData = [];
      snapshot.forEach((doc) =>
        asesoresData.push({ ...doc.data(), id: doc.id })
      );
      console.log(asesoresData); // <------
      setAsesorSide(asesoresData);
    });
    setLoading(false);
  }, [user]);

  const showCategory = (e) => {
    setCategoryShow(!categoryShow);
  };
  const showSuggestion = (e) => {
    setSuggestionShow(!suggestionShow);
  };

  const allTickets = (tickets) => {
    if (tickets) {
      var newArray = tickets.filter(function (el) {
        return el.status != "Solved" && el.status != "Unsolved";
      });
      if (newArray) {
        return newArray.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const allCategories = (categories) => {
    if (categories) {
      return categories.length;
    } else {
      return 0;
    }
  };

  const allSuggestions = (suggestions) => {
    if (suggestions) {
      return suggestions.length;
    } else {
      return 0;
    }
  };

  const allAsesores = (asesors) => {
    if (asesors) {
      return asesors.length;
    } else {
      return 0;
    }
  };

  const allClientes = (clients) => {
    if (clients) {
      return clients.length;
    } else {
      return 0;
    }
  };

  const allOpenTickets = (tickets) => {
    if (tickets) {
      var newArray = tickets.filter(function (el) {
        return el.status === "Open" && el.asesor === user.id;
      });
      if (newArray) {
        return newArray.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const allTicketsToHandle = (tickets) => {
    if (tickets) {
      var newArray = tickets.filter(function (el) {
        return (
          el.status != "Solved" &&
          el.status != "Unsolved" &&
          el.asesor === user.id
        );
      });
      if (newArray) {
        return newArray.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <AddCategory
            theme={theme}
            show={categoryShow}
            showCategory={showCategory}
          />
          <AddSuggestion
            theme={theme}
            show={suggestionShow}
            showSuggestion={showSuggestion}
          />
          <Sidebar categories={category} theme={theme}>
            {renderRedirect()}
            {renderRedirectPassword()}
            {renderRedirectAllAsessors()}
            {renderRedirectAllUsers()}
            <div className="navbar">
              <ul className="utilities">
                <li className="utilities-item">
                  {logo ? <img className="photo" src={logo.logoImage} /> : null}
                </li>
                <li
                  className="utilities-item"
                  onClick={(event) => {
                    setAsesors(false);
                    setCategories(false);
                    setSettings(false);
                    setCurrentUser(false);
                    setReports(false);
                    setTickets(true);
                    setOpen(!open);
                  }}
                >
                  <FaTicketAlt className="icon" />
                  <h4>Tickets</h4>
                </li>
                {user.role === "admin" ? (
                  <li
                    className="utilities-item"
                    onClick={(event) => {
                      setTickets(false);
                      setCategories(false);
                      setSettings(false);
                      setCurrentUser(false);
                      setAsesors(true);
                      setReports(false);
                      setOpen(!open);
                    }}
                  >
                    <FaUsers className="icon" />
                    <h4>Asesors</h4>
                  </li>
                ) : null}
                <li
                  className="utilities-item"
                  onClick={(event) => {
                    setTickets(false);
                    setAsesors(false);
                    setSettings(false);
                    setReports(false);
                    setCurrentUser(false);
                    setCategories(true);
                    setOpen(!open);
                  }}
                >
                  <FaEdit className="icon" />
                  <h4>Categories & Suggestions</h4>
                </li>
                {user.role === "admin" ? (
                  <li
                    className="utilities-item"
                    onClick={(event) => {
                      setTickets(false);
                      setAsesors(false);
                      setSettings(false);
                      setReports(true);
                      setCurrentUser(false);
                      setCategories(false);
                      setOpen(!open);
                    }}
                  >
                    <FaChartBar className="icon" />
                    <h4>Reports</h4>
                  </li>
                ) : null}
              </ul>
              <ul className="user">
                <li
                  className="user-item"
                  onClick={(event) => {
                    setTickets(false);
                    setAsesors(false);
                    setCurrentUser(false);
                    setCategories(false);
                    setReports(false);
                    setSettings(true);
                    setOpen(!open);
                  }}
                >
                  <IoMdSettings className="icon" />
                  <h4>Settings</h4>
                </li>
                <li
                  className="user-item"
                  onClick={(event) => {
                    setTickets(false);
                    setAsesors(false);
                    setCategories(false);
                    setSettings(false);
                    setReports(false);
                    setCurrentUser(true);
                    setOpen(!open);
                  }}
                >
                  <FaUserAlt className="icon" />
                  <h4>User</h4>
                </li>
              </ul>
            </div>
            {tickets ? (
              <>
                <div className="navbar-especific">
                  <div className="navbar-title">
                    <h2>Tickets</h2>
                  </div>
                  <ul className="nav-links">
                    <NavLink to="/" className="link-1">
                      <h3>All Tickets</h3>
                      <div className="counter">
                        <h4>{allTickets(ticketsSide).toString()}</h4>
                      </div>
                    </NavLink>
                    <NavLink to="/mytickets/to-handle" className="link-1">
                      <h3>Tickets to Handle</h3>
                      <div className="counter">
                        <h4>{allTicketsToHandle(ticketsSide).toString()}</h4>
                      </div>
                    </NavLink>
                  </ul>
                  <ul className="nav-links2">
                    <h2>My Tickets</h2>
                    <NavLink to="/mytickets/open" className="link-1">
                      <h3>My Open Tickets</h3>
                      <div className="counter">
                        <h4>{allOpenTickets(ticketsSide).toString()}</h4>
                      </div>
                    </NavLink>
                    <NavLink to="/mytickets/last-week" className="link-1">
                      <h3>My tickets in the last week</h3>
                    </NavLink>
                  </ul>
                  <ul className="nav-links3">
                    <h2>Statuses</h2>
                    <NavLink to="/tickets/open" className="link-1">
                      <h3>Open</h3>
                    </NavLink>
                    <NavLink to="/tickets/pending" className="link-1">
                      <h3>Pending</h3>
                    </NavLink>
                    <NavLink to="/tickets/closed" className="link-1">
                      <h3>Closed</h3>
                    </NavLink>
                    <NavLink to="/tickets/solved" className="link-1">
                      <h3>Solved</h3>
                    </NavLink>
                    <NavLink to="/tickets/unsolved" className="link-1">
                      <h3>Unsolved</h3>
                    </NavLink>
                  </ul>
                </div>
                {open ? (
                  <div className="navbar-especific-phone">
                    <div
                      className="navbar-title"
                      style={{
                        paddingTop: "30px",
                        paddingBottom: "30px",
                      }}
                    >
                      <h2>Tickets</h2>
                    </div>
                    <ul className="nav-links">
                      <NavLink to="/" className="link-1">
                        <h3>All Tickets</h3>
                        <div className="counter">
                          <h4>{allTickets(ticketsSide).toString()}</h4>
                        </div>
                      </NavLink>
                      <NavLink to="/mytickets/to-handle" className="link-1">
                        <h3>Tickets to Handle</h3>
                        <div className="counter">
                          <h4>{allTicketsToHandle(ticketsSide).toString()}</h4>
                        </div>
                      </NavLink>
                    </ul>
                    <ul className="nav-links2">
                      <h2>My Tickets</h2>
                      <NavLink to="/mytickets/open" className="link-1">
                        <h3>My Open Tickets</h3>
                        <div className="counter">
                          <h4>{allOpenTickets(ticketsSide).toString()}</h4>
                        </div>
                      </NavLink>
                      <NavLink to="/mytickets/last-week" className="link-1">
                        <h3>My tickets in the last week</h3>
                      </NavLink>
                    </ul>
                    <ul className="nav-links3">
                      <h2>Statuses</h2>
                      <NavLink to="/tickets/open" className="link-1">
                        <h3>Open</h3>
                      </NavLink>
                      <NavLink to="/tickets/pending" className="link-1">
                        <h3>Pending</h3>
                      </NavLink>
                      <NavLink to="/tickets/closed" className="link-1">
                        <h3>Closed</h3>
                      </NavLink>
                      <NavLink to="/tickets/solved" className="link-1">
                        <h3>Solved</h3>
                      </NavLink>
                      <NavLink to="/tickets/unsolved" className="link-1">
                        <h3>Unsolved</h3>
                      </NavLink>
                    </ul>
                  </div>
                ) : null}
              </>
            ) : null}
            {asesors && user.role === "admin" ? (
              <>
                <div className="navbar-especific">
                  <div className="navbar-title">
                    <h2>Users</h2>
                  </div>
                  <ul className="nav-links">
                    <li
                      className="link-1"
                      onClick={(event) => {
                        setAllAsesors(true);
                      }}
                    >
                      <h3>All Asesors</h3>
                      <div className="counter">
                        <h4>{allAsesores(asesorSide).toString()}</h4>
                      </div>
                    </li>
                    <li
                      className="link-1"
                      onClick={(event) => {
                        setAllClients(true);
                      }}
                    >
                      <h3>All Clients</h3>
                      <div className="counter">
                        <h4>{allClientes(clientsSide).toString()}</h4>
                      </div>
                    </li>
                  </ul>

                  <ul className="nav-links2">
                    <NavLink
                      to="/asesores/admonished-asesors"
                      className="link-1"
                    >
                      <h3>Reprimanded Asesors</h3>
                    </NavLink>
                  </ul>
                </div>
                {open ? (
                  <div className="navbar-especific-phone">
                    <div className="navbar-title">
                      <h2>Users</h2>
                    </div>
                    <ul className="nav-links">
                      <li
                        className="link-1"
                        onClick={(event) => {
                          setAllAsesors(true);
                        }}
                      >
                        <h3>All Asesors</h3>
                        <div className="counter">
                          <h4>{allAsesores(asesorSide).toString()}</h4>
                        </div>
                      </li>
                      <li
                        className="link-1"
                        onClick={(event) => {
                          setAllClients(true);
                        }}
                      >
                        <h3>All Clients</h3>
                        <div className="counter">
                          <h4>{allClientes(clientsSide).toString()}</h4>
                        </div>
                      </li>
                    </ul>
                    <ul className="nav-links2">
                      <NavLink
                        to="/asesores/admonished-asesors"
                        className="link-1"
                      >
                        <h3>Reprimanded Asesors</h3>
                      </NavLink>
                    </ul>
                  </div>
                ) : null}
              </>
            ) : null}
            {categories ? (
              <>
                <div className="navbar-especific">
                  <div className="navbar-title">
                    <h2>Categories & Suggestions</h2>
                  </div>
                  <ul className="nav-links">
                    <NavLink to="/asesores/categories" className="link-1">
                      <h3>All Categories</h3>
                      <div className="counter">
                        <h4>{allCategories(categoriesSide).toString()}</h4>
                      </div>
                    </NavLink>
                    <NavLink to="/asesores/suggestion" className="link-1">
                      <h3>All Suggestions</h3>
                      <div className="counter">
                        <h4>{allSuggestions(suggestionsSide).toString()}</h4>
                      </div>
                    </NavLink>
                  </ul>
                  <ul className="nav-links2">
                    <h2>Create</h2>
                    <li
                      className="link-1"
                      onClick={(event) => {
                        showCategory();
                      }}
                    >
                      <h3>Category</h3>
                    </li>
                    <li
                      className="link-1"
                      onClick={(event) => {
                        showSuggestion();
                      }}
                    >
                      <h3>Suggestion</h3>
                    </li>
                  </ul>
                </div>
                {open ? (
                  <div className="navbar-especific-phone">
                    <div className="navbar-title">
                      <h2>Categories & Suggestions</h2>
                    </div>
                    <ul className="nav-links">
                      <li className="link-1">
                        <h3>All Categories</h3>
                        <div className="counter">
                          <h4>{allCategories(categoriesSide).toString()}</h4>
                        </div>
                      </li>
                      <li className="link-1">
                        <h3>All Suggestions</h3>
                        <div className="counter">
                          <h4>{allSuggestions(suggestionsSide).toString()}</h4>
                        </div>
                      </li>
                    </ul>
                    <ul className="nav-links2">
                      <h2>Create</h2>
                      <li
                        className="link-1"
                        onClick={(event) => {
                          showCategory();
                        }}
                      >
                        <h3>Category</h3>
                      </li>
                      <li
                        className="link-1"
                        onClick={(event) => {
                          showSuggestion();
                        }}
                      >
                        <h3>Suggestion</h3>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </>
            ) : null}
            {reports ? (
              <>
                <div className="navbar-especific">
                  <div className="navbar-title">
                    <h2>Reports</h2>
                  </div>
                  <ul className="nav-links">
                    <NavLink to="/asesores/reports" className="link-1">
                      <h3>General Reports</h3>
                    </NavLink>
                    <NavLink
                      to="/asesores/individual-reports"
                      className="link-1"
                    >
                      <h3>Individual Reports</h3>
                    </NavLink>
                  </ul>
                </div>
                {open ? (
                  <div className="navbar-especific-phone">
                    <div className="navbar-title">
                      <h2>Reports</h2>
                    </div>
                    <ul className="nav-links">
                      <NavLink to="/asesores/reports" className="link-1">
                        <h3>General Reports</h3>
                      </NavLink>
                      <NavLink
                        to="/asesores/individual-reports"
                        className="link-1"
                      >
                        <h3>Individual Reports</h3>
                      </NavLink>
                    </ul>
                  </div>
                ) : null}
              </>
            ) : null}
            {settings ? (
              <>
                <div className="navbar-especific">
                  <div className="navbar-title">
                    <h2>Settings</h2>
                  </div>
                  <ul className="nav-links">
                    <li
                      className="link-1"
                      onClick={(event) => {
                        setChangePassword(true);
                      }}
                    >
                      <h3>Change Passwword</h3>
                    </li>
                    <NavLink to="/settings" className="link-1">
                      <h3>Settings</h3>
                    </NavLink>
                  </ul>
                </div>
                {open ? (
                  <div className="navbar-especific-phone">
                    <div className="navbar-title">
                      <h2>Settings</h2>
                    </div>
                    <ul className="nav-links">
                      <li
                        className="link-1"
                        onClick={(event) => {
                          setChangePassword(true);
                        }}
                      >
                        <h3>Change Passwword</h3>
                      </li>
                      <NavLink to="/settings" className="link-1">
                        <h3>Settings</h3>
                      </NavLink>
                    </ul>
                  </div>
                ) : null}
              </>
            ) : null}
            {currentUser ? (
              <>
                <div className="navbar-especific">
                  <div className="navbar-title">
                    <h2>Hello {user.name}</h2>
                  </div>
                  {user.role == "admin" ? (
                    <ul className="nav-links">
                      <li
                        className="link-1"
                        onClick={(event) => {
                          setFlag(true);
                        }}
                      >
                        <h3>Invite an Asesor</h3>
                      </li>

                      <li
                        className="link-1"
                        onClick={(event) => {
                          logout();
                        }}
                      >
                        <h3>Log Out</h3>
                      </li>
                    </ul>
                  ) : (
                    <ul className="nav-links">

                        <li
                          className="link-1"
                          onClick={(event) => {
                            logout();
                          }}
                        >
                          <h3>Log Out</h3>
                        </li>
                      </ul>
                  )}
                </div>
                {open ? (
                  <div className="navbar-especific-phone">
                    <div className="navbar-title">
                      <h2>Hello {user.name}</h2>
                    </div>
                    {user.role == "admin" ? (
                      <ul className="nav-links">
                        <li
                          className="link-1"
                          onClick={(event) => {
                            setFlag(true);
                          }}
                        >
                          <h3>Invite an Asesor</h3>
                        </li>

                        <li
                          className="link-1"
                          onClick={(event) => {
                            logout();
                          }}
                        >
                          <h3>Log Out</h3>
                        </li>
                      </ul>
                    ) : (
                      <ul className="nav-links">

                        <li
                          className="link-1"
                          onClick={(event) => {
                            logout();
                          }}
                        >
                          <h3>Log Out</h3>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : null}
              </>
            ) : null}
          </Sidebar>
        </>
      ) : (
        <PageLoading>
          {" "}
          <Spinner color={theme ? theme.primaryColor : "#fa7d09"} />
        </PageLoading>
      )}
    </>
  );
}

const PageLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  position: fixed;
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Sidebar = styled.div`
  height: 100vh;
  width: 30%;
  display: flex;
  flex-direction: row;
  position: fixed;
  .navbar {
    height: 100%;
    width: 20%;
    background: ${(props) =>
      props.theme ? props.theme.thirdColor : "#2f2519"};
    display: flex;
    flex-direction: column;

    .utilities {
      height: 50%;
      width: 100%;

      .utilities-item {
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
        cursor: pointer;
        &:hover {
          background: ${(props) =>
            props.theme ? props.theme.secondaryColor : "#4a3f35"};
        }
        .icon {
          width: 30px;
          height: 30px;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
        }
        .photo {
          width: 40px;
          height: 40px;
        }
        h4 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-size: 7px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          text-align: center;
          margin-top: 2px;
        }
      }
    }
    .user {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .user-item {
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
        cursor: pointer;
        &:hover {
          background: ${(props) =>
            props.theme ? props.theme.secondaryColor : "#4a3f35"};
        }
        .icon {
          width: 30px;
          height: 30px;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
        }
        h4 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-size: 7px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          text-align: center;
          margin-top: 2px;
        }
      }
    }
  }
  .navbar-especific-phone {
    display: none;
  }
  .navbar-especific {
    width: 80%;
    height: 100%;
    background: ${(props) =>
      props.theme ? props.theme.secondaryColor : "#4a3f35"};
    display: flex;
    flex-direction: column;
    .navbar-title {
      width: 100%;
      display: flex;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      h2 {
        font-size: ${(props) => (props.categories ? "20px" : "22px")};
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        margin-left: 20px;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        display: flex;
        align-self: center;
        text-transform: uppercase;
        width: 100%;
      }
    }
    .nav-links {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;
      .link-1 {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
        h3 {
          font-size: 18px;
          font-family: "Raleway", sans-serif;
          font-weight: 300;
          margin-left: 30px;
          font-style: normal;
          color: white;
        }

        .counter {
          width: auto;
          background: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          margin-left: 10px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          h4 {
            font-size: 15px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            font-style: normal;
            color: white;
          }
        }
      }
    }
    .nav-links2 {
      width: 100%;
      margin-top: 50px;
      h2 {
        margin-bottom: 10px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.3em;
        font-weight: 500;
        font-size: 10px;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        margin-left: 15px;
      }
      .link-1 {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
        h3 {
          font-size: 18px;
          font-family: "Raleway", sans-serif;
          font-weight: 300;
          margin-left: 30px;
          font-style: normal;
          color: white;
        }

        .counter {
          width: auto;
          background: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          margin-left: 10px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          h4 {
            font-size: 15px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            font-style: normal;
            color: white;
          }
        }
      }
    }
    .nav-links3 {
      width: 100%;
      margin-top: 50px;
      h2 {
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.3em;
        font-weight: 500;
        font-size: 10px;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        margin-bottom: 10px;
        margin-left: 15px;
      }
      .link-1 {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
        h3 {
          font-size: 18px;
          font-family: "Raleway", sans-serif;
          font-weight: 300;
          margin-left: 30px;
          font-style: normal;
          color: white;
        }
      }
    }
  }
  @media only screen and (max-width: 1100px) {
    height: auto;
    width: 100vw;
    display: flex;
    z-index: 50;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-direction: column;
    .navbar {
      height: 90px;
      width: 100vw;
      flex-direction: row;
      .utilities {
        height: 100%;
        width: 60%;
        display: flex;
        flex-direction: row;
        .utilities-item {
          height: 100%;
          width: 70px;
          .icon {
            width: 30px;
            height: 30px;
            color: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
          }
          h4 {
            display: none;
          }
        }
      }
      .user {
        height: 100%;
        width: 40%;
        display: flex;
        flex-direction: row;
        .user-item {
          height: 100%;
          width: 70px;
          padding-left: 3px;
          padding-right: 3px;
          .icon {
            width: 30px;
            height: 30px;
            color: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
          }
          h4 {
            display: none;
          }
        }
      }
    }
    .navbar-especific {
      display: none;
    }
    .navbar-especific-phone {
      width: 100vw;
      height: 100vh;
      padding-bottom: 100px !important;
      overflow: scroll;
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      display: flex;
      flex-direction: column;
      .navbar-title {
        display: flex;
        align-items: center;
        height: 100px;
        border-bottom: 1px solid
          ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        h2 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          margin-left: 20px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          width: 100%;
        }
      }
      .nav-links {
        width: 100%;
        margin-top: 40px;
        .link-1 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 18px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            margin-left: 30px;
            font-style: normal;
            color: white;
          }

          .counter {
            width: auto;
            background: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
            margin-left: 10px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            h4 {
              font-size: 15px;
              font-family: "Raleway", sans-serif;
              font-weight: 300;
              font-style: normal;
              color: white;
            }
          }
        }
      }
      .nav-links2 {
        width: 100%;
        margin-top: 50px;
        h2 {
          margin-bottom: 10px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.3em;
          font-weight: 500;
          font-size: 10px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.thirdColor : "#2f2519"};
          text-transform: uppercase;
          margin-left: 15px;
        }
        .link-1 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 18px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            margin-left: 30px;
            font-style: normal;
            color: white;
          }

          .counter {
            width: auto;
            background: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
            margin-left: 10px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            h4 {
              font-size: 15px;
              font-family: "Raleway", sans-serif;
              font-weight: 300;
              font-style: normal;
              color: white;
            }
          }
        }
      }
      .nav-links3 {
        width: 100%;
        margin-top: 50px;
        h2 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.3em;
          font-weight: 500;
          font-size: 10px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.thirdColor : "#2f2519"};
          text-transform: uppercase;
          margin-bottom: 10px;
          margin-left: 15px;
        }
        .link-1 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 18px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            margin-left: 30px;
            font-style: normal;
            color: white;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 400px) {
    height: auto;
    width: 100vw;
    display: flex;
    z-index: 50;
    flex-direction: column;
    .navbar {
      height: 90px;
      width: 100vw;
      flex-direction: row;
      .utilities {
        height: 100%;
        width: 70%;
        display: flex;
        flex-direction: row;

        .utilities-item {
          height: 100%;
          width: 70px;
          .icon {
            width: 30px;
            height: 30px;
            color: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
          }
          h4 {
            display: none;
          }
        }
      }
      .user {
        height: 100%;
        width: 30%;
        display: flex;
        flex-direction: row;
        .user-item {
          height: 100%;
          width: 70px;
          padding-left: 3px;
          padding-right: 3px;
          .icon {
            width: 30px;
            height: 30px;
            color: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
          }
          h4 {
            display: none;
          }
        }
      }
    }
    .navbar-especific {
      display: none;
    }
    .navbar-especific-phone {
      padding-bottom: 100px !important;
      overflow: scroll;
      width: 100%;
      height: 100vh;
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      display: flex;
      flex-direction: column;
      .navbar-title {
        display: flex;
        align-items: center;
        height: 100px;
        border-bottom: 1px solid
          ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        h2 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          margin-left: 20px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          width: 100%;
        }
      }
      .nav-links {
        width: 100%;
        margin-top: 40px;
        .link-1 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 18px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            margin-left: 30px;
            font-style: normal;
            color: white;
          }

          .counter {
            width: auto;
            background: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
            margin-left: 10px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            h4 {
              font-size: 15px;
              font-family: "Raleway", sans-serif;
              font-weight: 300;
              font-style: normal;
              color: white;
            }
          }
        }
      }
      .nav-links2 {
        width: 100%;
        margin-top: 50px;
        h2 {
          margin-bottom: 10px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.3em;
          font-weight: 500;
          font-size: 10px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.thirdColor : "#2f2519"};
          text-transform: uppercase;
          margin-left: 15px;
        }
        .link-1 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 18px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            margin-left: 30px;
            font-style: normal;
            color: white;
          }

          .counter {
            width: auto;
            background: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"};
            margin-left: 10px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            h4 {
              font-size: 15px;
              font-family: "Raleway", sans-serif;
              font-weight: 300;
              font-style: normal;
              color: white;
            }
          }
        }
      }
      .nav-links3 {
        width: 100%;
        margin-top: 50px;
        h2 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.3em;
          font-weight: 500;
          font-size: 10px;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.thirdColor : "#2f2519"};
          text-transform: uppercase;
          margin-bottom: 10px;
          margin-left: 15px;
        }
        .link-1 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 18px;
            font-family: "Raleway", sans-serif;
            font-weight: 300;
            margin-left: 30px;
            font-style: normal;
            color: white;
          }
        }
      }
    }
  }
`;
