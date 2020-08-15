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
  options,
  fontSize,
  marginBottom,
  disable,
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
      <select
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disable ? true : false}
      >
        <option value="" label="" />
        {options.map((option) => (
          <option value={option.id} label={option.name} />
        ))}
      </select>
      {error ? <h4>{error}</h4> : <h4 style={{ color: "#4a3f35" }}>h</h4>}
    </Select>
  );
}
const Select = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "0px"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};

  label {
    font-family: "Raleway", sans-serif;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
    font-weight: 200;
    letter-spacing: 0.1em;
    color: white;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  select {
    width: auto;
    background: transparent;
    font-family: "Raleway", sans-serif;
    color: white;
    font-size: 18px;
    letter-spacing: 0.1em;

    &:focus {
      opacity: 1;
      background: transparent;
      outline: none;
      box-shadow: none;
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
