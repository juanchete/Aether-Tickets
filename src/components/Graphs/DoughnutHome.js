import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutGraph({ answered, notAnswered, theme }) {
  const data = {
    labels: ["Solved", "Delegated to Aether Solutions"],
    datasets: [
      {
        data: [answered, notAnswered],
        backgroundColor: [
          theme ? theme.primaryColor : "#fa7d09",
          theme ? theme.secondaryColor : "#4a3f35",
        ],
        hoverBackgroundColor: [
          theme ? theme.primaryColor : "#fa7d09",
          theme ? theme.secondaryColor : "#4a3f35",
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
