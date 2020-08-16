import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { UserContext } from "../CreateContext";
import { BsThreeDots } from "react-icons/bs";

export default function TicketCard({ color, color2, ticket }) {
  const firebaseReact = useFirebaseApp();
  const [user, setUser] = useContext(UserContext);
  const db = firebaseReact.firestore();
  const [ticketsFiltered, setTickets] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const assumeTicket = async () => {
    try {
      await db.collection("tickets").doc(ticket.id).update({
        asesor: "Valeskaa",
      });
    } catch (error) {}
  };

  return (
    <PopUp show={show}>
      {" "}
      <BsThreeDots
        className="icon"
        onClick={() => {
          setShow(!show);
        }}
      />
      <ul className="option">
        {!ticket.asesor ? (
          <li className="options-item" onClick={assumeTicket}>
            <h2>Assume Ticket</h2>
          </li>
        ) : null}
      </ul>
    </PopUp>
  );
}
const PopUp = styled.div`
  width: 100%;

  .icon {
    width: 20px;
    height: 20px;
    color: #2f2519;
    cursor: pointer;
    z-index: 3000;
  }
  .option {
    width: 120px;
    height: auto;
    background: pink;
    position: absolute;
    padding-top: 5px;
    padding-bottom: 5px;
    right: 10px;
    z-index: 50;
    background: white;
    margin-left: 10px;
    position: absolute;
    border: 1px solid white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    ${(props) => (props.show ? "" : "display:none;")}
    .options-item {
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
`;
