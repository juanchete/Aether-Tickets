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
  disable,
  marginBottom,
  marginRight,
  children,
  theme,
  ...rest
}) {
  return (
    <TextArea
      marginBottom={marginBottom}
      color={color}
      color2={color2}
      fontSize={fontSize}
      marginRight={marginRight}
      theme={theme}
    >
      <label>{label}</label>
      <textarea
        disabled={disable ? true : false}
        onBlur={onBlur}
        id={id}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      {error ? (
        <h4>{error}</h4>
      ) : (
        <h4 style={{ color: theme ? theme.secondaryColor : "#4a3f35" }}>h</h4>
      )}
    </TextArea>
  );
}
const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "0px"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};
  margin-top: 20px;

  label {
    font-family: "Raleway", sans-serif;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
    font-weight: 200;
    letter-spacing: 0.1em;
    color: white;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  textarea {
    width: 80%;
    height: auto;
    background: transparent;
    font-family: "Raleway", sans-serif;
    color: white;
    font-size: 14px;
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
