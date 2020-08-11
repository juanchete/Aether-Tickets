import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";
import  { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function SignUpAsesor() {
  const firebase = useFirebaseApp();

  const db = firebase.firestore();

  const user = useUser();

  const formik = useFormik({
    initialValues: {
      email: "prueba1@email.com",
      password: "password",
      name: "prueba",
      lastName: "test"
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "La contraseña debe ser de al menos 6 caracteres"),
      name: Yup.string().required("El nombre es obligatorio"),
      lastName: Yup.string().required("El apellido es obligatorio")
    }),

    onSubmit: async (valores) => {
      // console.log(valores);
      const { email, password, name, lastName } = valores;
      try {
         await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(
            db.collection("asesores").add({
              name,
              email,
              lastName,
            })
          )
          
          Swal.fire(
            'Correcto',
            'Se Registro Correcctamente',
            'success'
        )

      } catch (error) {
        Swal.fire(
          'Correcto',
          error.message,
          'error'
      )
      }
    },
  });

  const confirmSignIn = (url) => {
    try {
        console.log(url);
      if (firebase.auth().isSignInWithEmailLink(url)) {

        
      }else{
          console.log('Aja y entonces');
      }
    } catch (err) {
      console.log(err);
    }
  }

     useEffect(() => {
    
    confirmSignIn(window.location.href)
    }, [])

  return (
    <StyledLogin>
      <div className="container">
        <div className="container-login">
          <h1>Sign Up</h1>
          <button className="sign-in-google">
            <img className="google-icon" src="google.png" />
            <h3>Sign up with google</h3>
          </button>
          <div className="sign-in-option">
            <div className="line"></div>
            <h3>or</h3>
            <div className="line"></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="input-name">
              <Input
                color="#2f2519"
                color2="#ff4301"
                label="Name"
                id="name"
                type="text"
                placeholder="Name"
                fontSize="10px"
                marginRight="20px"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={
                  formik.touched.name && formik.errors.name
                    ? `${formik.errors.name}`
                    : null
                }
              />
              <Input
                color="#2f2519"
                color2="#ff4301"
                label="Last Name"
                id="lastName"
                type="text"
                fontSize="10px"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && formik.errors.lastName
                    ? `${formik.errors.lastName}`
                    : null
                }
              />
            </div>
            <Input
              color="#2f2519"
              color2="#ff4301"
              label="Email"
              id="email"
              type="email"
              placeholder="Email"
              fontSize="10px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
              fontSize="10px"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
          <label className="sign-up-label">Have an account? Sign In Now.</label>
        </div>
      </div>
    </StyledLogin>
  );
}
const StyledLogin = styled.nav`
  background: #2f2519;
  height: 100vh;
  width: 100vw;
  overflow-x:hidden;
  font-family: "Raleway", sans-serif;
  .container {
    width: 100%;
    margin: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x:hidden;
  }

  .container-login {
    padding: 2rem;
    width: 40%;
    height: 85%;
    background: white;
    border: 3px solid #2f2519;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    overflow-x:hidden;

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
      margin-top: 10px;
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
        align-items: flex-end;
        text-align: center;
        letter-spacing: 0.1em;
        color: #ff4301;
        height:100%;
    }

      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        margin-bottom: 0.2rem;
        width: 100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        
    .input-name{
        display:flex;
        flex-direction:row;
        width:100%;
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
      margin-top: 10px;
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
  @media only screen and (max-height: 695px) and (max-width: 1250px)  {
    background: #2f2519;
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
        .input-name{
            display:flex;
            flex-direction:column;
            width:100%;
        }
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
      overflow-x:hidden;

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
        .input-name{
            display:flex;
            flex-direction:column;
            width:100%;
        }
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
    h1 {
        font-size: 40px;
      }
      form {
        .input-name{
            display:flex;
            flex-direction:column;
            width:100%;
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
