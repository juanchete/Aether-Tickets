import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutGraph({ answered, notAnswered, delegated }) {
  const data = {
    labels: ["Answered", "Not Answered", "Delegated"],
    datasets: [
      {
        data: [answered, notAnswered, delegated],
        backgroundColor: ["#fa7d09", "#4a3f35", "#2f2519"],
        hoverBackgroundColor: ["#fa7d09", "#4a3f35", "#2f2519"],
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
