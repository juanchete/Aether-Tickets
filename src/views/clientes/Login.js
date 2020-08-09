import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";

export default function LoginClientes() {
  const firebase = useFirebaseApp();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),

    onSubmit: async (valores) => {
      const { email, password } = valores;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {}
    },
  });
  return (
    <StyledLogin>
      <div className="container">
        <div className="container-login">
          <h1>Login</h1>
          <button className="sign-in-google">
            <img className="google-icon" src="google.png" />
            <h3>Sign in with google</h3>
          </button>
          <div className="sign-in-option">
            <div className="line"></div>
            <h3>or</h3>
            <div className="line"></div>
          </div>
          <form>
            <Input
              color="#2f2519"
              color2="#ff4301"
              label="Email"
              id="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              marginBottom="20px"
              error={
                formik.touched.email && formik.errors.email
                  ? `${formik.errors.email}`
                  : null
              }
            />
            <Input
              color="#2f2519"
              color2="#ff4301"
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              marginBottom="15px"
              error={
                formik.touched.password && formik.errors.password
                  ? `${formik.errors.password}`
                  : null
              }
            />

            <div className="button-error">
              <ButtonSubmit color="#ff4301" />

              {/* <h4>Erroooooooooooooooor</h4> */}
            </div>
          </form>
          <label className="sign-up-label">
            Do not have an account? Sign Up Now.
          </label>
        </div>
      </div>
    </StyledLogin>
  );
}
const StyledLogin = styled.nav`
  background: #2f2519;
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
    border: 3px solid #2f2519;
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
      color: #2f2519;
      text-transform: uppercase;
      width: 100%;
    }

    .sign-in-google {
      border: 2px solid #ff4301;
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
        color: #ff4301;
      }
      &:hover {
        opacity: 0.8;
        background: #ff4301;
        color: white;
        border-color: #ff4301;
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
        align-items: center;
        text-align: center;
        letter-spacing: 0.1em;
        color: #ff4301;
    }

      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 1.5rem;
        padding-bottom: 1.2rem;
        margin-bottom: 0.5rem;
        width: 100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;

        .input-container{
        width:100%;
        display:flex;
        flex-direction:column;
        margin-bottom: 20px;
       

        label{
            font-family: "Raleway", sans-serif;
            font-size: 12px;
            font-weight:200;
            letter-spacing: 0.1em;
            color: #2f2519;
            text-transform:uppercase;
        }
        input{
            border-bottom: 2px solid #FF4301;
            background:none;
        }
        h4{
            font-family: "Raleway", sans-serif;
            font-size: 10px;
            font-weight:200;
            letter-spacing: 0.1em;
            color: #FF4301;
            margin-top: 5px;
            
        }

        }

    .button-error{
        display:flex;
        flex-direction:column;
        justify-content:center;
        width:100%;
        align-items:center;

        h4{
            font-family: "Raleway", sans-serif;
            font-size: 12px;
            font-weight:200;
            letter-spacing: 0.1em;
            color: #FF4301;
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
        border: 1px solid #2f2519;
      }

      h3 {
        font-family: "Raleway", sans-serif;
        font-size: 20px;
        letter-spacing: 0.1em;
        color: #2f2519;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
`;
