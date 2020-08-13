import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useUser, useFirebaseApp } from "reactfire";
import { FaTicketAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { UserContext } from "../../CreateContext";
import Cookies from 'js-cookie'
import { Redirect } from "react-router";



export default function SidebarUser({ ticket }) {

  const {user, setUser} = useContext(UserContext)

  const [tickets, setTickets] = React.useState(ticket ? true : false);
  const [settings, setSettings] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [log, setLog] = React.useState(user);

  useEffect(() => {
    setLog(user)
  }, [user])


  const firebase = useFirebaseApp();

  const renderRedirect = () => {
    if (flag) {
      return <Redirect to='/login' />
    }
  }


  const logout = async () => {
    try {

      await firebase.auth().signOut()

      setUser({})

      Cookies.remove('user')


      setFlag(true)
      
          
      } catch (error) {
          console.log(error);
      }
  };

  return (
    
    <Sidebar>
     {renderRedirect()} 
      <div className="navbar">
        <ul className="utilities">
          <li className="utilities-item"></li>
          <li
            className="utilities-item"
            onClick={(event) => {
              setSettings(false);
              setCurrentUser(false);
              setTickets(true);
              setOpen(!open);
            }}
          >
            <FaTicketAlt className="icon" />
            <h4>Tickets</h4>
          </li>
        </ul>
        <ul className="user">
          <li className="user-item"
              onClick={(event) => {
                setCurrentUser(false);
                setTickets(false);
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
              setSettings(false);
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
            <div className="nav-links">
              <button className="link-1">
                <h3>New Ticket</h3>
              </button>
            </div>
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
      {settings ? (
        <>
          <div className="navbar-especific">
            <div className="navbar-title">
              <h2>Settings</h2>
            </div>
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
      {currentUser ? (
        <>
          <div className="navbar-especific">
            <div className="navbar-title">
              <h2>Usuarioss</h2>
            </div>
            { log  ? (

            <ul className="nav-links2">
               <li className="link-1"
                 onClick={(event) => {
                 logout();
                  }}>
                <h3>Log Out</h3>
              </li>
            </ul>

            ) : (
              <ul className="nav-links2">
               <li className="link-1"
                 onClick={(event) => {
                  setFlag(true)
                  }}>
                <h3>Iniciar Sesion</h3>
              </li>
            </ul>

            ) }
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
      
    </Sidebar>
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
          color: #ff4301;
        }
        h4 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-size: 7px;
          font-style: normal;
          color: #ff4301;
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
          color: #ff4301;
        }
        h4 {
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-size: 7px;
          font-style: normal;
          color: #ff4301;
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
        color: #ff4301;
        text-transform: uppercase;
        width: 100%;
      }
    }
    .nav-links {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .link-1 {
        margin-top: 10px;
        margin-bottom: 20px;
        margin-right: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: auto;
        border: 2px solid #ff4301;
        border-radius: 5px;
        height: 40px;
        padding-left: 5px;
        padding-right: 5px;
        h3 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #ff4301;
          text-transform: uppercase;
          width: 100%;
          margin-right: 5px;
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
          background: #ff4301;
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
  @media only screen and (max-width: 1100px) {
    height: auto;
    width: 100vw;
    display: flex;
    z-index: 50;
    overflow-x: hidden;
    flex-direction: column;
    .navbar {
      height: 90px;
      width: 100%;
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
            color: #ff4301;
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
            color: #ff4301;
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
          color: #ff4301;
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
            background: #ff4301;
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
            background: #ff4301;
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
        width: 70vw;
        display: flex;
        flex-direction: row;

        .utilities-item {
          height: 100%;
          width: 70px;
          .icon {
            width: 30px;
            height: 30px;
            color: #ff4301;
          }
          h4 {
            display: none;
          }
        }
      }
      .user {
        height: 100%;
        width: 30vw;
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
            color: #ff4301;
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
          color: #ff4301;
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
            background: #ff4301;
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
            background: #ff4301;
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
