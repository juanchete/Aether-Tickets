import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutGraph({
  answered,
  notAnswered,
  delegated,
  theme,
}) {
  const data = {
    labels: ["Answered", "Not Answered", "Delegated"],
    datasets: [
      {
        data: [answered, notAnswered, delegated],
        backgroundColor: [
          theme ? theme.primaryColor : "#fa7d09",
          theme ? theme.secondaryColor : "#4a3f35",
          theme ? theme.thirdColor : "#2f2519",
        ],
        hoverBackgroundColor: [
          theme ? theme.primaryColor : "#fa7d09",
          theme ? theme.secondaryColor : "#4a3f35",
          theme ? theme.thirdColor : "#2f2519",
        ],
      },
    ],
  };
  const options = {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontFamily: `"Raleway", sans-serif`,
        fontColor: theme ? theme.thirdColor : "#2f2519",
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Doughnut
        data={data}
        height={null}
        width={null}
        options={options}
        redraw
      />
    </div>
  );
}
