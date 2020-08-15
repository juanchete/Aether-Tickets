import React from "react";
import styled from "styled-components";

export default function InputLogin({
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
  disable,
  marginRight,
  children,
  ...rest
}) {
  return (
    <Input
      marginBottom={marginBottom}
      color={color}
      color2={color2}
      fontSize={fontSize}
      marginRight={marginRight}
    >
      <input
        type={type}
        onBlur={onBlur}
        id={id}
        autoComplete="off"
        value={value}
        onChange={onChange}
        disabled={disable ? true : false}
      />
      {error ? <h4>{error}</h4> : <h4 style={{ color: "#4a3f35" }}>h</h4>}
    </Input>
  );
}
const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;

  input {
    height: 40px;
    background: #4a3f35;
    color: white;
    font-size: 18px;
    font-family: "Raleway", sans-serif;
    letter-spacing: 0.2em;
    font-weight: 500;
    font-style: normal;
    text-transform: uppercase;
    width: 100%;
    margin-right: 5px;

    &:focus {
      opacity: 1;
      background: #4a3f35;
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
