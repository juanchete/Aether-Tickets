import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tags from "../Tags";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { NavLink, withRouter } from "react-router-dom";

export default function CategoriySuggestionCard({ color, color2, category }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(true);
  let [path, setPath] = React.useState("/category/");
  
  useEffect(() => {
    if (category.suggestions.length > 0) {
      setLoading(true);
      const db = firebaseReact.firestore();
      return db.collection("suggestions").onSnapshot((snapshot) => {
        const suggestionsData = [];
        const suggestionsFinal = category.suggestions;
        snapshot.forEach((doc) => {
          console.log(doc.id);
          console.log(category.suggestions);
          if (category.suggestions.includes(doc.id.toString())) {
            console.log("Entre");
            suggestionsData.push({ ...doc.data(), id: doc.id });
          }
        });

        console.log(suggestionsData); // <------
        setSuggestions(suggestionsData);
        setLoading(false);
      });
    }
    setLoading(false);
  }, []);

  const changeAvailable = async (value) => {
    try {
      await db.collection("categories").doc(category.id).update({
        available: value,
      });
    } catch (error) {}
  };
  return (
    <>
      {!loading ? (
        <Card color={color} color2={color2}>
          <div className="card-title">
            <NavLink className="h2" to={path + category.id}>
              {category.name}
            </NavLink>
            {category.available ? (
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
          <ul className="card-content">
            {suggestions ? (
              <>
                {suggestions.map((suggestion) => (
                  <li className="card-content-item">
                    <h2>{suggestion.name}</h2>
                  </li>
                ))}
              </>
            ) : (
              <li className="card-content-item">
                <h2>There are no Suggestions in this category</h2>
              </li>
            )}
          </ul>
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
    height: 40px;
    background: ${(props) => (props.color ? props.color : "#2f2519")};
    display: flex;
    align-items: flex-end;
    padding-left: 10px;

    .icon {
      width: 20px;
      height: 20px;
      color: #fa7d09;
    }

    .h2 {
      font-size: 15px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 300;
      font-style: normal;
      color: ${(props) => (props.color2 ? props.color2 : "#fa7d09")};
      text-transform: uppercase;
      margin-right: 5px;
    }
  }
  .card-content {
    width: 260px;
    height: 175px;
    padding: 10px;
    overflow-y: scroll;

    .card-content-item {
      width: 100%;
      margin-left: 10px;
      margin-top: 5px;

      h2 {
        font-size: 15px;
        font-family: "Raleway", sans-serif;
        font-weight: 300;
        font-style: normal;
        color: white;
        width: 100%;
        margin-right: 5px;
      }
    }
  }
`;
