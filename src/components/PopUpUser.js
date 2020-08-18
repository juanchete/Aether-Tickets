import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { UserContext } from "../CreateContext";
import { BsThreeDots } from "react-icons/bs";
import Feedback from "../components/Feedback";

export default function TicketCard({ color, color2, ticket }) {
  const firebaseReact = useFirebaseApp();
  const { user, setUser } = useContext(UserContext);
  const db = firebaseReact.firestore();
  const [feedbackShow, setFeedbackShow] = useState(false);
  const [show, setShow] = useState(false);
  const [asesor, setAsesor] = useState();
  const [ticketFeed, setTicket] = useState(false);

  const showFeedback = (e) => {
    setFeedbackShow(!feedbackShow);
  };

  const closeTicket = async (e) => {
    e.preventDefault();
    console.log(ticket.asesores[ticket.asesores.length - 1]);
    if (ticket.asesores.length > 0) {
      let docRef = db
        .collection("asesores")
        .doc(ticket.asesores[ticket.asesores.length - 1]);
      await docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            const asesorLast = {
              id: doc.id,
              name: doc.data().name,
              lastName: doc.data().lastName,
            };
            setAsesor(asesorLast);
            setTicket(ticket.id);
            setShow(false);
            showFeedback(true);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }

    try {
      await db
        .collection("tickets")
        .doc(ticket.id)
        .update({
          status: "Solved",
        })
        .then(() => {
          showFeedback(true);
          setShow(false);
        });
    } catch (error) {}
  };

  return (
    <>
      {asesor && ticketFeed ? (
        <Feedback
          show={feedbackShow}
          showFeedback={showFeedback}
          asesor={asesor}
          ticket={ticketFeed}
        />
      ) : null}

      <PopUp show={show}>
        {" "}
        <BsThreeDots
          className="icon"
          onClick={() => {
            setShow(!show);
          }}
        />
        <ul className="option">
          {!ticket.status != "Solved" ? (
            <li className="options-item" onClick={closeTicket}>
              <h2>Ticket Solved</h2>
            </li>
          ) : null}
        </ul>
      </PopUp>
    </>
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
