import React from "react";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  const chartData = {
    series: [
      {
        name: "Sales",
        data: [10, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
    },
  };

  return (
    <>
      <div style={{ width: "80%", margin: "auto" }}>
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
    </>
  );
};

export default Dashboard;
