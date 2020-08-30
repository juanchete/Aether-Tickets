import React, { useState } from "react";
import styled from "styled-components";

export default function Tags({ title }) {
  const [color, setColor] = useState();
  const [color2, setColor2] = useState();
  const getColor = () => {
    if (title === "High" || title === "Urgent") {
      return "#EE220C";
    }
    if (title === "Medium") {
      return "#FEAE00";
    }
    if (title === "Low") {
      return "#61D836";
    }
    if (title === "Solved") {
      return "#29E2F3";
    }
    if (title === "Pending") {
      return "#2F2519";
    }
    if (title === "Open") {
      return "#fa7d09";
    }
    if (title === "Unsolved") {
      return "#ff4301";
    }
  };
  const getColor2 = () => {
    if (title === "Urgent") {
      return "black";
    } else {
      return null;
    }
  };
  return (
    <Tag color={getColor()} color2={getColor2()}>
      <h2 color={color}>{title}</h2>
    </Tag>
  );
}
const Tag = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90px;
  padding: 0;
  text-align: center;
  border: 2px solid ${(props) => (props.color ? props.color : "#fa7d09")};
  border-radius: 20px;
  background: ${(props) => (props.color2 ? props.color2 : "transparent")};

  h2 {
    font-size: 10px !important;
    font-family: "Raleway", sans-serif;
    letter-spacing: 0.2em;
    font-weight: 500;
    font-style: normal;
    color: ${(props) => (props.color ? props.color : "#fa7d09")} !important;
    text-transform: uppercase;
    margin: 0;
    margin-right: 0 !important;
  }
`;
