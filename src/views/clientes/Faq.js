import React, { useEffect, useState } from "react";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";
import Accordion from "../../components/Accordion";
import FaqComponent from "../../components/FaqComponent";
import { NavLink, withRouter } from "react-router-dom";

export default function Faq() {
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [categories, setCategories] = useState();
  let [path, setPath] = React.useState("/new-ticket/");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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

  const usuario = useUser();

  return (
    <HomeStyle>
      <SidebarUser ticket={true} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>FAQS</h2>
          </div>
        </div>
        {!loading && categories ? (
          <div className="container">
            {categories.map((category) => (
              <div className="faqs">
                <div className="faq-title">
                  <h2>{category.name}</h2>
                  <NavLink className="new-ticket" to={path + category.id}>
                    <h3>New {category.name} Ticket</h3>
                  </NavLink>
                </div>
                {category.suggestions.length > 0 ? (
                  <FaqComponent category={category.id} />
                ) : (
                  <div className="no-suggestions">
                    <h2>There are no Suggestions Available</h2>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null}
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

      .new-ticket {
        width: 200px;
        height: 35px;
        background: #ff4301;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: 1px solid #ff4301;
        border-radius: 5px;
        h3 {
          font-size: 10px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.1em;
          font-weight: 500;
          font-style: normal;
          color: white;
          text-transform: uppercase;
          width: 100%;
        }
      }
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
        }
      }
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
