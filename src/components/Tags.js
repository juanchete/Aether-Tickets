import React from "react";
import styled from "styled-components";

export default function Tags({ color, color2, title }) {
  return (
    <Tag color={color} color2={color2}>
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
  width: fit-content;
  padding-left: 15px;
  padding-right: 10px;
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
    width: 100%;
  }
`;
