import React, { useState, useContext, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";
import TicketCard from "../../components/cards/UserCard";
import { UserContext } from "../../CreateContext";

export default function TicketsByStatus({ filter }) {
  const { user, setUser } = useContext(UserContext);
  const firebase = useFirebaseApp();
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  const logout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    setLoading(true);
    console.log(filter);
    const db = firebase.firestore();
    let docRef = db.collection("usuarios").doc(user.id);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let usuario = {
            email: doc.data().email,
            name: doc.data().name,
            lastName: doc.data().lastName,
            id: user.id,
          };
          db.collection("tickets")
            .where("usuario", "==", usuario)
            .where("status", "==", filter)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
              const ticketData = [];
              snapshot.forEach((doc) =>
                ticketData.push({ ...doc.data(), id: doc.id })
              );
              console.log(ticketData); // <------
              setTickets(ticketData);
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
  }, [filter]);

  return (
    <HomeStyle>
      <SidebarUser ticket={true} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>{filter}</h2>
            <h1>Tickets</h1>
          </div>
        </div>

        <ul className="labels">
          <li className="label">
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
          <li className="label">
            <h2>Status</h2>
          </li>
          <li className="label">
            <h2>Created At</h2>
          </li>
        </ul>
        {!loading ? (
          <>
            {tickets.map((ticket) => (
              <TicketCard ticket={ticket} />
            ))}
          </>
        ) : null}
      </div>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  .home-view {
    width: 70%;
    margin-left: 30%;

    .home-view-title {
      width: 70%;
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 80px;
      background: #4a3f35;
      border-bottom: 1px solid #2f2519;
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: #2f2519;
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: #ff4301;
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }

    .labels {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #2f2519;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      margin-top: 80px;

      .label {
        width: 16.66%;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #2f2519;
          text-transform: uppercase;
          width: 100%;
          margin-right: 5px;
        }
      }
    }
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    .home-view {
      width: 100%;

      .home-view-title {
        height: 80px;
      }
    }
  }
`;
