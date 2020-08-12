import React from "react";
import styled from "styled-components";
import Tags from "../Tags";

export default function TicketCard({ color, color2, title }) {
  return (
    <Card color={color} color2={color2}>
      <li className="data">
        <h2>Valeska Silva</h2>
        <h3>vekasilva@gmail.com</h3>
      </li>
      <li className="data">
        <h2>Prueba</h2>
      </li>
      <li className="data">
        <h2>Juan Lopez</h2>
      </li>
      <li className="data">
        <Tags title="High" color="#EE220C" />
      </li>
      <li className="data">
        <Tags title="Solved" color="#29E2F3" />
      </li>
      <li className="data">
        <h2>5 hours ago</h2>
      </li>
    </Card>
  );
}
const Card = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #2f2519;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  list-style: none;

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
      color: #fa7d09;
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
`;