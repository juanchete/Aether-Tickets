import React from "react";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import TicketCard from "../../components/cards/TicketCard";

export default function Home() {
  const firebase = useFirebaseApp();

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const user = useUser();
  return (
    <HomeStyle>
      <SidebarAdmin />
      {/* <h1>Bienvenidos al oasis Bienvenidos</h1>
      <button onClick={logout}> Log Out </button> */}
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>All</h2>
            <h1>Tickets</h1>
          </div>
        </div>
        <div className="filters">
          <button className="add-filter">
            <h2>Add Filter</h2>
          </button>
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
            <h2>Last Message</h2>
          </li>
        </ul>

        <TicketCard />
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
      height: 10%;
      background: #4a3f35;
      border-bottom: 1px solid #2f2519;
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: #3a343c;
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: #fa7d09;
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }

    .filters {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #2f2519;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .add-filter {
        border: 2px solid #fa7d09;
        border-radius: 5px;
        height: 40px;
        margin-left: 10px;
        padding-left: 5px;
        padding-right: 5px;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #fa7d09;
          text-transform: uppercase;
          width: 100%;
          margin-right: 5px;
        }
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
