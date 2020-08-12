import React from "react";
import styled from "styled-components";

export default function Accordion({
  color,
  color2,
  fontSize,
  marginBottom,
  marginRight,
  children,
  faq,
  index,
  toggleFAQ,
  ...rest
}) {
  return (
    <AccordionStyle
      marginBottom={marginBottom}
      color={color}
      color2={color2}
      fontSize={fontSize}
      marginRight={marginRight}
    >
      <div
        className={"faq " + (faq.open ? "open" : "")}
        key={index}
        onClick={() => toggleFAQ(index)}
      >
        <div className="faq-question">{faq.question}</div>
        <div className="faq-answer">{faq.answer}</div>
      </div>
    </AccordionStyle>
  );
}
const AccordionStyle = styled.div`
  .faq {
    margin: 5px;
    padding: 15px;
    background-color: #2f2519;
    border-radius: 5px;
  }

  .faq .faq-question {
    position: relative;
    font-size: 12px;
    padding-right: 80px;
    transition: all 0.4s ease;
    font-family: "Raleway", sans-serif;
    letter-spacing: 0.2em;
    font-weight: 400;
    font-style: normal;
    color: white;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .faq .faq-question::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;

    background-image: url("./arrow-down-mint.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: all 0.4s ease-out;
  }

  .faq .faq-answer {
    opacity: 0;
    max-height: 0;
    overflow-y: hidden;
    transition: all 0.4s ease-out;
    font-family: "Raleway", sans-serif;
    color: white;
    margin-left: 15px;
  }

  .faq.open .faq-question {
    margin-bottom: 15px;
  }

  .faq.open .faq-question::after {
    transform: translateY(-50%) rotate(180deg);
  }

  .faq.open .faq-answer {
    max-height: 1000px;
    opacity: 1;
  }
`;
