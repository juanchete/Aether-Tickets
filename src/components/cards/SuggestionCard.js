import React from "react";
import styled from "styled-components";

export default function SuggestionCard({ color, color2, title }) {
  return (
    <Card color={color} color2={color2}>
      <div className="card-title">
        <h2>Suggestion 1</h2>
        <h3>Category 1</h3>
      </div>
      <div className="card-content">
        <h2>Esta es la Suggestion numero 1 </h2>
      </div>
    </Card>
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

    h2 {
      font-size: 18px;
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
