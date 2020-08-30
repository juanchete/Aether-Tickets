import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../CreateContext";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import Input from "../components/inputs/InputStep";
import TextArea from "../components/inputs/TextAreaStep";
import { IoIosAddCircle } from "react-icons/io";
import ButtonSubmit from "../components/buttons/Button-Submit";
import { IoMdClose } from "react-icons/io";
import Message from "../components/messages/SuccessM";

export default function SolvedModal({ color, color2, show, showFeedback }) {
  const [submitted, setSubmitted] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [messageShow, setMessageShow] = React.useState(false);
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [ticket, setTicket] = useState();
  const [nSteps, setNSteps] = useState(1);
  const [steps, setSteps] = useState([]);
  const [stepsE, setStepsE] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  const showMessage = (e) => {
    setMessageShow(!messageShow);
  };
  const handleStepChange = (i, e) => {
    const aux = steps;
    aux[i] = e.target.value;
    setSteps(aux);
  };
  const deleteStep = (i, e) => {
    let aux = steps;

    aux.splice(i, 1);

    setSteps(aux);
    setNSteps(nSteps - 1);
  };

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    let docRef = db.collection("tickets").doc(id);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setTicket(doc.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: { problem: "", result: "" },
    validationSchema: Yup.object({
      problem: Yup.string().required("Required Field"),
      result: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      setSubmitted(true);
      console.log(valores);
      const { problem, result } = valores;
      if (steps.length > 0) {
        try {
          var ref = db.collection("tickets").doc(id);
          ref.update({
            solvedModal: {
              problem: problem,
              steps: steps,
              result: result,
              lifespan: ticket.lifespan,
              date: firebase.firestore.Timestamp.now(),
            },
          });
          showFeedback();
          setSubmitted(false);
          setType("Success");
          setMessage(`Thank you for Submitting the Solution!`);
          showMessage();
          formik.values.name = "";
          formik.values.category = "";
          formik.values.suggestion = "";
        } catch (error) {
          setSubmitted(false);
          setType("Error");
          setMessage("There has been an error!");
          console.log(error);
          showMessage();
        }
      } else {
        setStepsE("There must be at least a step");
      }
    },
  });

  let style;
  if (show) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <>
      {type && message ? (
        <Message
          show={messageShow}
          type={type}
          message={message}
          showMessage={showMessage}
        />
      ) : null}
      <FeedbackStyle color={color} color2={color2}>
        <div className={style}>
          <div className="container">
            {!loading ? (
              <div className="container-add">
                <h1>How to solve the Problem</h1>
                <h2>Estimated Time: {ticket.lifespan} minutes</h2>

                <div className="content">
                  <form onSubmit={formik.handleSubmit}>
                    <TextArea
                      color="#2f2519"
                      color2="#fa7d09"
                      label="Problem"
                      placeholder="problem"
                      id="problem"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.problem}
                      error={
                        formik.touched.problem && formik.errors.problem
                          ? `${formik.errors.problem}`
                          : null
                      }
                    />
                    <h3>Steps</h3>
                    {[...Array(nSteps)].map((star, i) => {
                      const stepValue = i + 1;
                      return (
                        <Input
                          color="#2f2519"
                          deleteS={deleteStep}
                          color2="#fa7d09"
                          label={"Step" + " " + stepValue.toString()}
                          id="name"
                          i={i}
                          type="text"
                          placeholder="name"
                          onChange={(event) => {
                            handleStepChange(i, event);
                          }}
                          onBlur={formik.handleBlur}
                          value={steps[i]}
                        />
                      );
                    })}
                    {stepsE ? (
                      <h4>{stepsE}</h4>
                    ) : (
                      <h4 style={{ color: "white" }}>h</h4>
                    )}
                    <IoIosAddCircle
                      className="icon-2"
                      onClick={() => {
                        setNSteps(nSteps + 1);
                      }}
                    />

                    <TextArea
                      color="#2f2519"
                      color2="#fa7d09"
                      label="Result"
                      placeholder="result"
                      id="result"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.result}
                      error={
                        formik.touched.result && formik.errors.result
                          ? `${formik.errors.result}`
                          : null
                      }
                    />
                    <div className="button-container">
                      {submitted ? (
                        <Spinner color="#ff4301" />
                      ) : (
                        <ButtonSubmit />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="PageLoading">
                <Spinner color="#fa7d09" />
              </div>
            )}
          </div>
        </div>
      </FeedbackStyle>
    </>
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
      overflow:hidden;

      .content {
        width: 100%;
        height: auto;
        margin-top: 0px;
        overflow:auto;
      }
      .labels {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #2f2519;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 20px;
        background: white;
        .label-1 {
          width: 33.33%;
          h2 {
            font-size: 12px;
            font-family: "Raleway", sans-serif;
            letter-spacing: 0.2em;
            font-weight: 500;
            font-style: normal;
            color: #2f2519;
            text-transform: uppercase;
            margin-right: 5px;
          }
        }
        .label {
          width: 33.33%;
          h2 {
            font-size: 12px;
            font-family: "Raleway", sans-serif;
            letter-spacing: 0.2em;
            font-weight: 500;
            font-style: normal;
            color: #2f2519;
            text-transform: uppercase;
            width: 100%;
            margin-right: 5px;
          }
        }
      
      }
    }

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
        h3 {
            font-family: "Raleway", sans-serif;
            font-size: 15px;
            font-weight: 200;
            letter-spacing: 0.1em;
            color: #fa7d09;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          h4 {
            font-family: "Raleway", sans-serif;
            font-size: 10px;
            font-weight: 200;
            letter-spacing: 0.1em;
            color: #ee220c;
            margin-top: 5px;
          }
        .icon-2 {
            width: 30px;
            height: 30px;
            color: #fa7d09;
            cursor: pointer;
            margin-bottom: 15px;
            &:hover{
                color:#2f2519;
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
