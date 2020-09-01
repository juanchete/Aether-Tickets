import React, { useEffect, useState } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/inputs/InputSugName";
import Select from "../components/inputs/SelectSug";
import TextArea from "../components/inputs/TextAreaSug";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdSave } from "react-icons/md";
import firebase from "firebase";

export default function SuggestionForm({
  color,
  color2,
  suggestion,
  deleteArray,
  theme,
}) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState();
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    console.log("HIAAJNAJ");
    let docRef = db.collection("suggestions").doc(suggestion);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setSuggestions(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return db
      .collection("categories")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const categoryData = [];
        snapshot.forEach((doc) =>
          categoryData.push({ ...doc.data(), id: doc.id })
        );
        console.log(categoryData); // <------
        setCategories(categoryData);
        setLoading(false);
      });
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: suggestions ? suggestions.name : "",
      category: suggestions ? suggestions.category : "",
      answer: suggestions ? suggestions.suggestion : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field"),
      category: Yup.string().required("Required Field"),
      answer: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      const { name, category, answer } = valores;
      console.log("Entre");
      try {
        await db.collection("suggestions").doc(suggestion).update({
          name: name,
          category: category,
          suggestion: answer,
        });
        if (suggestions.category != category) {
          var ref = db.collection("categories").doc(suggestions.category);
          ref.update({
            suggestions: firebase.firestore.FieldValue.arrayRemove(suggestion),
          });
          deleteArray(suggestion);

          var ref2 = db.collection("categories").doc(category);
          ref2.update({
            suggestions: firebase.firestore.FieldValue.arrayUnion(suggestion),
          });
        }
      } catch (error) {}
    },
  });
  const changeAvailable = async (value) => {
    try {
      await db.collection("suggestions").doc(suggestion).update({
        available: value,
      });
    } catch (error) {}
  };
  return (
    <Category color={color} color2={color2} theme={theme}>
      {!loading && suggestions ? (
        <form className="suggestion-specific">
          <div className="suggestion-specific-title">
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
            {suggestions.available ? (
              <AiFillMinusCircle
                onClick={() => {
                  changeAvailable(false);
                }}
                className="icon"
              />
            ) : (
              <IoIosAddCircle
                onClick={() => {
                  changeAvailable(true);
                }}
                className="icon"
              />
            )}
            {edit ? (
              <MdSave
                className="icon"
                onClick={() => {
                  setEdit(false);
                  formik.handleSubmit();
                }}
              />
            ) : (
              <MdEdit
                className="icon"
                onClick={() => {
                  setEdit(true);
                }}
              />
            )}
          </div>
          <div className="suggestion-specific-answer">
            <Select
              color={theme ? theme.thirdColor : "#2f2519"}
              color2={theme ? theme.primaryColor : "#fa7d09"}
              label="Category"
              id="category"
              fontSize="12px"
              type="select"
              placeholder="category"
              disable={!edit}
              options={categories}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              error={
                formik.touched.category && formik.errors.category
                  ? `${formik.errors.category}`
                  : null
              }
            />
            <div className="suggestion-specific-answer-textarea">
              <TextArea
                color={theme ? theme.thirdColor : "#2f2519"}
                color2={theme ? theme.primaryColor : "#fa7d09"}
                label="Suggestion"
                id="answer"
                disable={!edit}
                placeholder="answer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.answer}
                error={
                  formik.touched.answer && formik.errors.answer
                    ? `${formik.errors.answer}`
                    : null
                }
              />
            </div>
          </div>
        </form>
      ) : null}
    </Category>
  );
}
const Category = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .suggestion-specific {
    width: 90%;
    background: ${(props) =>
      props.theme ? props.theme.thirdColor : "#2f2519"};
    height: auto;
    display: flex;
    flex-direction: column;
    border: 3px solid
      ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
    border-radius: 5px;

    .suggestion-specific-answer {
      margin: 10px;
      width: fit;
      background: ${(props) =>
        props.theme ? props.theme.thirdColor : "#2f2519"};
      padding: 5px;

      .suggestion-specific-answer-textarea {
        border: 1px solid
          ${(props) => (props.theme ? props.theme.secondaryColor : "#4a3f35")};
        border-radius: 5px;
        background: ${(props) =>
          props.theme ? props.theme.secondaryColor : "#4a3f35"};
      }
    }

    .suggestion-specific-title {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      padding: 10px;
      border: 1px solid
        ${(props) => (props.theme ? props.theme.secondaryColor : "#4a3f35")};
      border-radius: 5px;

      h1 {
        font-size: 18px;
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

      .icon {
        width: 40px;
        height: 40px;
        color: white;
        cursor: pointer;
        &: hover {
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
        }
      }
    }
  }
`;
