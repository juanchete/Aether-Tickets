import React, { useState, useContext, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import TicketCard from "../../components/cards/UserCard";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../CreateContext";

export default function TicketsByStatus({ filter, logo, theme }) {
  const { user, setUser } = useContext(UserContext);
  const firebase = useFirebaseApp();
  const [tickets, setTickets] = useState();
  const [asesor, setAsesor] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    console.log(lastWeek);
    if (user) {
      setLoading(true);
      const db = firebase.firestore();
      let docRef = db.collection("asesores").doc(user.id);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            db.collection("tickets")
              .where("asesor", "==", user.id)
              .orderBy("createdAt", "desc")
              .onSnapshot((snapshot) => {
                let ticketData = [];
                snapshot.forEach((doc) =>
                  ticketData.push({ ...doc.data(), id: doc.id })
                );
                ticketData = ticketData.filter(function (el) {
                  return el.status != "Solved" && el.status != "Unsolved";
                });
                setTickets(ticketData);
                console.log(ticketData);
                setLoading(false);
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [filter]);

  return (
    <>
      <HomeStyle open={open} theme={theme}>
        <SidebarAdmin
          logo={logo}
          ticket={true}
          open={open}
          handleOpen={handleOpen}
          theme={theme}
        />
        <div className="home-view">
          <div className="home-view-title">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h2>Last </h2>
              <h1>week's</h1>
            </div>
          </div>

          <ul className="labels">
            <li className="label-1">
              <h2>Requester</h2>
            </li>
            <li className="label">
              <h2>Subject</h2>
            </li>
            <li className="label">
              <h2>Assigned To</h2>
            </li>
            <li className="label">
              <h2>Priority</h2>
            </li>
            <li className="label-1">
              <h2>Status</h2>
            </li>
            <li className="label-1">
              <h2>Created At</h2>
            </li>

            <li className="label-2"></li>
          </ul>
          <div className="content">
            {!loading ? (
              <>
                {tickets.map((ticket) => (
                  <TicketCard theme={theme} key={ticket.id} ticket={ticket} />
                ))}
              </>
            ) : (
              <div className="PageLoading">
                <Spinner color={theme ? theme.primaryCColor : "#ff4301"} />
              </div>
            )}
          </div>
        </div>
      </HomeStyle>
    </>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  .home-view {
    width: 70%;
    margin-left: 30%;
    .PageLoading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
      width: 100%;
      margin-top: 140px;
    }
    .content {
      width: 100%;
      height: auto;
      margin-top: 120px;
    }
    .home-view-title {
      width: 70%;
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 80px;
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryCColor : "#ff4301"};
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }

    .labels {
      width: 70vw;
      height: 40px;
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      display: flex;
      position: fixed;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      margin-top: 80px;
      background: white;

      .label {
        width: 15%;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.thirdColor : "#2f2519"};
          text-transform: uppercase;
          margin-right: 5px;
        }
      }
      .label-1 {
        width: 15%;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.thirdColor : "#2f2519"};
          text-transform: uppercase;
          margin-right: 5px;
        }
      }
      .label-2 {
        width: 10%;
      }
    }
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    .home-view {
      width: 100%;
      margin-left: 0;
      .PageLoading {
        margin-top: 250px;
      }
      .content {
        width: 100%;
        height: auto;
        margin-top: 210px;
      }
      .home-view-title {
        height: 80px;
        margin-top: 90px;
        width: 100%;
      }
      .labels {
        margin-top: 170px;
        width: 100vw;
        .label {
          width: 33.333%;
        }
        .label-1 {
          display: none;
        }
      }
    }
  }
`;
