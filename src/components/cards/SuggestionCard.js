import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";

export default function SuggestionCard({ color, color2, suggestion }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const db = firebaseReact.firestore();
    return db.collection("categories").onSnapshot((snapshot) => {
      const categoryData = [];
      snapshot.forEach((doc) => {
        if (doc.id === suggestion.category) {
          categoryData.push({ ...doc.data(), id: doc.id });
        }
      });
      setCategory(categoryData);
      setLoading(false);
    });
  }, []);

  const changeAvailable = async (value) => {
    try {
      await db.collection("suggestions").doc(suggestion.id).update({
        available: value,
      });
    } catch (error) {}
  };
  return (
    <>
      {!loading ? (
        <Card color={color} color2={color2}>
          <div className="card-title">
            <h2>{suggestion.name}</h2>
            <h3>{category[0].name}</h3>
            {suggestion.available ? (
              <AiFillMinusCircle
                onClick={() => {
                  changeAvailable(false);
                }}
                className="icon"
              />
            ) : (
              <IoIosAddCircle
                onClick={() => {
                  changeAvailable(true);
                }}
                className="icon"
              />
            )}
          </div>
          <div className="card-content">
            <h2>{suggestion.suggestion} </h2>
          </div>
        </Card>
      ) : null}
    </>
  );
}
const Card = styled.div`
  width: 260px;
  height: 220px;
  background: ${(props) => (props.color ? props.color : "#2f2519")};
  margin: 10px;
  border: 1px solid ${(props) => (props.color ? props.color : "#2f2519")};
  border-radius: 5px;

  .card-title {
    width: 100%;
    height: 80px;
    background: ${(props) => (props.color ? props.color : "#2f2519")};
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    .icon {
      width: 20px;
      height: 20px;
      color: #fa7d09;
    }

    h2 {
      font-size: 15px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 300;
      font-style: normal;
      color: ${(props) => (props.color2 ? props.color2 : "#fa7d09")};
      text-transform: uppercase;
      width: 100%;
      margin-right: 5px;
    }
    h3 {
      font-size: 12px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 300;
      font-style: normal;
      color: ${(props) => (props.color2 ? props.color2 : "#fa7d09")};
      text-transform: uppercase;
      width: 100%;
      margin-right: 5px;
    }
  }
  .card-content {
    width: 260px;
    height: 175px;
    padding: 10px;
    overflow-y: scroll;

    h2 {
      margin-left: 10px;
      margin-top: 5px;
      font-size: 15px;
      font-family: "Raleway", sans-serif;
      font-weight: 300;
      font-style: normal;
      color: white;
      width: 100%;
      margin-right: 5px;
    }
  }
`;
