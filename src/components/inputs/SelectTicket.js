import React from "react";
import styled from "styled-components";

export default function SelectTicket({
  color,
  color2,
  label,
  id,
  type,
  value,
  onChange,
  onBlur,
  min,
  max,
  error,
  fontSize,
  marginBottom,
  marginRight,
  children,
  ...rest
}) {
  return (
    <Select
      marginBottom={marginBottom}
      color={color}
      color2={color2}
      fontSize={fontSize}
      marginRight={marginRight}
    >
      <label>{label}</label>
      <select id={id} onChange={onChange} onBlur={onBlur} value={value}>
        <option value="" label="" />
        <option value="Hatillo" label="El Hatillo" />
        <option value="Baruta" label="Baruta" />
      </select>
      {error ? <h4>{error}</h4> : <h4 style={{ color: "white" }}>h</h4>}
    </Select>
  );
}
const Select = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  outline: none;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "0px"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};

  label {
    font-family: "Raleway", sans-serif;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
    font-weight: 300;
    letter-spacing: 0.1em;
    color: #2f2519;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  select {
    width: 100%;
    border: 2px solid #4a3f35;
    border-radius: 5px;
    background: #4a3f35;
    font-family: "Raleway", sans-serif;
    color: white;
    font-size: 15kpx;
    letter-spacing: 0.1em;
    height: 40px;

    &:focus {
      opacity: 1;
      background: #4a3f35;
      outline: none;
      box-shadow: none;
      border: solid 2px ${(props) => (props.color ? props.color : "#fa7d09")} !important;
    }
  }
  h4 {
    font-family: "Raleway", sans-serif;
    font-size: 10px;
    font-weight: 200;
    letter-spacing: 0.1em;
    color: #ee220c;
    margin-top: 5px;
  }

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 629px) {
    margin-bottom: 0px;
    label {
      font-size: 12px;
      margin-bottom: 10px;
    }
    input {
      font-size: 20px;
    }
    h4 {
      font-size: 15px;
    }
  }
`;
