import React, { useEffect, useState } from "react";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import Tags from "../Tags";
import PopUp from "../PopUpUser";
import { BsThreeDots } from "react-icons/bs";
import { NavLink, withRouter } from "react-router-dom";
import moment from "moment";

export default function TicketCard({ color, color2, ticket, theme }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [ticketsFiltered, setTickets] = useState();
  const [loading, setLoading] = useState(true);
  const [asesor, setAsesor] = useState();
  let [path, setPath] = React.useState("/ticket/");
  useEffect(() => {
    if (ticket.asesor) {
      setLoading(true);
      let docRef = db.collection("asesores").doc(ticket.asesor);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setAsesor(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    setLoading(false);
  }, [ticket]);

  const prueba = () => {
    console.log(ticketsFiltered);
  };

  const getAsesor = async (ticket, id) => {
    const db = firebaseReact.firestore();
    let docRef = db.collection("asesores").doc(id);
    await docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        let name = {
          name: doc.data().name,
          lastName: doc.data().lastName,
          id: id,
        };
        setAsesor(name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };

  return (
    <>
      {!loading && ticket ? (
        <>
          <Card color={color} color2={color2} theme={theme}>
            <ul className="ticket-view">
              <NavLink className="data-1" to={path + ticket.id}>
                <h2>
                  {ticket.usuario.name} {ticket.usuario.lastName}
                </h2>
                <h3>{ticket.usuario.email}</h3>
              </NavLink>
              <NavLink className="data" to={path + ticket.id}>
                <h2>{ticket.subject}</h2>
              </NavLink>
              <NavLink className="data" to={path + ticket.id}>
                {ticket.asesor && asesor ? (
                  <h2>
                    {asesor.name} {asesor.lastName}
                  </h2>
                ) : (
                  <h2>Unnasigned</h2>
                )}
              </NavLink>
              <NavLink className="data" to={path + ticket.id}>
                <Tags title={ticket.priority} color="#EE220C" theme={theme} />
              </NavLink>
              <NavLink className="data-1" to={path + ticket.id}>
                <Tags title={ticket.status} color="#29E2F3" theme={theme} />
              </NavLink>
              <NavLink className="data-1" to={path + ticket.id}>
                <h2>
                  {" "}
                  {moment(ticket.createdAt.toDate())
                    .format("DD/MM/yyyy")
                    .toString()}
                </h2>
              </NavLink>
            </ul>
          </Card>
        </>
      ) : null}
    </>
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
    .data-2 {
      width: 16.66%;
      overflow: hidden;
      padding-left: 5px;
      padding-right: 5px;
    }
    .data {
      width: 16.66%;
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
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
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
          width: 100%;
        }
      }
    }
    .data-1 {
      width: 16.66%;
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
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
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
          width: 100%;
        }
      }
    }
  }
  @media only screen and (max-width: 1100px) {
    .data-1 {
      display: none;
    }
    .data {
      width: 33.333% !important;
    }
  }
`;
