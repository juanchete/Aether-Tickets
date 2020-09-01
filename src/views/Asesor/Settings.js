import React, { useState, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import UserCard from "../../components/cards/ClientReportCard";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Spinner from "../../components/Spinner";

export default function Settings({ theme }) {
  const firebase = useFirebaseApp();
  const [asesores, setAsesores] = useState();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  const logout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return (
      db
        .collection("asesores")
        // .where("role", "==", "asesor")
        .orderBy("name", "desc")
        .onSnapshot((snapshot) => {
          const asesoresData = [];
          snapshot.forEach((doc) =>
            asesoresData.push({ ...doc.data(), id: doc.id })
          );
          console.log(asesoresData); // <------
          setAsesores(asesoresData);
          setLoading(false);
        })
    );
  }, []);

  const user = useUser();
  return (
    <HomeStyle theme={theme}>
      <SidebarAdmin setting={true} theme={theme} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>Settings</h2>
          </div>
        </div>

        <div className="content">
          <h2>Color Scheme</h2>
          <div className="content-color">
            <div className="content-color-item-grey"></div>
            <div className="content-color-item-orange"></div>
            <div className="content-color-item-brown"></div>
            <div className="content-color-item-yellow"></div>
            <div className="content-color-item-blue"></div>
            <div className="content-color-item-blue-1"></div>
            <div className="content-color-item-purple"></div>
            <div className="content-color-item-purple-1"></div>
            <div className="content-color-item-pink"></div>
            <div className="content-color-item-pink-1"></div>
            <div className="content-color-item-green"></div>
            <div className="content-color-item-green-1"></div>
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
    .PageLoading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
      width: 100%;
      margin-top: 200px;
    }
    .content {
      width: 100%;
      height: auto;
      margin-top: 80px;
      padding: 20px;

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
      }

      .content-color {
        width: 100%;
        height: auto;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        .content-color-item-orange {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(250, 125, 9);
          background: linear-gradient(
            135deg,
            rgba(250, 125, 9, 1) 50%,
            rgba(255, 67, 1, 1) 50%
          );
        }

        .content-color-item-brown {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(246, 182, 30);
          background: linear-gradient(
            135deg,
            rgba(246, 182, 30, 1) 50%,
            rgba(255, 235, 175, 1) 50%
          );
        }

        .content-color-item-yellow {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(246, 201, 14);
          background: linear-gradient(
            135deg,
            rgba(246, 201, 14, 1) 50%,
            rgba(238, 238, 238, 1) 50%
          );
        }

        .content-color-item-blue {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(50, 130, 184);
          background: linear-gradient(
            135deg,
            rgba(50, 130, 184, 1) 50%,
            rgba(187, 225, 250, 1) 50%
          );
        }
        .content-color-item-blue-1 {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(95, 133, 219);
          background: linear-gradient(
            135deg,
            rgba(95, 133, 219, 1) 50%,
            rgba(144, 184, 248, 1) 50%
          );
        }
        .content-color-item-purple {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(92, 84, 112);
          background: linear-gradient(
            135deg,
            rgba(92, 84, 112, 1) 50%,
            rgba(219, 216, 227, 1) 50%
          );
        }
        .content-color-item-purple-1 {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(130, 115, 151);
          background: linear-gradient(
            135deg,
            rgba(130, 115, 151, 1) 50%,
            rgba(216, 185, 195, 1) 50%
          );
        }
        .content-color-item-grey {
          width: 50px;
          cursor: pointer;
          height: 50px;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(214, 224, 240);
          background: linear-gradient(
            135deg,
            rgba(214, 224, 240, 1) 50%,
            rgba(57, 59, 68, 1) 50%
          );
        }
        .content-color-item-pink {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(141, 98, 98);
          background: linear-gradient(
            135deg,
            rgba(141, 98, 98, 1) 50%,
            rgba(237, 141, 141, 1) 50%
          );
        }
        .content-color-item-pink-1 {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(217, 173, 173);
          background: linear-gradient(
            135deg,
            rgba(217, 173, 173, 1) 50%,
            rgba(252, 203, 203, 1) 50%
          );
        }
        .content-color-item-green {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(167, 209, 41);
          background: linear-gradient(
            135deg,
            rgba(167, 209, 41, 1) 50%,
            rgba(248, 238, 180, 1) 50%
          );
        }
        .content-color-item-green-1 {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(186, 199, 167);
          background: linear-gradient(
            135deg,
            rgba(186, 199, 167, 1) 50%,
            rgba(229, 228, 204, 1) 50%
          );
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
        margin-top: 260px;
      }
      .home-view-title {
        height: 80px;
        margin-top: 90px;
        width: 100%;
      }
    }
  }
`;
