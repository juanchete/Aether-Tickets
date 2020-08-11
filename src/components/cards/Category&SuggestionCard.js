import React from "react";
import styled from "styled-components";
import Tags from "../Tags";

export default function CategoriySuggestionCard({ color, color2, title }) {
  return (
    <Card color={color} color2={color2}>
      <div className="card-title">
        <h2>Categories</h2>
      </div>
      <ul className="card-content">
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
        <li className="card-content-item">
          <h2>Suggestion</h2>
        </li>
      </ul>
    </Card>
  );
}
const Card = styled.div`
  width: 260px;
  height: 220px;
  background: #2f2519;
  margin: 10px;
  border: 1px solid #2f2519;
  border-radius: 5px;

  .card-title {
    width: 100%;
    height: 40px;
    background: #2f2519;
    display: flex;
    align-items: flex-end;
    padding-left: 10px;

    h2 {
      font-size: 20px;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.2em;
      font-weight: 300;
      font-style: normal;
      color: #fa7d09;
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
