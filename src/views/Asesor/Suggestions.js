import React, { useState, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import Card from "../../components/cards/SuggestionCard";

export default function Suggestions({ theme }) {
  const firebase = useFirebaseApp();
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const db = firebase.firestore();
    return db
      .collection("suggestions")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const suggestionsData = [];
        snapshot.forEach((doc) =>
          suggestionsData.push({ ...doc.data(), id: doc.id })
        );
        console.log(suggestionsData); // <------
        setSuggestions(suggestionsData);
        setLoading(false);
      });
  }, []);

  const user = useUser();
  return (
    <HomeStyle theme={theme}>
      <SidebarAdmin category={true} theme={theme} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>All</h2>
            <h1>Suggestions</h1>
          </div>
        </div>
        <div className="container">
          {!loading ? (
            <>
              {suggestions ? (
                <>
                  {" "}
                  {suggestions.map((suggestion) => (
                    <Card
                      suggestion={suggestion}
                      color={theme ? theme.thirdColor : "#2f2519"}
                      color2={theme ? theme.primaryColor : "#fa7d09"}
                      theme={theme}
                    />
                  ))}
                </>
              ) : null}{" "}
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

    .home-view-title {
      width: 70%;
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 80px;
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }
    .container {
      margin-top: 80px;
      width: 70vw;
      height: auto;
      padding: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    .home-view {
      width: 100%;
      margin-top: 90px;
      margin-left: 0;

      .home-view-title {
        width: 100%;
        height: 80px;
      }
      .container {
        margin-top: 80px;
        width: 100vw;
        height: auto;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
