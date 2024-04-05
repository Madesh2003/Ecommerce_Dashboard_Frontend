import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { saveAs } from "file-saver";
import Downloadbtn from "../../components/Downloadbtn";

const Subcategory = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      colors: []
    },
    series: [],
  });

  const [showOffered, setShowOffered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        const orders = response.data;

        const subcategoryCounts = {};

        orders.forEach((order) => {
          order.orders.forEach((orderItem) => {
            orderItem.items.forEach((item) => {
              if (!showOffered || (showOffered && item.isOfferPurchased)) {
                if (subcategoryCounts[item.subcategory]) {
                  subcategoryCounts[item.subcategory]++;
                } else {
                  subcategoryCounts[item.subcategory] = 1;
                }
              }
            });
          });
        });

        const allSubcategories = [...new Set(orders.flatMap(order => order.orders.flatMap(orderItem => orderItem.items.map(item => item.subcategory))))];

        allSubcategories.forEach(subcategory => {
          if (!subcategoryCounts.hasOwnProperty(subcategory)) {
            subcategoryCounts[subcategory] = 0;
          }
        });

        const labels = Object.keys(subcategoryCounts);
        const series = Object.values(subcategoryCounts);

        const colorNames = [
          "#ff7f0e",
          "#1f77b4",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
          "#ff9896",
          "#aec7e8",
          "#ffbb78",
          "#98df8a",
          "#ff9896",
          "#c5b0d5"
        ];

        const colors = labels.map((label, index) => colorNames[index % colorNames.length]);

        console.log("Labels:", labels);
        console.log("Series:", series);

        setChartData({
          options: {
            chart: {
              type: "pie",
            },
            labels: labels,
            colors: colors
          },
          series: series,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showOffered]);

  const downloadCSV = () => {
    let csvContent = "Subcategory,No.of.Soldproducts\n";

    chartData.series.forEach((count, index) => {
      const label = chartData.options.labels[index];
      csvContent += `${label},${count}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "product_sales.csv");
  };

  return (
    <div className="pie-chart">
      <div className="space-x-2">
        <label>
          Show Offered Products:
          </label>

          <input
            type="checkbox"
            checked={showOffered}
            onChange={() => setShowOffered(!showOffered)}
          />
      </div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width="750"
        />
      <Downloadbtn func={downloadCSV} />
    </div>
  );
};

export default Subcategory;
