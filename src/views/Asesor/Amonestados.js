import React, { useState, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import AdmonishedCard from "../../components/cards/Admonished";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Spinner from "../../components/Spinner";

export default function Amonestados() {
  const firebase = useFirebaseApp();
  const [filterAmonestado, setFilterAmonestado] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [subSOpen, setSubSOpen] = useState(false);
  const [subPOpen, setSubPOpen] = useState(false);
  const [usuarios, setUsuarios] = useState();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  const logout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return db
      .collection("tickets-not-answered")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const usuariosData = [];
        snapshot.forEach((doc) =>
          usuariosData.push({ ...doc.data(), id: doc.id })
        );
        console.log(usuariosData); // <------
        setUsuarios(usuariosData);
        setLoading(false);
      });
  }, []);

  const setFilter = (filter) => {
    if (filter != null) {
      setLoading(true);
      const db = firebase.firestore();
      return db
        .collection("tickets-not-answered")
        .where("amonestado", "==", filter)
        .onSnapshot((snapshot) => {
          const usuariosData = [];
          snapshot.forEach((doc) =>
            usuariosData.push({ ...doc.data(), id: doc.id })
          );
          console.log(usuariosData); // <------
          setUsuarios(usuariosData);
          setLoading(false);
        });
    } else {
      setLoading(true);
      const db = firebase.firestore();
      return db.collection("tickets-not-answered").onSnapshot((snapshot) => {
        const usuariosData = [];
        snapshot.forEach((doc) =>
          usuariosData.push({ ...doc.data(), id: doc.id })
        );
        console.log(usuariosData); // <------
        setUsuarios(usuariosData);
        setLoading(false);
      });
    }
  };

  const user = useUser();
  return (
    <HomeStyle filter={filterOpen} sub={subSOpen} subP={subPOpen}>
      <SidebarAdmin asesor={true} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>Admonished</h2>
            <h1>Asesors</h1>
          </div>
        </div>
        <div className="filters">
          <button
            className="add-filter"
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          >
            <h2>Add Filter</h2>
          </button>
          {filterAmonestado ? (
            <div
              className="filter-applied"
              onClick={() => {
                setFilterAmonestado(null);
                setFilter(null);
                setFilterOpen(false);
              }}
            >
              <IoIosCheckmarkCircle className="icon-check" />
              <IoIosCloseCircle className="icon" />
              <h2>{filterAmonestado}</h2>
            </div>
          ) : null}
        </div>
        <ul className="filter-options">
          <li
            className="filter-options-item"
            onClick={() => {
              setFilterAmonestado("Admonished");
              setFilter(true);
              setFilterOpen(false);
            }}
          >
            <h2>Admonished</h2>
          </li>
          <li
            className="filter-options-item"
            onClick={() => {
              setFilterAmonestado("Not Admonished");
              setFilter(false);
              setFilterOpen(false);
            }}
          >
            <h2>Not Admonished</h2>
          </li>
        </ul>
        <ul className="labels">
          <li className="label-1">
            <h2>Name</h2>
          </li>
          <li className="label-1">
            <h2>Last Name</h2>
          </li>
          <li className="label">
            <h2>Email</h2>
          </li>
          <li className="label">
            <h2>Ticket</h2>
          </li>
          <li className="label">
            <h2>Date</h2>
          </li>
          <li className="label">
            {" "}
            <h2>Admonished</h2>
          </li>
        </ul>
        <div className="content">
          {!loading ? (
            <>
              {usuarios.map((usuario) => (
                <AdmonishedCard usuario={usuario} />
              ))}
            </>
          ) : (
            <div className="PageLoading">
              <Spinner color="#fa7d09" />
            </div>
          )}
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
      margin-top: 170px;
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
        color: #fa7d09;
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }
    .filter-options {
      width: 120px;
      height: 80px;
      z-index: 50;
      background: white;
      margin-left: 10px;
      position: absolute;
      border: 1px solid white;
      border-radius: 5px;
      margin-top: 130px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      ${(props) => (props.filter ? "" : "display:none;")}
      .filter-options-item {
        width: 100%;
        height: 40px;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        align-items: center;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: #fa7d09;
          text-transform: uppercase;
          width: 100%;
          margin-left: 5px;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .filter-sub {
      width: 120px;
      height: 200px;
      z-index: 50;
      background: white;
      margin-left: 140px;
      position: absolute;
      border: 1px solid white;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      margin-top: 130px;
      ${(props) => (props.sub ? "" : "display:none;")}
      .filter-sub-item {
        width: 100%;
        height: 40px;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        align-items: center;
        h2 {
          font-size: 15px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: #fa7d09;
          text-transform: uppercase;
          width: 100%;
          margin-left: 5px;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .filter-sub-2 {
      width: 120px;
      height: 160px;
      z-index: 50;
      background: white;
      margin-left: 140px;
      position: absolute;
      border: 1px solid white;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      ${(props) => (props.subP ? "" : "display:none;")}
      .filter-sub-item {
        width: 100%;
        height: 40px;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        align-items: center;
        h2 {
          font-size: 15px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: #fa7d09;
          text-transform: uppercase;
          width: 100%;
          margin-left: 5px;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .filters {
      margin-top: 80px;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #2f2519;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: fixed;
      background: white;

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
      .filter-applied {
        border: 2px solid #fa7d09;
        border-radius: 5px;
        height: 40px;
        margin-left: 10px;
        padding-left: 5px;
        padding-right: 5px;
        background: #fa7d09;
        display: flex;
        flex-direction: row;
        align-items: center;

        &:hover {
          .icon {
            display: block;
          }
          .icon-check {
            display: none;
          }
        }

        .icon-check {
          color: #4a3f35;
          width: 30px;
          height: 30px;
        }
        .icon {
          display: none;
          color: #4a3f35;
          width: 30px;
          height: 30px;
        }
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #4a3f35;
          text-transform: uppercase;
          width: 100%;
          margin-left: 10px;
        }
      }
    }
    .labels {
      width: 70vw;
      height: 40px;
      border-bottom: 1px solid #2f2519;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      position: fixed;
      margin-top: 130px;
      background: white;
      .label-1 {
        width: 16.66%;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #2f2519;
          text-transform: uppercase;
          margin-right: 5px;
        }
      }
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
      .label-2 {
        width: 16.66%;
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
      .filters {
        margin-top: 170px;
      }
      .labels {
        margin-top: 220px;
        width: 100vw;
      }
    }
  }
`;
