import React, { useState, useContext } from "react";
import { UserContext } from "../CreateContext";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonSubmit from "../components/buttons/Button-Submit";
import Input from "../components/inputs/InputLogin";
import { IoMdClose } from "react-icons/io";
import StarRating from "../components/StarRating";
import TextArea from "../components/inputs/TextAreaInput";

export default function Feedback({
  color,
  color2,
  show,
  showFeedback,
  asesor,
  ticket,
}) {
  const { user, setUser } = useContext(UserContext);
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [ratingStars, setRatingStars] = useState(null);

  const rateStars = (stars) => {
    setRatingStars(stars);
  };
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      const { comment } = valores;
      console.log(ratingStars);
      const feedback = {
        rating: ratingStars,
        comment: comment,
        usuario: user.id,
        ticket: ticket,
      };

      var ref = db.collection("asesores").doc(asesor.id);
      ref.update({
        feedback: firebase.firestore.FieldValue.arrayUnion(feedback),
      });
      showFeedback();
    },
  });

  let style;
  if (show) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <FeedbackStyle color={color} color2={color2}>
      <div className={style}>
        <div className="container">
          <div className="container-add">
            <div className="close">
              <IoMdClose
                className="icon"
                onClick={(event) => {
                  showFeedback();
                }}
              />
            </div>
            <h1>Feedback</h1>
            <h2>
              To: {asesor.name} {asesor.lastName}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="rating-star">
                <h2>Rate the service given</h2>
                <StarRating rating={ratingStars} rateStars={rateStars} />
              </div>
              <TextArea
                color="#2f2519"
                color2="#ff4301"
                label="Add a Comment"
                id="comment"
                marginTop="10px"
                width="60%"
                height="80px"
                placeholder="comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
                error={
                  formik.touched.comment && formik.errors.comment
                    ? `${formik.errors.comment}`
                    : null
                }
              />
              <div className="button-error">
                <ButtonSubmit color="#ff4301" />

                {/* <h4>Erroooooooooooooooor</h4> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </FeedbackStyle>
  );
}
const FeedbackStyle = styled.div`
  .open {
    background: rgba(74, 63, 53, 0.4);
    top: 0;
    left: 0;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 100;
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
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 400;
        font-size: 18px;
        font-style: normal;
        color: #2f2519;
        text-transform: uppercase;
        width: 100%;
      }
      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 1.5rem;
        padding-bottom: 1rem;
        margin-bottom: 0.4rem;
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .rating-star {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          h2 {
            font-family: "Raleway", sans-serif;
            font-size: 12px;
            font-weight: 200;
            letter-spacing: 0.1em;
            color: #2f2519;
            text-transform: uppercase;
            margin-bottom: 10px;
          }
        }
        .button-error {
          margin-top: 10px;
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
