import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

export default function ButtonSubmit({
  color,
  color2,
  marginTop,
  children,
  ...rest
}) {
  return (
    <Button color={color} marginTop={marginTop} color2={color2} {...rest}>
      <IoIosArrowForward className="arrow-icon" />
    </Button>
  );
}
const Button = styled.button`
  width: 90px;
  height: 90px;
  background: ${(props) => (props.color2 ? props.color2 : "white")};
  border: 3px solid ${(props) => (props.color ? props.color : "#fa7d09")};
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  .arrow-icon {
    width: 40px;
    height: 40px;
    color: ${(props) => (props.color ? props.color : "#fa7d09")};
  }
  &:hover {
    opacity: 0.8;
    background: ${(props) => (props.color ? props.color : "#fa7d09")};
    border-color: ${(props) => (props.color ? props.color : "#fa7d09")};
    .arrow-icon {
      color: ${(props) => (props.color2 ? props.color2 : "white")};
    }
  }
  &:focus {
    opacity: 0.8;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 629px) {
    width: 90px;
    height: 90px;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
    .arrow-icon {
      width: 45px;
      height: 45px;
      color: ${(props) => (props.color ? props.color : "#fa7d09")};
    }
  }
`;
