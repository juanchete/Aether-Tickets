import React, { useEffect, useState } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";
import Select from "../../components/inputs/SelectLogin";
import TextArea from "../../components/inputs/TextAreaInput";
import { IoMdClose } from "react-icons/io";
import firebase from "firebase";

export default function AddSuggestion({ color, color2, show, showSuggestion }) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const db = firebaseReact.firestore();
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
    initialValues: {
      name: "",
      category: "",
      suggestion: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field"),
      category: Yup.string().required("Required Field"),
      suggestion: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      const { name, category, suggestion } = valores;

      try {
        const { id } = await db.collection("suggestions").add({
          name: name,
          suggestion: suggestion,
          category: category,
          createdAt: new Date(),
          available: true,
        });
        var ref = db.collection("categories").doc(category);
        ref.update({
          suggestions: firebase.firestore.FieldValue.arrayUnion(id),
        });
      } catch (error) {}
    },
  });

  let style;
  if (show) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <Category color={color} color2={color2}>
      <div className={style}>
        <div className="container">
          <div className="container-add">
            <div className="close">
              <IoMdClose
                className="icon"
                onClick={(event) => {
                  showSuggestion();
                }}
              />
            </div>
            <h1>Create Suggestion</h1>
            {!loading ? (
              <form onSubmit={formik.handleSubmit}>
                <Input
                  color="#2f2519"
                  color2="#fa7d09"
                  label="Name"
                  id="name"
                  type="text"
                  placeholder="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={
                    formik.touched.name && formik.errors.name
                      ? `${formik.errors.name}`
                      : null
                  }
                />
                <Select
                  color="#2f2519"
                  color2="#fa7d09"
                  label="Category"
                  id="category"
                  fontSize="10px"
                  type="select"
                  placeholder="category"
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
                <TextArea
                  color="#2f2519"
                  color2="#fa7d09"
                  label="Suggestion"
                  id="suggestion"
                  placeholder="suggestion"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.suggestion}
                  error={
                    formik.touched.suggestion && formik.errors.suggestion
                      ? `${formik.errors.suggestion}`
                      : null
                  }
                />

                <div className="button-error">
                  <ButtonSubmit color="#fa7d09" />

                  {/* <h4>Erroooooooooooooooor</h4> */}
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </Category>
  );
}
const Category = styled.div`
  .open {
    background: rgba(74, 63, 53, 0.4);
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    font-family: "Raleway", sans-serif;
    .container {
      width: 100%;
      margin: auto;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: scroll !important;
    }
    .container-add {
      padding: 2rem;
      width: 40%;
      height: 80%;
      background: white;
      border: 3px solid white;
      border-radius: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;

      .close {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .icon {
          width: 40px;
          height: 40px;
          color: #2f2519;
          cursor: pointer;
        }
      }
      h1 {
        text-align: center;
        line-height: 50px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.3em;
        margin-top: 0;
        font-weight: 400;
        font-size: 45px;
        font-style: normal;
        color: #2f2519;
        text-transform: uppercase;
        width: 100%;
      }
      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-bottom: 0.4rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .button-error {
          margin-top: 5px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
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
  }
  .close {
    display: none;
  }

  @media only screen and (max-height: 695px) and (max-width: 1250px) {
    .open {
      height: auto;
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
      .container-add {
        height: auto;
        width: 50%;
      }
    }
  }

  @media only screen and (max-height: 900px) and (min-height: 800px) {
    .container-add {
      height: 75%;
      overflow-y: scroll;
    }
  }
  @media only screen and (max-height: 1000px) and (min-height: 901px) {
    .container-add {
      height: 65%;
      overflow-y: scroll;
    }
  }
  @media only screen and (max-height: 1500px) and (min-height: 1001px) {
    .container-add {
      height: 600px;
      overflow-y: scroll;
    }
  }
  @media only screen and (max-width: 1290px) and (min-width: 1024px) {
    .container-add {
      width: 50% !important;
      overflow-y: scroll;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .container-add {
      width: 65% !important;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 630px) {
    .container-add {
      width: 75% !important;
    }
  }

  @media only screen and (max-width: 629px) {
    .container-add {
      width: 100% !important;
      height: 100% !important;

      form {
        padding-right: 0.2rem;
        padding-left: 0.2rem;
      }
    }
  }
  @media only screen and (max-width: 580px) {
    .container-add {
      width: 100% !important;
      height: 100% !important;

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
      width: 100% !important;
      height: 100% !important;

      h1 {
        line-height: 35px !important;
        font-size: 25px !important;
      }
    }
  }
`;
