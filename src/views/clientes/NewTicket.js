import React from "react";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";

export default function NewTicket() {
  const firebase = useFirebaseApp();

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const user = useUser();
  return (
    <HomeStyle>
      <SidebarUser />
      {/* <h1>Bienvenidos al oasis Bienvenidos</h1>
      <button onClick={logout}> Log Out </button> */}
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>All</h2>
            <h1>Tickets</h1>
          </div>
        </div>
      </div>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  .home-view {
    width: 100%;

    .home-view-title {
      width: 100%;
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
