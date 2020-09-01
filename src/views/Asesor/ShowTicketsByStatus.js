import React, { useState, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import TicketCard from "../../components/cards/TicketCard";

export default function TicketsByStatus({ filter, theme, logo }) {
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
    return db
      .collection("tickets")
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
  }, [filter]);

  const user = useUser();
  return (
    <HomeStyle theme={theme}>
      <SidebarAdmin logo={logo} ticket={true} theme={theme} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>{filter}</h2>
            <h1>Tickets</h1>
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
        </ul>
        {!loading ? (
          <>
            {tickets.map((ticket) => (
              <TicketCard
                theme={theme}
                ticket={ticket}
                color={theme ? theme.primaryColor : "#fa7d09"}
              />
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
          props.theme ? props.theme.primaryColor : "#fa7d09"};
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
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      margin-top: 80px;
      .label-2 {
        width: 10%;
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
      margin-left: 0;
      .PageLoading {
        margin-top: 300px;
      }
      .content {
        width: 100%;
        height: auto;
        margin-top: 100px;
      }
      .home-view-title {
        height: 80px;
        margin-top: 90px;
        width: 100%;
      }

      .labels {
        margin-top: 175px;
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
