import React from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";

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
  i,
  error,
  fontSize,
  deleteS,
  marginBottom,
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
      <div className="lab">
        <label>{label}</label>{" "}
        <IoIosCloseCircle
          className="icon"
          onClick={(event) => {
            deleteS(i, event);
          }}
        />
      </div>
      <textarea
        type={type}
        onBlur={onBlur}
        id={id}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      {error ? <h4>{error}</h4> : <h4 style={{ color: "white" }}>h</h4>}
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
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "0px"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};
  .lab {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 0;

    .icon {
      width: 20px;
      height: 20px;
      margin-left: 5px;
      color: #2f2519;
      cursor: pointer;
      &:hover {
        color: #fa7d09;
      }
    }
  }
  label {
    font-family: "Raleway", sans-serif;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
    font-weight: 200;
    letter-spacing: 0.1em;
    color: ${(props) => (props.color ? props.color : "#fa7d09")};
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    border-bottom: 2px solid
      ${(props) => (props.color2 ? props.color2 : "#fa7d09")};
    background: white;
    font-family: "Raleway", sans-serif;
    color: ${(props) => (props.color2 ? props.color2 : "#fa7d09")};
    font-size: 14px;
    letter-spacing: 0.1em;

    &:focus {
      opacity: 1;
      background: white;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px
        ${(props) => (props.color ? props.color : "#fa7d09")} !important;
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
