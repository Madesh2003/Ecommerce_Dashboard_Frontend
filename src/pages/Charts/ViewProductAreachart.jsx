import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ViewProductLineChartPage = ({ productName }) => {
  const [chartData, setChartData] = useState([]);
  const [lastFiveMonths, setLastFiveMonths] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        const soldProducts = response.data.filter(product =>
          product.orders.some(order =>
            order.items.some(item => 
              item.productName === productName && isWithinLast5Months(new Date(order.order_date))
            )
          )
        );
        setChartData(soldProducts);
        const totalSold = soldProducts.reduce((acc, product) => {
          return acc + product.orders.length;
        }, 0);
        setTotalProductsSold(totalSold);
        const totalRev = soldProducts.reduce((acc, product) => {
          const revenue = product.orders.reduce((revenueAcc, order) => {
            return revenueAcc + order.items.reduce((orderAcc, item) => {
              return orderAcc + (item.productName === productName ? parseFloat(item.productPrice) : 0);
            }, 0);
          }, 0);
          return acc + revenue;
        }, 0);
        setTotalRevenue(totalRev);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [productName]);
  
  useEffect(() => {
    const generateLastFiveMonths = () => {
      const currentMonthIndex = new Date().getMonth();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const lastFiveMonths = [];
      for (let i = currentMonthIndex - 4; i <= currentMonthIndex; i++) {
        const monthIndex = i < 0 ? 12 + i : i;
        lastFiveMonths.push(months[monthIndex]);
      }
      setLastFiveMonths(lastFiveMonths);
    };
    generateLastFiveMonths();
  }, []);

  const isWithinLast5Months = (date) => {
    const currentDate = new Date();
    const fiveMonthsAgo = new Date().setMonth(currentDate.getMonth() - 5);
    return date >= fiveMonthsAgo && date <= currentDate;
  };

  const getChartData = () => {
    const productCountByMonth = lastFiveMonths.map(month => {
      const salesInMonth = chartData.filter(item => {
        const orderMonth = new Date(item.orders[0].order_date).toLocaleString('en-us', { month: 'long' });
        return orderMonth === month && item.orders[0].items.some(item => item.productName === productName);
      });
      return salesInMonth.length;
    });
    return productCountByMonth;
  };
  
  const options = {
    chart: {
      type: 'line', 
      toolbar: {
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          reset: false,
          pan: false
        },
      },
    },
    colors: ["#422AFB"],
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false, 
    },
    xaxis: {
      categories: lastFiveMonths,
      labels: {
        style: {
          colors: 'black',
          fontSize: '11px',
        }
      }
    },
    yaxis: {
   
      forceNiceScale: true,
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      }
    },
  };
  

  return (
    <div>
      <Chart options={options} series={[{ name: 'Products Sold', data: getChartData() }]} type="line" height={250} width={450} />
      <div className=' space-y-2 font-medium tracking-wide'>
        <p>Sold Products: <span>{totalProductsSold}</span></p>
        <p>Revenue: <span>₹ {totalRevenue}</span></p>
      </div>
    </div>
  );
};

export default ViewProductLineChartPage;
