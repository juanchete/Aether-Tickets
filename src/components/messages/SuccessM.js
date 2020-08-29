import React from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import { IoMdClose } from "react-icons/io";

export default function SuccessMessage({
  color,
  color2,
  show,
  showMessage,
  type,
  message,
}) {
  let style;
  if (show) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <Success color={color} color2={color2}>
      <div className={style}>
        <div className="container">
          <div className="container-add">
            <h1>{type}!</h1>
            <h2>{message}!</h2>
            <div className="button-error">
              <ButtonSubmit
                color="#fa7d09"
                onClick={(event) => {
                  showMessage();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Success>
  );
}
const Success = styled.div`
  .open {
    background: rgba(74, 63, 53, 0.4);
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 400;
    position: fixed;
    font-family: "Raleway", sans-serif;
    .container {
      width: 100vw;
      margin: auto;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container-add {
      padding: 2rem;
      width: 500px;
      height: 400px;
      background: white;
      border: 3px solid white;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;

      h1 {
        text-align: center;
        line-height: 56px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.3em;
        font-weight: 400;
        font-size: 45px;
        font-style: normal;
        color: #2f2519;
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        text-align: center;
        margin-top: 50px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.3em;
        font-weight: 400;
        font-size: 20px;
        font-style: normal;
        color: #2f2519;
        text-transform: uppercase;
        width: 100%;
      }

      .button-error {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        align-items: center;

        h4 {
          font-family: "Raleway", sans-serif;
          font-size: 12px;
          font-weight: 200;
          letter-spacing: 0.1em;
          color: #ff4301;
          margin-top: 5px;
        }
      }
    }
  }
  .close {
    display: none;
  }

  @media only screen and (max-width: 629px) {
    .container-add {
      width: 100vw !important;
      height: 100vh !important;

      form {
        padding-right: 0.2rem;
        padding-left: 0.2rem;
      }
    }
  }
  @media only screen and (max-width: 580px) {
    .container-add {
      width: 100vw !important;
      height: 100vh !important;

      h1 {
        line-height: 40px !important;
        font-size: 35px !important;
      }
      form {
        padding-right: 0.2rem !important;
        padding-left: 0.2rem !important;
      }
    }
  }

  @media only screen and (max-width: 430px) {
    .container-add {
      width: 100vw !important;
      height: 100vh !important;

      h1 {
        line-height: 35px !important;
        font-size: 25px !important;
      }
    }
  }
`;
