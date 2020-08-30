import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser, useFirebaseApp } from "reactfire";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import moment from "moment";

export default function AdmonishedCard({ color, color2, usuario, filter }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [ticketsFiltered, setTickets] = useState();
  const [asesor, setAsesor] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const db = firebaseReact.firestore();
    if (usuario.asesor != null) {
      let docRef = db.collection("asesores").doc(usuario.asesor);
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          let name = {
            name: doc.data().name,
            lastName: doc.data().lastName,
            email: doc.data().email,
            id: usuario.asesor,
          };
          setAsesor(name);
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    }
  }, []);
  const changeAdmonished = async (value) => {
    try {
      await db.collection("tickets-not-answered").doc(usuario.id).update({
        amonestado: value,
      });
    } catch (error) {}
  };
  return (
    <>
      {!loading ? (
        <Card color={color} color2={color2}>
          <ul className="ticket-view">
            <li className="data">
              <h2>{asesor.name}</h2>
            </li>
            <li className="data">
              <h2>{asesor.lastName}</h2>
            </li>
            <li className="data-1">
              <h2>{asesor.email}</h2>
            </li>
            <li className="data-1">
              <h2 style={{ color: "#fa7d09" }}>
                {usuario.ticket.substring(0, 7)}
              </h2>
            </li>
            <li className="data-1">
              <h2>
                {moment(usuario.date.toDate()).format("DD/MM/yyyy").toString()}
              </h2>
            </li>
            <li className="data-2">
              {usuario.amonestado ? (
                <IoIosCheckmarkCircle
                  onClick={() => {
                    changeAdmonished(false);
                  }}
                  className="icon"
                />
              ) : (
                <IoIosCloseCircle
                  onClick={() => {
                    changeAdmonished(true);
                  }}
                  className="icon"
                />
              )}
            </li>
          </ul>
        </Card>
      ) : null}
    </>
  );
}
const Card = styled.div`
  .ticket-view {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #2f2519;
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
      .icon {
        width: 25px;
        height: 25px;
        color: #fa7d09;
      }
    }
    .data {
      width: 16.66%;

      h2 {
        font-size: 14px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: #2f2519;
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
      width: 16.66%;

      h2 {
        font-size: 14px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: #2f2519;
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
