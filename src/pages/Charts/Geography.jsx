import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export function WorldMap() {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        const ordersData = response.data;

        const aggregated = aggregateData(ordersData);
        setAggregatedData(aggregated);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);


  function aggregateData(ordersData) {
    const aggregatedData = {};
    ordersData.forEach((order) => {
      if (aggregatedData[order.customer.address.country]) {
        aggregatedData[order.customer.address.country] += order.orders.length;
      } else {
        aggregatedData[order.customer.address.country] = order.orders.length;
      }
    });
    return aggregatedData;
  }

  return (
     <Chart
     className="xl:w-[950px] xl:h-[700px] lg:w-[700px] lg:h-[500px] md:w-[600px] md:h-[500px] sm:w-[400px] sm:h-[300px] max-sm:w-[300px] max-sm:h-[300px]"
      chartType="GeoChart"
      data={[
        ["Country", "Products Sold"],
        ...Object.entries(aggregatedData).map(([country, productsSold]) => [
          country,
          productsSold,
        ]),
      ]}
      options={{
        region: "world",
        colorAxis: { colors: ["#B0A5DF", "#5F3AFF"] },
      }}
    />
  );
}
