import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonSubmit from "../../components/buttons/Button-Submit";
import Input from "../../components/inputs/InputLogin";
import { IoMdClose } from "react-icons/io";

export default function AddCategory({ color, color2, show, showCategory }) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required Field"),
    }),

    onSubmit: async (valores) => {
      console.log("Submitted");
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
                  showCategory();
                }}
              />
            </div>
            <h1>Create Category</h1>
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
              <div className="button-error">
                <ButtonSubmit color="#fa7d09" />

                {/* <h4>Erroooooooooooooooor</h4> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Category>
  );
}
const Category = styled.div`
  .open {
    background: rgba(74, 63, 53, 0.4);
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    position: fixed;
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
      form {
        padding-right: 2rem;
        padding-left: 2rem;
        padding-top: 1.5rem;
        padding-bottom: 1rem;
        margin-bottom: 0.4rem;
        margin-top: 50px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

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
