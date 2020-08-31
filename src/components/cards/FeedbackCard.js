import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import Tags from "../Tags";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { MdStar } from "react-icons/md";

export default function FeedbackCard({ color, color2, feedback }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [suggestions, setSuggestions] = useState();
  const [usuario, setUsuario] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const db = firebase.firestore();

    let docRef = db.collection("usuarios").doc(feedback.usuario);
    docRef.get().then(function (doc) {
      setUsuario(doc.data());
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading && usuario ? (
        <Card color={color} color2={color2}>
          <>
            <div className="card-title">
              <h2>
                {usuario.name} {usuario.lastName}
              </h2>
            </div>
            <ul className="card-content">
              <li className="card-content-item">
                {[...Array(feedback.rating)].map((star, i) => {
                  const ratingValue = i + 1;

                  return (
                    <div style={{ color: "#fa7d09" }}>
                      <MdStar className="star" size="30px" />
                    </div>
                  );
                })}
              </li>
              <li className="card-content-item-text">
                <h2>Ticket</h2>
                <h3 style={{ color: "#fa7d09" }}>{feedback.ticket}</h3>
              </li>
              <li className="card-content-item-text">
                <h2>Comment</h2>
                <h3>{feedback.comment}</h3>
              </li>
            </ul>
          </>
        </Card>
      ) : null}
    </>
  );
}
const Card = styled.div`
  width: 330px;
  height: 220px;
  background: ${(props) => (props.color ? props.color : "#2f2519")};
  margin: 10px;
  border: 1px solid ${(props) => (props.color ? props.color : "#2f2519")};
  border-radius: 5px;

  .card-title {
    width: 100%;
    height: 40px;
    background: ${(props) => (props.color ? props.color : "#2f2519")};
    display: flex;
    align-items: flex-end;

    .icon {
      width: 20px;
      height: 20px;
      color: #fa7d09;
    }

    h2 {
      font-size: 15px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 600;
      font-style: normal;
      color: #4a3f35;
      text-transform: uppercase;
      margin-left: 10px;
    }
  }
  .card-content {
    width: 330px;
    height: 175px;
    padding: 10px;
    overflow-y: scroll;

    .card-content-item-text {
      width: 100%;
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align:justify;

      h2 {
        font-size: 13px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 600;
        font-style: normal;
        color: #4a3f35;
        text-transform: uppercase;
        margin-top: 10px;
      }

      h3 {
        font-size: 10px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 600;
        font-style: normal;
        color: #4a3f35;
        text-transform: uppercase;
        margin-top: 10px;
      }
    }
  }
  .card-content-item {
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .star {
      color: #ffa7d09 !important;
    }
    h2 {
      font-size: 10px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 600;
      font-style: normal;
      color: #4a3f35;
      text-transform: uppercase;
      margin-top: 10px;
    }

    h3 {
      font-size: 10px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 600;
      font-style: normal;
      color: #4a3f35;
      text-transform: uppercase;
      margin-top: 10px;
    }
  }
}
`;
