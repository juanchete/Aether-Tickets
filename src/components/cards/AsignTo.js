import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { useParams } from "react-router";

export default function ClientsCard({
  color,
  color2,
  usuario,
  showFeedback,
  ticket,
  filter,
  theme,
}) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [ticketsFiltered, setTicket] = useState();
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {}, []);
  const asignTicket = async (value) => {
    console.log(id);

    try {
      await db
        .collection("tickets")
        .doc(id)
        .update({
          asesor: usuario.id,
          asesores: firebase.firestore.FieldValue.arrayUnion(usuario.id),
          asesorUpdate: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          var ref = db.collection("asesores").doc(usuario.id);
          ref.update({
            tickets: firebase.firestore.FieldValue.arrayUnion(id),
          });
          showFeedback();
        });
    } catch (error) {}
  };

  return (
    <Card color={color} color2={color2} theme={theme}>
      <ul className="ticket-view" onClick={asignTicket}>
        <li className="data">
          <h2>{usuario.name}</h2>
        </li>
        <li className="data">
          <h2>{usuario.lastName}</h2>
        </li>
        <li className="data-1">
          <h2 style={{ color: theme ? theme.primaryColor : "#fa7d09" }}>
            {usuario.email}
          </h2>
        </li>
      </ul>
    </Card>
  );
}
const Card = styled.div`
  .ticket-view {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid
      ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    list-style: none;
    &:hover {
      background: #ebebeb;
    }
    .data-2 {
      width: 10%;
      overflow: hidden;
      padding-left: 5px;
      padding-right: 5px;
      .icon {
        width: 25px;
        height: 25px;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
      }
    }
    .data {
      width: 25%;
      overflow: hidden;
      padding-left: 5px;
      padding-right: 5px;

      h2 {
        font-size: 14px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        width: 100%;
        margin-right: 5px;
      }
      h3 {
        font-size: 10px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.color ? props.color : "#ff4301")};
        width: 100%;
        margin-right: 5px;
      }
      .tag {
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding-left: 15px;
        padding-right: 10px;
        border: 2px solid #ee220c;
        border-radius: 20px;
        h2 {
          font-size: 10px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #ee220c;
          text-transform: uppercase;
        }
      }
    }
    .data-1 {
      width: 40%;
      overflow: hidden;
      padding-left: 5px;
      padding-right: 5px;

      h2 {
        font-size: 14px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        margin-right: 5px;
      }
      h3 {
        font-size: 10px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.color ? props.color : "#ff4301")};
        margin-right: 5px;
      }
      .tag {
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding-left: 15px;
        padding-right: 10px;
        border: 2px solid #ee220c;
        border-radius: 20px;
        h2 {
          font-size: 10px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #ee220c;
          text-transform: uppercase;
          width: 100%;
        }
      }
    }
  }
  @media only screen and (max-width: 1100px) {
  }
`;
