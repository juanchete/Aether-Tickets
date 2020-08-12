import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import "firebase/auth";
import { useFirebaseApp, useFirestore } from "reactfire";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";
import Swal from 'sweetalert2';
import { Link, Router, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import { UserContext } from "../../CreateContext";

export default function LoginClientes() {

  const [remember, setRemember] = useState(false)

  const [flag, setFlag] = useState(false)

  const {setUser} = useContext(UserContext)

  

  useEffect(() => {
    console.log(remember);
  }, [remember])

  
  

  const firebase = useFirebaseApp();
  const firestore = useFirestore();
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('remember-email') || "",
      password: "",
      remember: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required Field"),
      password: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      let usuario = null
      const { email, password } = valores;
      try {

        await firestore.collection('usuarios').where('email','==',email).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              usuario=doc.data()
          });
        
          
      })

      if (usuario !== null) {

        const { name, email, lastName } = usuario

        await firebase.auth().signInWithEmailAndPassword(email, password);


        setUser({
          name ,
          lastName ,
          email,
          role:'usuario'

        })

         Cookies.set('user', {
          name ,
          lastName ,
          email,
          role:'usuario'

        }, { expires: 7 });

     
     if (remember) {
      localStorage.setItem('remember-email', email);
     }else{
       localStorage.removeItem('remember-email')
     }
     Swal.fire(
      'Correcto',
      'Inicio sesion Correcctamente',
      'success'
  )

  setFlag(true)
   
      }else {
        Swal.fire(
          'Error',
          'No se encuentra registrado como asesor',
          'error'
      )
      }

      } catch (error) {
        Swal.fire(
          'Correcto',
          error.message,
          'error'
      )
      }
    },
  });

  const forgotPassword = ( () =>{
    const mail = formik.values.email

    firebase.auth().sendPasswordResetEmail(mail).then(() => {
      console.log('Email Sent');
    }).catch((error) =>{
      console.log(error);
    });
  })

  return flag  ? <Redirect to="/"/> : ( 
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
          <form onSubmit={formik.handleSubmit}>
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
              marginBottom="15px"
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
              error={
                formik.touched.password && formik.errors.password
                  ? `${formik.errors.password}`
                  : null
              }
            />
            <label className="forgot-password" onClick={forgotPassword}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </label>

            


            <div className="remember-me">
              <input type="checkbox" value={remember} onChange={evt => setRemember(!remember)}/>
              <h4>Remember me</h4>
            </div>
            <div className="button-error">
              <ButtonSubmit color="#ff4301" />

            </div>
          </form>
          <label className="sign-up-label">
            <Link to='signup'>Do not have an account? Sign Up Now.</Link>
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
  font-family: 'Raleway', sans-serif;
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
      font-family: 'Raleway', sans-serif;
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
        align-items: flex-end;
        text-align: center;
        letter-spacing: 0.1em;
        color: #ff4301;
        height:100%;
    }

      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 1.5rem;
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
              font-family: 'Raleway', sans-serif;
              font-size: 12px;
              font-weight:200;
              letter-spacing: 0.1em;
              color: #2f2519;
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
                font-family: 'Raleway', sans-serif;
                font-size: 12px;
                font-weight:200;
                letter-spacing: 0.1em;
                color: #ff4301;
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
                font-family: 'Raleway', sans-serif;
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
        font-family: 'Raleway', sans-serif;
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
    

    font-family: 'Raleway', sans-serif;
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
