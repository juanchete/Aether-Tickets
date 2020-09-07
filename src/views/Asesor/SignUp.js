import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";
import { Redirect, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../CreateContext";
import Cookies from "js-cookie";
import Spinner from "../../components/Spinner";

export default function SignUpAsesor({ theme }) {
  const firebase = useFirebaseApp();

  const db = firebase.firestore();

  const [flag, setFlag] = useState(false);

  const { setUser } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required Field"),
      password: Yup.string()
        .required("Required Field")
        .min(6, "Password must be at least 6 characters"),
      name: Yup.string().required("Required Field"),
      lastName: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      setSubmitted(true);
      // console.log(valores);
      const { email, password, name, lastName } = valores;
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await db.collection("asesores").doc(user.uid).set({
          name,
          email,
          lastName,
          role: "asesor",
          available: true,
        });

        Swal.fire("Success!", "Sign up was succesful", "success");
        setSubmitted(false);
        setUser({
          name,
          lastName,
          email,
          role: "asesor",
        });

        Cookies.set("user", {
          name,
          lastName,
          email,
          role: "asesor",
        });

        setFlag(true);
      } catch (error) {
        console.log(error);
        Swal.fire("Failed!", error.message, "error");
        setSubmitted(false);
      }
    },
  });

  const confirmSignIn = (url) => {
    try {
      console.log(url);
      if (firebase.auth().isSignInWithEmailLink(url)) {
      } else {
        console.log("Aja y entonces");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    confirmSignIn(window.location.href);
  }, []);

  return flag ? (
    <Redirect to="/" />
  ) : (
    <StyledLogin theme={theme}>
      <div className="container">
        <div className="container-login">
          <h1>Sign Up</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="input-name">
              <Input
                color={theme ? theme.thirdColor : "#2f2519"}
                color2={theme ? theme.primaryColor : "#fa7d09"}
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
                color={theme ? theme.thirdColor : "#2f2519"}
                color2={theme ? theme.primaryColor : "#fa7d09"}
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
              color={theme ? theme.thirdColor : "#2f2519"}
              color2={theme ? theme.primaryColor : "#fa7d09"}
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
              color={theme ? theme.thirdColor : "#2f2519"}
              color2={theme ? theme.primaryColor : "#fa7d09"}
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
              {submitted ? (
                <Spinner color={theme ? theme.primaryColor : "#fa7d09"} />
              ) : (
                <ButtonSubmit color={theme ? theme.primaryColor : "#fa7d09"} />
              )}
            </div>
          </form>
          <label className="sign-up-label">
            <h2>Have an account? </h2>
            <Link to="login" style={{ marginLeft: "5px", fontWeight: "600" }}>
              {" "}
              Sign In Now.
            </Link>
          </label>
        </div>
      </div>
    </StyledLogin>
  );
}
const StyledLogin = styled.nav`
background: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
height: 100vh;
width: 100vw;
overflow-x:hidden;
font-family: 'Raleway', sans-serif;
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
  width: 500px;
  height: 650px;
  background: white;
  border: 3px solid ${(props) =>
    props.theme ? props.theme.thirdColor : "#2f2519"};
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  overflow-x:hidden;

  h1 {
    text-align: center;
    font-family: 'Raleway', sans-serif;
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
      color: ${(props) => (props.theme ? props.theme.primaryColor : "#fa7d09")};
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
      color: ${(props) => (props.theme ? props.theme.primaryColor : "#fa7d09")};
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
          font-family: 'Raleway', sans-serif;
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
    margin-top: 10px;
    align-items: center;
    justify-content: center;

    .line {
      width: 155.01px;
      height: 0px;
      border: 1px solid ${(props) =>
        props.theme ? props.theme.thirdColor : "#2f2519"};
    }

    h3 {
      font-family: 'Raleway', sans-serif;
      font-size: 20px;
      letter-spacing: 0.1em;
      color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
@media only screen and (max-height: 695px) and (max-width: 1250px)  {
  background: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
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
