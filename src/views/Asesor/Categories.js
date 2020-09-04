import React, { useState, useEffect } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import Card from "../../components/cards/Category&SuggestionCard";

export default function Categories({ theme, logo }) {
  const firebase = useFirebaseApp();
  const [categories, setCategories] = useState();
  const [filterAvailable, setFilterAvailable] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    const db = firebase.firestore();
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

  const setFilter = (filter) => {
    if (filter != null) {
      setLoading(true);
      const db = firebase.firestore();
      return (
        db
          .collection("categories")
          .where("available", "==", filter)
          // .where("role", "==", "asesor")
          .onSnapshot((snapshot) => {
            const categoriesData = [];
            snapshot.forEach((doc) =>
              categoriesData.push({ ...doc.data(), id: doc.id })
            );
            console.log(categoriesData); // <------
            setCategories(categoriesData);
            setLoading(false);
          })
      );
    } else {
      setLoading(true);
      const db = firebase.firestore();
      return (
        db
          .collection("categories")
          // .where("role", "==", "asesor")
          .onSnapshot((snapshot) => {
            const categoriesData = [];
            snapshot.forEach((doc) =>
              categoriesData.push({ ...doc.data(), id: doc.id })
            );
            console.log(categoriesData); // <------
            setCategories(categoriesData);
            setLoading(false);
          })
      );
    }
  };
  const user = useUser();
  return (
    <HomeStyle theme={theme} filter={filterOpen}>
      <SidebarAdmin logo={logo} category={true} theme={theme} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>All</h2>
            <h1>Categories</h1>
          </div>
        </div>
        <div className="filters">
          <button
            className="add-filter"
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          >
            <h2>Add Filter</h2>
          </button>
          {filterAvailable ? (
            <div
              className="filter-applied"
              onClick={() => {
                setFilterAvailable(null);
                setFilter(null);
                setFilterOpen(false);
              }}
            >
              <IoIosCheckmarkCircle className="icon-check" />
              <IoIosCloseCircle className="icon" />
              <h2>{filterAvailable}</h2>
            </div>
          ) : null}
        </div>
        <ul className="filter-options">
          <li
            className="filter-options-item"
            onClick={() => {
              setFilterAvailable("Available");
              setFilter(true);
              setFilterOpen(false);
            }}
          >
            <h2>Available</h2>
          </li>
          <li
            className="filter-options-item"
            onClick={() => {
              setFilterAvailable("Not Available");
              setFilter(false);
              setFilterOpen(false);
            }}
          >
            <h2>Not Available</h2>
          </li>
        </ul>
        <div className="container">
          {!loading ? (
            <>
              {categories ? (
                <>
                  {" "}
                  {categories.map((category) => (
                    <Card
                      category={category}
                      color={theme ? theme.thirdColor : "#2f2519"}
                      color2={theme ? theme.primaryColor : "#fa7d09"}
                      theme={theme}
                    />
                  ))}
                </>
              ) : null}{" "}
            </>
          ) : null}
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
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
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
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }
    .filter-options {
      width: 120px;
      height: 80px;
      z-index: 50;
      background: white;
      margin-left: 10px;
      position: absolute;
      border: 1px solid white;
      border-radius: 5px;
      margin-top: 130px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      ${(props) => (props.filter ? "" : "display:none;")}
      .filter-options-item {
        width: 100%;
        height: 40px;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        align-items: center;
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          width: 100%;
          margin-left: 5px;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .filter-sub {
      width: 120px;
      height: 200px;
      z-index: 50;
      background: white;
      margin-left: 140px;
      position: absolute;
      border: 1px solid white;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      margin-top: 130px;
      ${(props) => (props.sub ? "" : "display:none;")}
      .filter-sub-item {
        width: 100%;
        height: 40px;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        align-items: center;
        h2 {
          font-size: 15px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          width: 100%;
          margin-left: 5px;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .filter-sub-2 {
      width: 120px;
      height: 160px;
      z-index: 50;
      background: white;
      margin-left: 140px;
      position: absolute;
      border: 1px solid white;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      ${(props) => (props.subP ? "" : "display:none;")}
      .filter-sub-item {
        width: 100%;
        height: 40px;
        display: flex;
        border: 1px solid white;
        border-radius: 5px;
        align-items: center;
        h2 {
          font-size: 15px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          width: 100%;
          margin-left: 5px;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .filters {
      margin-top: 80px;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: fixed;
      background: white;

      .add-filter {
        border: 2px solid
          ${(props) => (props.theme ? props.theme.primaryColor : "#fa7d09")};
        border-radius: 5px;
        height: 40px;
        margin-left: 10px;
        padding-left: 5px;
        padding-right: 5px;
        h2 {
          font-size: 12px;
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
      }
      .filter-applied {
        border: 2px solid
          ${(props) => (props.theme ? props.theme.primaryColor : "#fa7d09")};
        border-radius: 5px;
        height: 40px;
        margin-left: 10px;
        padding-left: 5px;
        padding-right: 5px;
        background: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        display: flex;
        flex-direction: row;
        align-items: center;

        &:hover {
          .icon {
            display: block;
          }
          .icon-check {
            display: none;
          }
        }

        .icon-check {
          color: ${(props) =>
            props.theme ? props.theme.secondaryColor : "#4a3f35"};
          width: 30px;
          height: 30px;
        }
        .icon {
          display: none;
          color: ${(props) =>
            props.theme ? props.theme.secondaryColor : "#4a3f35"};
          width: 30px;
          height: 30px;
        }
        h2 {
          font-size: 12px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.secondaryColor : "#4a3f35"};
          text-transform: uppercase;
          width: 100%;
          margin-left: 10px;
        }
      }
    }
    .container {
      margin-top: 130px;
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
        margin-top: 130px;
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
