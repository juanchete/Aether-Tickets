import React, { useState } from "react";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";
import Accordion from "../../components/Accordion";

export default function Faq() {
  const [faqs, setfaqs] = useState([
    {
      question: "How many programmers does it take to screw in a lightbulb?",
      answer: "None. We don't address hardware issues.",
      open: true,
    },
    {
      question: "Who is the most awesome person?",
      answer: "You. The Viewer.",
      open: false,
    },
    {
      question:
        "How many questions does it take to make a successful FAQ Page?",
      answer: "This many.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  const usuario = useUser()


  return (
    <HomeStyle>
      <SidebarUser ticket={true} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>FAQS</h2>
          </div>
        </div>
        <div className="container">
          <div className="faqs">
            <div className="faq-title">
              <h2>Category 1</h2>
            </div>
            {faqs.map((faq, i) => (
              <Accordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))}
          </div>
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

    .faqs {
      width: 100%;
      margin: 0 auto;
      padding: 15px;

      .faq-title {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        h2 {
          font-size: 20px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-style: normal;
          color: #ff4301;
          text-transform: uppercase;
          width: 100%;
          margin-right: 5px;
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
      background: #4a3f35;
      border-bottom: 1px solid #2f2519;
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: #ff4301;
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
    .container {
      margin-top: 80px;
      width: 70vw;
      height: auto;
      padding: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
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
        margin-top: 80px;
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
