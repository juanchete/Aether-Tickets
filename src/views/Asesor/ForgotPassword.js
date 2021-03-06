import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import "firebase/auth";
import { useFirebaseApp, useFirestore } from "reactfire";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";

function ForgotPassword({ theme }) {
  const firebase = useFirebaseApp();
  const [redirectLogin, setrediRectLogin] = useState(false);

  const renderRedirectPassword = () => {
    if (redirectLogin) {
      return <Redirect to="/login" />;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("remember-email") || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required Field"),
    }),

    onSubmit: async (valores) => {
      const { email, password } = valores;
      try {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            Swal.fire(
              "Correcto",
              "Se envio el correo satisfactoriamente",
              "success"
            );
            setrediRectLogin(true);
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    },
  });

  return (
    <StyledLogin theme={theme}>
      {renderRedirectPassword()}
      <div className="container">
        <div className="container-login">
          <h1>Forgot Password</h1>
          <div className="sign-in-option">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Input
              color={theme ? theme.thirdColor : "#2f2519"}
              color2={theme ? theme.primaryColor : "#fa7d09"}
              label="Email"
              id="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              marginBottom="15px"
              error={
                formik.touched.email && formik.errors.email
                  ? `${formik.errors.email}`
                  : null
              }
            />

            <div className="button-error">
              <ButtonSubmit color2={theme ? theme.primaryColor : "#fa7d09"} />
            </div>
          </form>
        </div>
      </div>
    </StyledLogin>
  );
}

const StyledLogin = styled.nav`
  background: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
  height: 100vh;
  width: 100vw;
  font-family: "Raleway", sans-serif;
  .container {
    width: 100%;
    margin: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-login {
    padding: 2rem;
    width: 40%;
    height: 80%;
    background: white;
    border: 3px solid ${(props) =>
      props.theme ? props.theme.thirdColor : "#2f2519"};
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    h1 {
      text-align: center;
      font-family: "Raleway", sans-serif;
      letter-spacing: 0.3em;
      font-weight: 400;
      font-size: 48px;
      font-style: normal;
      color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      text-transform: uppercase;
      width: 100%;
    }

    .sign-in-google {
      border: 2px solid ${(props) =>
        props.theme ? props.theme.primaryColor : "#fa7d09"};
      box-sizing: border-box;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 60%;
      margin-top: 15px;
      .google-icon {
        width: 40px;
        height: 35px;
      }
      h3 {
        font-size: 12px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.1em;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
      }
      &:hover {
        opacity: 0.8;
        background: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        color: white;
        border-color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        h3 {
          color: white;
        }
      }
      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }

    .sign-up-label{
        font-size: 12px;
        text-transform: uppercase;
        display: flex;
        align-items: flex-end;
        text-align: center;
        letter-spacing: 0.1em;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        height:100%;
    }

      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 5.5rem;
        padding-bottom: 1rem;
        margin-bottom: 0.4rem;
        width: 100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;

        .remember-me{
          display:flex;
            flex-direction:row;
            justify-content:flex-start;
            width:100%;
            height:100%;
            align-items:center;
            h4{
              font-family: "Raleway", sans-serif;
              font-size: 12px;
              font-weight:200;
              letter-spacing: 0.1em;
              color: ${(props) =>
                props.theme ? props.theme.thirdColor : "#2f2519"};
              margin-top: 5px;
              margin-bottom: 5px;
              margin-left: 10px;
              text-transform:uppercase;
              
          }
        }
        .forgot-password{
          display:flex;
            flex-direction:row;
            justify-content:flex-end;
            width:100%;
            height:100%;
            align-items:center;
            margin-bottom: 5px;

            h4{
                font-family: "Raleway", sans-serif;
                font-size: 12px;
                font-weight:200;
                letter-spacing: 0.1em;
                color: ${(props) =>
                  props.theme ? props.theme.primaryColor : "#fa7d09"};
                margin-top: 0px;
                text-transform:uppercase;
                
            }

        }
        .button-error{
            display:flex;
            flex-direction:column;
            justify-content:flex-end;
            width:100%;
            height:100%;
            align-items:center;

            h4{
                font-family: "Raleway", sans-serif;
                font-size: 12px;
                font-weight:200;
                letter-spacing: 0.1em;
                color: ${(props) =>
                  props.theme ? props.theme.primaryColor : "#fa7d09"};
                margin-top: 5px;
                
            }
        }

       
      }
    }
    .sign-in-option {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-top: 15px;
      align-items: center;
      justify-content: center;

      .line {
        width: 155.01px;
        height: 0px;
        border: 1px solid ${(props) =>
          props.theme ? props.theme.thirdColor : "#2f2519"};
      }

      h3 {
        font-family: "Raleway", sans-serif;
        font-size: 20px;
        letter-spacing: 0.1em;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  @media only screen and (max-height: 695px) and (max-width: 1250px)  {
    background: ${(props) =>
      props.theme ? props.theme.thirdColor : "#2f2519"};
    height:auto;
    width: 100vw;
    

    font-family: "Raleway", sans-serif;
    .container {
      width: 100%;
      margin: auto;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container-login {
        height:auto;
    }
  }

 

  @media only screen and (max-height: 900px) and (min-height: 800px)   {
    .container-login {
        height:75%;
    }
  }
  @media only screen and (max-height: 1000px) and (min-height: 901px)   {
    .container-login {
        height:65%;
    }
  }
  @media only screen and (max-height: 1500px) and (min-height: 1001px)   {
    .container-login {
        height:600px;
    }
  }
  @media only screen and (max-width: 1290px) and (min-width: 1024px)   {

    .container-login {
      width: 40%; 
    }
  
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {

    .container-login {
      width: 65%;
    }
  
  }

  @media only screen and (max-width: 767px) and (min-width: 630px)  {

    .container-login {
      width: 75%;
    }
  
  }

  @media only screen and (max-width: 629px)   {

    .container-login {
      width: 100%;
      height: 100%;
      .sign-in-google {
        margin-top: 5px;
        margin-bottom: 0px;
        width: 80%;
        padding-top:5px;
        padding-bottom:5px;
        h3 {
          font-size: 18px;
        } 
      }
      form {
        padding-right: 0.2rem;
        padding-left: 0.2rem;
      }
    }
    .sign-in-option {
        margin-top: 30px;
        margin-bottom: 30px;
        .line {
          width: 40%;
        }
      }
  
  }
  @media only screen and (max-width: 580px)   {

    .container-login {
      width: 100%;
      height: 100%;

      .sign-in-google {
        margin-top: 5px;
        margin-bottom: 0px;
        width: 80%;
        padding-top:5px;
        padding-bottom:5px;
        h3 {
          font-size: 18px;
        } 
      }
      form {
        padding-right: 0.2rem;
        padding-left: 0.2rem;
      }
    }
    .sign-in-option {
        margin-bottom: 0px;
        .line {
          width: 40%;
        }
      }
  }

  @media only screen and (max-width: 430px)   {

    .container-login {
      width: 100%;
      height: 100%;

      form{
        .remember-me{
          margin-bottom: 20px;
          margin-top: 20px;
        }
      }
      .sign-in-google {
        margin-top: 30px;
        margin-bottom: 0;
        width: 90%;
        padding-top:5px;
        padding-bottom:5px;
        h3 {
          font-size: 12px;
        } 
      }
    }
  }
`;

export default ForgotPassword;
