import React, { useState, useEffect, useContext } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import { FaTicketAlt } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import Card from "../../components/cards/FeedbackCard";
import LineGraph from "../../components/Graphs/Line";
import DoughnutGraph from "../../components/Graphs/Doughnut";
import { useParams } from "react-router";
import { MdStar } from "react-icons/md";
import Slider from "react-slick";

export default function AsesorDetail({ theme, logo }) {
  const firebase = useFirebaseApp();
  const [asesor, setAsesor] = useState();
  const [amonestados, setAmonestado] = useState();
  const [months, setMonths] = useState(null);
  const [years, setYears] = useState();
  const [year, setYear] = useState(null);
  const [data, setData] = useState({
    labels: null,
    datasets: [
      {
        label: "Tickets",
        fill: "start",
        lineTension: 0.1,
        backgroundColor: theme ? theme.primaryColor : "#fa7d09",
        borderColor: theme ? theme.primaryColor : "#fa7d09",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: theme ? theme.primaryColor : "#fa7d09",
        pointBackgroundColor: theme ? theme.primaryColor : "#fa7d09",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme ? theme.primaryColor : "#fa7d09",
        pointHoverBorderColor: theme ? theme.primaryColor : "#fa7d09",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: null,
      },
    ],
  });

  const [label, setLabel] = useState(null);
  const [monthsSet, setMonthsSet] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  let settings = {
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 734,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    setData({
      labels: null,
      datasets: [
        {
          label: "Tickets",
          fill: "start",
          lineTension: 0.1,
          backgroundColor: theme ? theme.primaryColor : "#fa7d09",
          borderColor: theme ? theme.primaryColor : "#fa7d09",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: theme ? theme.primaryColor : "#fa7d09",
          pointBackgroundColor: theme ? theme.primaryColor : "#fa7d09",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: theme ? theme.primaryColor : "#fa7d09",
          pointHoverBorderColor: theme ? theme.primaryColor : "#fa7d09",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: null,
        },
      ],
    });
    const db = firebase.firestore();

    let docRef = db.collection("asesores").doc(id);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          db.collection("tickets-not-answered")
            .where("asesor", "==", id)
            .where("amonestado", "==", true)
            .onSnapshot((snapshot) => {
              const amonestadoData = [];
              snapshot.forEach((doc) =>
                amonestadoData.push({ ...doc.data(), id: doc.id })
              );
              console.log(amonestadoData); // <------
              setAmonestado(amonestadoData);
            });
          setAsesor(doc.data());
          if (doc.data().tickets) {
            let yearItem;

            const yearArray = [];
            doc.data().tickets.forEach((ticket) => {
              yearItem = new Date(ticket.updatedAt.toDate());
              yearItem = yearItem.getFullYear();
              setYear(yearItem);
              getMonths(yearItem, doc.data().tickets);
              if (yearArray.indexOf(yearItem) === -1) {
                yearArray.push(yearItem);
              }
            });
            yearArray.sort();
            setYears(yearArray);
          } else {
            let yearItem;

            const yearArray = [];

            yearItem = new Date();
            yearItem = yearItem.getFullYear();
            setYear(yearItem);
            getMonths(yearItem, null);

            yearArray.push(yearItem);
            setYears(yearArray);
          }
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const getMonths = (year, tickets) => {
    let yearToday = new Date();
    yearToday = yearToday.getFullYear();
    let month;
    let labe;
    if (yearToday === year) {
      month = new Date();
      month = month.getMonth();
      setMonths(month);
    } else {
      month = 11;
      setMonths(11);
    }

    if (month != 11) {
      labe = monthsSet;
      labe.splice(month + 1, 12 - month);
      setLabel(labe);
    } else {
      console.log("entre");
      labe = monthsSet;
      setLabel(labe);
    }

    let dataAux = data;

    data.labels = [];
    data.labels = labe;
    console.log(dataAux.labels);
    dataAux.datasets[0].data = getData(month, year, tickets);
    setData(dataAux);
  };

  const getData = (months, year, tickets) => {
    let nMonths = months + 1;
    let data = new Array(months.length);
    let monthItem;
    let yearItem;

    for (let i = 0; i < nMonths; i++) {
      data[i] = 0;
    }

    if (tickets) {
      tickets.forEach((ticket) => {
        yearItem = new Date(ticket.updatedAt.toDate());
        yearItem = yearItem.getFullYear();
        monthItem = new Date(ticket.updatedAt.toDate());
        monthItem = monthItem.getMonth();
        if (yearItem === year) {
          data[monthItem] = data[monthItem] + 1;
        }
      });
    }
    return data;
  };

  const handleYearChange = (year) => {
    setYear(year);
  };

  const getRating = (feedback) => {
    if (feedback) {
      let rating = 0;
      for (let i = 0; i < feedback.length; i++) {
        rating = rating + feedback[i].rating;
      }

      return rating / feedback.length;
    } else {
      return 0;
    }
  };

  const getAnswered = (tickets) => {
    if (tickets) {
      let answered = 0;
      var newArray = tickets.filter(function (el) {
        return el.status == "Answered";
      });
      return newArray.length;
    } else {
      return 0;
    }
  };

  const getDelegated = (tickets) => {
    if (tickets) {
      let answered = 0;
      var newArray = tickets.filter(function (el) {
        return el.status == "Delegated";
      });
      return newArray.length;
    } else {
      return 0;
    }
  };

  const getNotAnswered = (tickets) => {
    if (tickets) {
      let answered = 0;
      var newArray = tickets.filter(function (el) {
        return el.status == "Not Answered";
      });
      return newArray.length;
    } else {
      return 0;
    }
  };

  const user = useUser();
  return (
    <HomeStyle theme={theme}>
      <SidebarAdmin logo={logo} report={true} theme={theme} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {!loading && asesor ? (
              <>
                <h2>{asesor.name}</h2>
                <h1>{asesor.lastName}</h1>
              </>
            ) : null}
          </div>
        </div>
        <div className="container">
          {!loading && asesor ? (
            <>
              <div className="line-graph">
                <LineGraph
                  theme={theme}
                  years={years}
                  getMonths={getMonths}
                  year={year}
                  month={months}
                  handleYearChange={handleYearChange}
                  tickets={asesor.tickets}
                  data={data}
                />
              </div>
              <div className="statistics">
                <div className="statistics-avarage">
                  <div className="statistics-avarage-item">
                    <h2>Rating</h2>
                    <h3>{getRating(asesor.feedback).toString()}</h3>
                    <div className="icon-container">
                      <MdStar className="icon" />
                    </div>
                  </div>
                  <div className="statistics-avarage-item">
                    <h2>Reprimands</h2>
                    {amonestados ? <h3>{amonestados.length}</h3> : <h3>0</h3>}
                    <div className="icon-container">
                      <IoIosWarning className="icon" />
                    </div>
                  </div>
                  <div className="statistics-avarage-item">
                    <h2>Tickets</h2>
                    {asesor.tickets ? (
                      <h3>{asesor.tickets.length}</h3>
                    ) : (
                      <h3>0</h3>
                    )}
                    <div className="icon-container">
                      <FaTicketAlt className="icon" />
                    </div>
                  </div>
                </div>
                <div className="statistics-graph">
                  <DoughnutGraph
                    answered={getAnswered(asesor.tickets)}
                    notAnswered={getNotAnswered(asesor.tickets)}
                    delegated={getDelegated(asesor.tickets)}
                    theme={theme}
                  />
                </div>
              </div>
              {asesor.feedback ? (
                <div className="feedback-container">
                  {" "}
                  <h1>Feedback</h1>
                  <div className="feedback-container-slider">
                    <Slider {...settings} style={{ margin: "60px" }}>
                      {asesor.feedback.map((feedback) => (
                        <Card feedback={feedback} theme={theme} />
                      ))}
                    </Slider>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}{" "}
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
    height: 500px;

    .home-view-title {
        width: 70%;
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 80px;
        background:  ${(props) =>
          props.theme ? props.theme.secondaryColor : "#4a3f35"};
        border-bottom: 1px solid ${(props) =>
          props.theme ? props.theme.thirdColor : "#2f2519"};
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
    .container {
        margin-top: 80px;
        width: 70vw;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      max-width: none;
      .feedback-container {
        width: 100%;
        height: auto;

        .feedback-container-slider {
          display: block;
          width: 100%;

          .slick-prev:before,
          .slick-next:before {
            color: ${(props) =>
              props.theme ? props.theme.primaryColor : "#fa7d09"} !important;
          }

          .slick-slide {
            margin: 0 0px;
          }
          .slick-list {
            margin: 0 0px;
          }
        }

        h1 {
          font-size: 30px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: ${(props) =>
            props.theme ? props.theme.primaryColor : "#fa7d09"};
          text-transform: uppercase;
          margin-left: 20px;
        }
      }

      .line-graph {
        width: 100%;
        height: auto;
      }
      .statistics {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        .statistics-avarage {
          width: 65%;
          height: 80%;
          padding: 10px;
          padding-right: 0;
          display: flex;
          flex-direction: row;

          .statistics-avarage-item {
            background:  ${(props) =>
              props.theme ? props.theme.thirdColor : "#2f2519"};
            width: 200px;
            height: 100%;
            margin-right: 10px;
            border: 2px solid  ${(props) =>
              props.theme ? props.theme.thirdColor : "#2f2519"};
            border-radius: 5px;

            .icon-container {
              width: 100%;
              height: auto;
              display: flex;
              justify-content: center;

              .icon {
                width: 60px;
                height: 60px;
                color:  ${(props) =>
                  props.theme ? props.theme.secondaryColor : "#4a3f35"};
              }
            }

            h2 {
              font-size: 14px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 500;
              font-style: normal;
              color:  ${(props) =>
                props.theme ? props.theme.secondaryColor : "#4a3f35"};
              text-transform: uppercase;
              width: 100%;
              margin-top: 20px;
              margin-left: 10px;
            }
            h3 {
              font-size: 60px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 200;
              font-style: normal;
              color: ${(props) =>
                props.theme ? props.theme.primaryColor : "#fa7d09"};
              text-transform: uppercase;
              margin-left: 10px;
            }
          }
        }
        .statistics-graph {
          width: 300px;
          height: 100%;
        }
      }
    }
    }
  }
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    .home-view {
      width: 100vw;
      margin-left: 0;

      .home-view-title {
        width: 100%;
        height: 80px;
        margin-top: 90px;
      }
      .container {
        margin-top:170px;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    .home-view {
      width: 100vw;
      margin-left: 0;

      .home-view-title {
        width: 100%;
        height: 80px;
        margin-top: 90px;
      }
      .container {
        margin-top:170px;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .statistics {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            margin-top: 20px;
            .statistics-graph {
                width: 300px;
                height: 300px;
              }
            .statistics-avarage {
                width: 100%;
                height: 300px;
                padding: 10px;
                padding-right: 0;
                display: flex;
                flex-direction: row;
                justify-content:center;
                align-items:center;
      
                .statistics-avarage-item {
                  background:  ${(props) =>
                    props.theme ? props.theme.thirdColor : "#2f2519"};
                  width: 200px;
                  height: 100%;
                  margin-right: 10px;
                  border: 2px solid  ${(props) =>
                    props.theme ? props.theme.thirdColor : "#2f2519"};
                  border-radius: 5px;
                }
            }      
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    .home-view {
      width: 100vw;
      margin-left: 0;

      .home-view-title {
        width: 100%;
        height: 80px;
        margin-top: 90px;
      }
      .container {
        margin-top:170px;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .statistics {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            margin-top: 20px;
            .statistics-graph {
                width: 300px;
                height: 300px;
              }
            .statistics-avarage {
                width: 100%;
                height: auto;
                padding: 10px;
                padding-right: 0;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
                justify-content:center;
                align-items:center;
      
                .statistics-avarage-item {
                  background: #2f2519;
                  width: 200px;
                  height: 300px;
                  margin-right: 10px;
                  border: 2px solid #2f2519;
                  border-radius: 5px;
                  margin-bottom:15px;
                }
            }      
        }
      }
    }
  }
`;
