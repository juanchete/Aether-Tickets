import React, { useState } from "react";
import { useUser, useFirebaseApp } from "reactfire";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";
import Input from "../../components/inputs/InputTicket";
import Select from "../../components/inputs/SelectTicket";
import TextEditor from "../../components/inputs/TextEditor";

export default function NewTicket() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const onEditorChange = (value) => {
    setText(value);
    console.log(text);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };
  const formik = useFormik({
    initialValues: {
      subject: "",
      name: "",
      lastName: "",
      email: "",
      category: "",
      content: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required Field"),
      password: Yup.string().required("Required Field"),
      subject: Yup.string().required("Required Field"),
      name: Yup.string().required("Required Field"),
      lastName: Yup.string().required("Required Field"),
    }),

    onSubmit: (valores) => {
      console.log("Submitted");
    },
  });
  return (
    <HomeStyle>
      <SidebarUser />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>New</h2>
            <h1>Ticket</h1>
          </div>
        </div>
        <div className="container-form">
          <form onSubmit={formik.handleSubmit}>
            <Input
              color="#2f2519"
              color2="#ff4301"
              label="Subject"
              id="subject"
              fontSize="10px"
              type="subject"
              placeholder="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              error={
                formik.touched.subject && formik.errors.subject
                  ? `${formik.errors.subject}`
                  : null
              }
            />
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
              fontSize="10px"
              type="email"
              placeholder="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={
                formik.touched.email && formik.errors.email
                  ? `${formik.errors.email}`
                  : null
              }
            />
            <Select
              color="#2f2519"
              color2="#ff4301"
              label="Category"
              id="category"
              fontSize="10px"
              type="category"
              placeholder="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              error={
                formik.touched.category && formik.errors.category
                  ? `${formik.errors.category}`
                  : null
              }
            />
            <TextEditor
              onEditorChange={onEditorChange}
              onFilesChange={onFilesChange}
            />
            <div className="button-container">
              <button className="button-submit" type="submit">
                <h2>Submit</h2>
              </button>
            </div>
          </form>
        </div>
      </div>
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

    .home-view-title {
      width: 70%;
      display: flex;
      position: fixed;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 80px;
      background: #4a3f35;
      border-bottom: 1px solid #2f2519;
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: #3a343c;
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: #ff4301;
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }

    .container-form {
      width: 500px;
      height: auto;
      margin: auto;
      margin-top: 100px;

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

    .button-container{
        width:100%;
        height:60px;
        display:flex;
        align-items:center;
        justify-content:flex-end;
    }
    .button-submit{
        padding-left:25px;
        padding-right:25px;
        height:40px;
        background: #4a3f35;
        border: 1px solid #ff4301;
        border-radius:5px;


        h2{
            font-size: 12px;
            font-family: "Raleway", sans-serif;
            letter-spacing: 0.2em;
            font-weight: 300;
            font-style: normal;
            color: #ff4301;
            text-transform: uppercase;
        }
    }
    }
}}

  @media only screen and (max-width: 1100px) {
    width: 100vw;
    display: flex;
    flex-direction: row;
    .home-view {
      width: 100%;
      margin-left: 0;
      margin-top: 90px;
  
      .home-view-title {
        width: 100vw;
        display: flex;
        position: fixed;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 80px;
        background: #4a3f35;
        border-bottom: 1px solid #2f2519;
        h1 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #3a343c;
          text-transform: uppercase;
          width: 100%;
        }
        h2 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: #ff4301;
          text-transform: uppercase;
          width: 100%;
          margin-right: 5px;
        }
      }
  
      .container-form {
        width: 100%;
        height: auto;
        margin: auto;
        margin-top: 100px;
  
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
  
      .button-container{
          width:100%;
          height:60px;
          display:flex;
          align-items:center;
          justify-content:flex-end;
      }
      .button-submit{
          padding-left:25px;
          padding-right:25px;
          height:40px;
          background: #4a3f35;
          border: 1px solid #ff4301;
          border-radius:5px;
  
  
          h2{
              font-size: 12px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 300;
              font-style: normal;
              color: #ff4301;
              text-transform: uppercase;
          }
      }
      }
    }
`;
