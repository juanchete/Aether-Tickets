import React, { useEffect, useState } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import firebase from "firebase";
import styled from "styled-components";
import Accordion from "../components/Accordion";

export default function FaqComponent(category) {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState();
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(true);
  const [faqs, setfaqs] = useState([]);
  useEffect(() => {
    setLoading(true);
    console.log(category.category);
    return db
      .collection("suggestions")
      .where("category", "==", category.category)
      .where("available", "==", true)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const categoryData = [];
        snapshot.forEach((doc) => {
          let faq = {
            id: doc.id,
            question: doc.data().name,
            answer: doc.data().suggestion,
            open: false,
          };
          console.log(faq);
          categoryData.push(faq);
        });

        console.log(categoryData); // <------
        setfaqs(categoryData);
        setLoading(false);
      });
  }, []);

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

  const usuario = useUser();

  return (
    <HomeStyle>
      {!loading && faqs.length > 0 ? (
        <>
          {faqs.map((faq, i) => (
            <Accordion faq={faq} index={i} toggleFAQ={toggleFAQ} />
          ))}
        </>
      ) : (
        <div className="no-suggestions">
          <h2>There are no Suggestions Available</h2>
        </div>
      )}
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100%;
  .no-suggestions {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 15px;
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

  @media only screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;
