import React, { useState, useEffect } from "react";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import Card from "../../components/cards/Category&SuggestionCard";
import { useParams } from "react-router";
import Input from "../../components/inputs/InputCatSugg";
import Suggestion from "../../components/SuggestionForm";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";

export default function Category({ theme, logo }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [category, setCategory] = useState();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(
    (category) => {
      setLoading(true);

      const db = firebase.firestore();

      let docRef = db.collection("categories").doc(id);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setCategory(doc.data());
            setLoading(false);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      setLoading(false);
    },
    [category]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category ? category.name : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      const { name } = valores;

      try {
        await db.collection("categories").doc(id).update({
          name: name,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  const deleteArray = (id) => {
    for (var i = category.suggestions.length; i--; ) {
      if (category.suggestions[i] === id) {
        category.suggestions.splice(i, 1);
      }
    }
    console.log(category.suggestions);
  };
  const user = useUser();
  return (
    <HomeStyle theme={theme}>
      {!loading && category ? (
        <>
          <SidebarAdmin logo={logo} category={true} theme={theme} />

          <div className="home-view">
            <div className="home-view-title">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h2>{category.name}</h2>
              </div>
            </div>
            <div className="container">
              <form>
                <div className="container-title">
                  <Input
                    color={theme ? theme.thirdColor : "#2f2519"}
                    color2={theme ? theme.primaryColor : "#fa7d09"}
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    disable={!edit}
                    error={
                      formik.touched.name && formik.errors.name
                        ? `${formik.errors.name}`
                        : null
                    }
                  />
                  {edit ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEdit(true);
                        formik.handleSubmit();
                      }}
                    >
                      <h2>Save Changes</h2>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      <h2>Edit Category</h2>
                    </button>
                  )}
                </div>
                <div className="suggestions">
                  {category.suggestions.map((suggestion) => (
                    <Suggestion
                      suggestion={suggestion}
                      deleteArray={deleteArray}
                      theme={theme}
                    />
                  ))}
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;

  .home-view {
    width: 70%;
    margin-left: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .container {
      margin-top: 100px;
      height: 500px;
      display: flex;
      flex-direction: column;

      form {
        width: 100%;
        height: auto;
        .suggestions {
          width: 100%;
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .container-title {
          display: flex;
          flex-direction: row;
          width: 100%;
          align-items: flex-start;
          justify-content: center;
          button {
            border: 2px solid
              ${(props) => (props.theme ? props.theme.primaryColor : "#fa7d09")};
            border-radius: 5px;
            height: 40px;
            margin-left: 10px;
            padding-left: 5px;
            padding-right: 5px;
            h2 {
              font-size: 12px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 500;
              font-style: normal;
              color: ${(props) =>
                props.theme ? props.theme.primaryColor : "#fa7d09"};
              text-transform: uppercase;
              width: 100%;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .home-view-title {
      width: 70%;
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 80px;
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};

      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    .home-view {
      width: 100%;
      margin-top: 90px;
      margin-left: 0;

      .home-view-title {
        width: 100%;
        height: 80px;
      }
      .container {
        margin-top: 100px;
        width: 100vw;
        height: auto;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
