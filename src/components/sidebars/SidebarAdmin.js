import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useUser, useFirebaseApp } from "reactfire";
import { FaTicketAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import AddCategory from "../../views/Asesor/AddCategory";
import AddSuggestion from "../../views/Asesor/AddSuggestion";
import { UserContext } from "../../CreateContext";
import Cookies from 'js-cookie'


export default function SidebarAdmin() {
  const [tickets, setTickets] = React.useState(true);
  const [asesors, setAsesors] = React.useState(false);
  const [categories, setCategories] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [categoryShow, setCategoryShow] = React.useState(false);
  const [suggestionShow, setSuggestionShow] = React.useState(false);
  const [reports, setReports] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const firebase = useFirebaseApp();

  
  const {user, setUser} = useContext(UserContext);

  const logout = async () => {
    try {

      await firebase.auth().signOut()

      setUser({})

      Cookies.remove('user')
      
          
      } catch (error) {
          console.log(error);
      }
  };

  const showCategory = (e) => {
    setCategoryShow(!categoryShow);
  };
  const showSuggestion = (e) => {
    setSuggestionShow(!suggestionShow);
  };

  return (
    <>
      <AddCategory show={categoryShow} showCategory={showCategory} />
      <AddSuggestion show={suggestionShow} showSuggestion={showSuggestion} />
      <Sidebar>
        <div className="navbar">
          <ul className="utilities">
            <li className="utilities-item"></li>
            <li
              className="utilities-item"
              onClick={(event) => {
                setAsesors(false);
                setCategories(false);
                setSettings(false);
                setCurrentUser(false);
                setTickets(true);
                setOpen(!open);
              }}
            >
              <FaTicketAlt className="icon" />
              <h4>Tickets</h4>
            </li>
            <li
              className="utilities-item"
              onClick={(event) => {
                setTickets(false);
                setCategories(false);
                setSettings(false);
                setCurrentUser(false);
                setAsesors(true);
                setOpen(!open);
              }}
            >
              <FaUsers className="icon" />
              <h4>Asesors</h4>
            </li>
            <li
              className="utilities-item"
              onClick={(event) => {
                setTickets(false);
                setAsesors(false);
                setSettings(false);
                setCurrentUser(false);
                setCategories(true);
                setOpen(!open);
              }}
            >
              <FaEdit className="icon" />
              <h4>Categories & Suggestions</h4>
            </li>
            <li className="utilities-item">
              <FaChartBar className="icon" />
              <h4>Reports</h4>
            </li>
          </ul>
          <ul className="user">
            <li className="user-item"
            onClick={(event) => {
              setTickets(false);
              setAsesors(false);
              setCurrentUser(false);
              setCategories(false);
              setSettings(true);
              setOpen(!open);
            }}>
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
                setCurrentUser(true);
                setOpen(!open);
              }}
              
            >
              <FaUserAlt className="icon" />
              <h4>Log Out</h4>
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
                <li className="link-1">
                  <h3>All Tickets</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
                <li className="link-1">
                  <h3>Tickets to Handle</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
              </ul>
              <ul className="nav-links2">
                <h2>My Tickets</h2>
                <li className="link-1">
                  <h3>My Open Tickets</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
                <li className="link-1">
                  <h3>My tickets in the last week</h3>
                </li>
              </ul>
              <ul className="nav-links3">
                <h2>Statuses</h2>
                <li className="link-1">
                  <h3>Open</h3>
                </li>
                <li className="link-1">
                  <h3>Solved</h3>
                </li>
                <li className="link-1">
                  <h3>Pending</h3>
                </li>
                <li className="link-1">
                  <h3>Unsolved</h3>
                </li>
              </ul>
            </div>
            {open ? (
              <div className="navbar-especific-phone">
                <div className="navbar-title">
                  <h2>Tickets</h2>
                </div>
                <ul className="nav-links">
                  <li className="link-1">
                    <h3>All Tickets</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
                  <li className="link-1">
                    <h3>Tickets to Handle</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
                </ul>
                <ul className="nav-links2">
                  <h2>My Tickets</h2>
                  <li className="link-1">
                    <h3>My Open Tickets</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
                  <li className="link-1">
                    <h3>My tickets in the last week</h3>
                  </li>
                </ul>
                <ul className="nav-links3">
                  <h2>Statuses</h2>
                  <li className="link-1">
                    <h3>Open</h3>
                  </li>
                  <li className="link-1">
                    <h3>Solved</h3>
                  </li>
                  <li className="link-1">
                    <h3>Pending</h3>
                  </li>
                  <li className="link-1">
                    <h3>Unsolved</h3>
                  </li>
                </ul>
              </div>
            ) : null}
          </>
        ) : null}
        {asesors ? (
          <>
            <div className="navbar-especific">
              <div className="navbar-title">
                <h2>Asesors</h2>
              </div>
              <ul className="nav-links">
                <li className="link-1">
                  <h3>All Asesors</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
              </ul>
            </div>
            {open ? (
              <div className="navbar-especific-phone">
                <div className="navbar-title">
                  <h2>Asesors</h2>
                </div>
                <ul className="nav-links">
                  <li className="link-1">
                    <h3>All Asesors</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
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
                <li className="link-1">
                  <h3>All Categories</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
                <li className="link-1">
                  <h3>All Suggestions</h3>
                  <div className="counter">
                    <h4>4</h4>
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
            {open ? (
              <div className="navbar-especific-phone">
                <div className="navbar-title">
                  <h2>Categories & Suggestions</h2>
                </div>
                <ul className="nav-links">
                  <li className="link-1">
                    <h3>All Categories</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
                  <li className="link-1">
                    <h3>All Suggestions</h3>
                    <div className="counter">
                      <h4>4</h4>
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
        {settings ? (
          <>
            <div className="navbar-especific">
              <div className="navbar-title">
                <h2>Settings</h2>
              </div>
              <ul className="nav-links">
                <li className="link-1">
                  <h3>Log Out</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
              </ul>
            </div>
            {open ? (
              <div className="navbar-especific-phone">
                <div className="navbar-title">
                  <h2>Asesors</h2>
                </div>
                <ul className="nav-links">
                  <li className="link-1">
                    <h3>All Asesors</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
          </>
        ) : null}
        {currentUser ? (
          <>
            <div className="navbar-especific">
              <div className="navbar-title">
                <h2>Hola {user.name}</h2>
              </div>
              <ul className="nav-links">
                <li className="link-1">
                  <h3>All Asesors</h3>
                  <div className="counter">
                    <h4>4</h4>
                  </div>
                </li>
              </ul>
            </div>
            {open ? (
              <div className="navbar-especific-phone">
                <div className="navbar-title">
                  <h2>Asesors</h2>
                </div>
                <ul className="nav-links">
                  <li className="link-1">
                    <h3>All Asesors</h3>
                    <div className="counter">
                      <h4>4</h4>
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
          </>
        ) : null}
      </Sidebar>
    </>
  );
}
const Sidebar = styled.div`
  height: 100vh;
  width: 30%;
  display: flex;
  flex-direction: row;
  position: fixed;
  .navbar {
    height: 100%;
    width: 20%;
    background: #2f2519;
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
          background: #4a3f35;
        }
        .icon {
          width: 30px;
          height: 30px;
          color: #fa7d09;
        }
        h4 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-size: 7px;
          font-style: normal;
          color: #fa7d09;
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
          background: #4a3f35;
        }
        .icon {
          width: 30px;
          height: 30px;
          color: #fa7d09;
        }
        h4 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-size: 7px;
          font-style: normal;
          color: #fa7d09;
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
    background: #4a3f35;
    display: flex;
    flex-direction: column;
    .navbar-title {
      width: 80%;
      position: fixed;
      display: flex;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #2f2519;
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        margin-left: 20px;
        font-style: normal;
        color: #fa7d09;
        display: flex;
        align-self: center;
        text-transform: uppercase;
        width: 100%;
      }
    }
    .nav-links {
      width: 100%;
      margin-top: 120px;
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
          background: #fa7d09;
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
        color: #2f2519;
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
          background: #fa7d09;
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
        color: #2f2519;
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
            color: #fa7d09;
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
            color: #fa7d09;
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
      width: 100%;
      height: 100%;
      background: #4a3f35;
      display: flex;
      flex-direction: column;
      .navbar-title {
        display: flex;
        align-items: center;
        height: 100px;
        border-bottom: 1px solid #2f2519;
        h2 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          margin-left: 20px;
          font-style: normal;
          color: #fa7d09;
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
            background: #fa7d09;
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
          color: #2f2519;
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
            background: #fa7d09;
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
          color: #2f2519;
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
            color: #fa7d09;
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
            color: #fa7d09;
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
      width: 100%;
      height: 100%;
      background: #4a3f35;
      display: flex;
      flex-direction: column;
      .navbar-title {
        display: flex;
        align-items: center;
        height: 100px;
        border-bottom: 1px solid #2f2519;
        h2 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          margin-left: 20px;
          font-style: normal;
          color: #fa7d09;
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
            background: #fa7d09;
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
          color: #2f2519;
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
            background: #fa7d09;
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
          color: #2f2519;
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
