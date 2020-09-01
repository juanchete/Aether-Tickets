import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

export default function LineGraph({
  years,
  getMonths,
  year,
  handleYearChange,
  month,
  tickets,
  data,
  theme,
}) {
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState(null);
  const [months, setMonths] = useState([
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

  const options = {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontFamily: `"Raleway", sans-serif`,
        fontColor: theme ? theme.thirdColor : "#2f2519",
      },
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            display: true,
            fontFamily: `"Raleway", sans-serif`,
            fontColor: theme ? theme.thirdColor : "#2f2519",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };
  return (
    <HomeStyle theme={theme}>
      <>
        <div className="years-containers">
          {years.map((year) => (
            <button
              className="year-button"
              onClick={() => {
                handleYearChange(year);
                getMonths(year, tickets);
                if (year != 2020) {
                  data.labels = [];
                  for (let i = 0; i <= 11; i++) {
                    data.labels.push(months[i]);
                  }
                }
              }}
            >
              <h2>{year}</h2>
            </button>
          ))}
        </div>
        {data != null ? (
          <div className="graph">
            <Line
              data={data}
              options={options}
              height={null}
              width={null}
              redraw
            />
          </div>
        ) : null}
      </>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100%;
  height: auto;
  background: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
  padding: 10px;
  .graph {
    width: "100%";
    height: "300px";
    background: ${(props) =>
      props.theme ? props.theme.secondaryColor : "#4a3f35"};
    font-family: "Raleway", sans-serif;
  }

  .years-containers {
    background: ${(props) =>
      props.theme ? props.theme.secondaryColor : "#4a3f35"};
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;

    .year-button {
      border: 2px solid
        ${(props) => (props.theme ? props.theme.primaryColor : "#fa7d09")};
      border-radius: 5px;
      height: 30px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
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
      }
    }
  }
`;
