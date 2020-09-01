import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutGraph({ answered, notAnswered }) {
  const data = {
    labels: ["Solved", "Delegated to Aether Solutions"],
    datasets: [
      {
        data: [answered, notAnswered],
        backgroundColor: ["#fa7d09", "#4a3f35"],
        hoverBackgroundColor: ["#fa7d09", "#4a3f35"],
      },
    ],
  };
  const options = {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontFamily: `"Raleway", sans-serif`,
        fontColor: "#2f2519",
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
