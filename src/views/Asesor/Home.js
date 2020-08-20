import React, { useState, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { UserContext } from "../../CreateContext";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import TicketCard from "../../components/cards/TicketCard";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Home() {
  const firebase = useFirebaseApp();
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [subSOpen, setSubSOpen] = useState(false);
  const [subPOpen, setSubPOpen] = useState(false);
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  const logout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return db
      .collection("tickets")
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
  }, []);
  const setFilter2 = (filterP, filterS) => {
    setLoading(true);
    const db = firebase.firestore();
    return db
      .collection("tickets")
      .where("priority", "==", filterP)
      .where("status", "==", filterS)
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
  };

  const setFilter1 = (tipo, filter) => {
    if (tipo === "status" && filter) {
      console.log("Entre  Statys");
      setLoading(true);
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
    } else if (tipo === "priority" && filter) {
      console.log("Entre  Prios");
      setLoading(true);
      const db = firebase.firestore();
      return db
        .collection("tickets")
        .where("priority", "==", filter)
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
    } else if (tipo === null && filter === null) {
      setLoading(true);
      const db = firebase.firestore();
      return db
        .collection("tickets")
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
    }
  };

  const setFilter = (tipo, filter) => {
    if (!filterPriority && !filterStatus && tipo === "status") {
      setFilter1("status", filter);
    } else if (
      !filterPriority &&
      !filterStatus &&
      tipo === "priority" &&
      filter
    ) {
      setFilter1("priority", filter);
    } else if (
      filterPriority &&
      filterStatus &&
      tipo === "priority" &&
      filter
    ) {
      setFilter2(filter, filterStatus);
    } else if (filterPriority && filterStatus && tipo === "status" && filter) {
      setFilter2(filterPriority, filter);
    } else if (
      filterPriority &&
      !filterStatus &&
      tipo === "priority" &&
      filter
    ) {
      setFilter1(tipo, filter);
    } else if (filterPriority && !filterStatus && tipo === "status" && filter) {
      console.log("4", tipo, filter);
      setFilter2(filterPriority, filter);
    } else if (
      !filterPriority &&
      filterStatus &&
      tipo === "priority" &&
      filter
    ) {
      setFilter2(filter, filterStatus);
    } else if (!filterPriority && filterStatus && tipo === "status" && filter) {
      setFilter1(tipo, filter);
    } else if (tipo === "status" && filter === null && filterPriority) {
      setFilter1("priority", filterPriority);
    } else if (tipo === "status" && filter === null && !filterPriority) {
      setFilter1(null, null);
    } else if (tipo === "priority" && filter === null && filterStatus) {
      setFilter1("status", filterStatus);
    } else if (tipo === "priority" && filter === null && !filterStatus) {
      setFilter1(null, null);
    }
  };
  const user = useUser();
  return (
    <HomeStyle filter={filterOpen} sub={subSOpen} subP={subPOpen}>
      <SidebarAdmin ticket={true} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>All</h2>
            <h1>Tickets</h1>
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
          {filterPriority ? (
            <div
              className="filter-applied"
              onClick={() => {
                setFilterPriority(null);
                setFilter("priority", null);
              }}
            >
              <IoIosCheckmarkCircle className="icon-check" />
              <IoIosCloseCircle className="icon" />
              <h2>{filterPriority}</h2>
            </div>
          ) : null}
          {filterStatus ? (
            <div
              className="filter-applied"
              onClick={() => {
                setFilterStatus(null);
                setFilter("status", null);
              }}
            >
              <IoIosCheckmarkCircle className="icon-check" />
              <IoIosCloseCircle className="icon" />
              <h2>{filterStatus}</h2>
            </div>
          ) : null}
        </div>
        <ul className="filter-options">
          <li
            className="filter-options-item"
            onClick={() => {
              setSubPOpen(false);
              setSubSOpen(!subSOpen);
            }}
          >
            <h2>Status</h2>
          </li>
          <li
            className="filter-options-item"
            onClick={() => {
              setSubSOpen(false);
              setSubPOpen(!subSOpen);
            }}
          >
            <h2>Priority</h2>
          </li>
        </ul>
        <ul className="filter-sub">
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterStatus("Open");
              setFilter("status", "Open");
              setSubSOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Open</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterStatus("Solved");
              setFilter("status", "Solved");
              setSubSOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Solved</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterStatus("Pending");
              setFilter("status", "Pending");
              setSubSOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Pending</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterStatus("Closed");
              setFilter("status", "Closed");
              setSubSOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Closed</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterStatus("Unsolved");
              setFilter("status", "Open");
              setSubSOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Unsolved</h2>
          </li>
        </ul>
        <ul className="filter-sub-2">
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterPriority("Urgent");
              setFilter("priority", "Urgent");
              setSubPOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Urgent</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterPriority("High");
              setFilter("priority", "High");
              setSubPOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>High</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterPriority("Medium");
              setFilter("priority", "Medium");
              setSubPOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Medium</h2>
          </li>
          <li
            className="filter-sub-item"
            onClick={() => {
              setFilterPriority("Low");
              setFilter("priority", "Low");
              setSubPOpen(false);
              setFilterOpen(false);
            }}
          >
            <h2>Low</h2>
          </li>
        </ul>
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
          <li className="label-2"></li>
        </ul>
        <div className="content">
          {!loading ? (
            <>
              {tickets.map((ticket) => (
                <TicketCard ticket={ticket} />
              ))}
            </>
          ) : null}
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
      width: 100%;
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

      .label {
        width: 10.5%;
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
