import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Downloadbtn from '../../components/Downloadbtn';

const Areachartpage = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showOfferedOnly, setShowOfferedOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        const deliveredProducts = response.data.filter(product =>
          product.orders.some(order => order.status === 'Delivered')
        );
        setChartData(deliveredProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const getChartData = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const filteredData = chartData.filter(item => {
      const orderYear = new Date(item.orders[0].order_date).getFullYear();
      return orderYear === selectedYear && item.orders[0].status === "Delivered" &&
        (!showOfferedOnly || item.orders[0].items[0].isOfferPurchased);
    });
  
    const productCountByMonth = months.map(month => {
      const salesInMonth = filteredData.filter(item => {
        const orderMonth = new Date(item.orders[0].order_date).toLocaleString('en-us', { month: 'long' });
        return orderMonth === month;
      });
      return salesInMonth.length;
    });
  
    return productCountByMonth;
  };

  const calculateTotalProducts = () => {
    const filteredData = chartData.filter(item => {
      const orderYear = new Date(item.orders[0].order_date).getFullYear();
      return orderYear === selectedYear && item.orders[0].status === "Delivered" &&
        (!showOfferedOnly || item.orders[0].items[0].isOfferPurchased);
    });
  
    return filteredData.length;
  };

  const calculateTotalRevenue = () => {
    const filteredData = chartData.filter(item => {
      const orderYear = new Date(item.orders[0].order_date).getFullYear();
      return orderYear === selectedYear && item.orders[0].status === "Delivered" &&
        (!showOfferedOnly || item.orders[0].items[0].isOfferPurchased);
    });
  
    const totalRevenue = filteredData.reduce((total, item) => {
      const orders = item.orders.filter(order => order.status === "Delivered");
      const revenue = orders.reduce((acc, order) => {
        const price = order.isOfferPurchased ? order.offeredPrice : order.items[0].productPrice;
        return acc + parseFloat(price);
      }, 0);
      return total + revenue;
    }, 0);
  
    return totalRevenue; 
  };

  const options = {
    chart: {
      type: 'area',
      toolbar: {
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
      },
    },
    colors: ["#422AFB"],
    fill: {
      colors: "#422AFB",
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      style: {
        colors: ['#422AFB'],
      }
    },
    xaxis: {
      categories: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      labels: {
        style: {
          colors: 'black',
          fontSize: '11px',
        }
      }
    },
  };

  const downloadCSV = () => {
    const csvData = chartData.map(item => {
      const orderDate = new Date(item.orders[0].order_date);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.toLocaleString('en-us', { month: 'long' });
      const price = item.orders[0].items[0].isOfferPurchased ? parseFloat(item.orders[0].items[0].offeredPrice) : parseFloat(item.orders[0].items[0].productPrice);
      return `${item.orders[0].items[0].productName},${item.orders[0].items[0].brandName},${price},${orderMonth},${orderYear}`;
    });
  
    const csvContent = `Product Name,Brand Name,Price,Order Month,Order Year\n${csvData.join('\n')}`;
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `chart_data_${selectedYear}.csv`);
  };

  const handleCheckboxChange = (e) => {
    setShowOfferedOnly(e.target.checked);
  };

  return (
    <div className=' mt-10'>
      <label className=' font-semibold capitalize' htmlFor="yearSelect">Select Year:</label>
      <select className='font-semibold ml-2' id="yearSelect" onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))} value={selectedYear}>
        {[2021, 2022, 2023, 2024].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label className='ml-4 font-semibold'>
        <input type="checkbox" checked={showOfferedOnly} onChange={handleCheckboxChange} />
        Show Offered Products Only
      </label>

      <Chart className="mt-5" options={options} series={[{ name: 'Products Sold', data: getChartData() }]} type="area" height={420} />

      <div className='text-xl mt-5 font-semibold flex justify-evenly'>
        <div>
          <p>Sold Products <span className='text-brand-500'>{calculateTotalProducts()}</span></p>
          <p>Revenue <span className=' text-brand-500'>₹ {calculateTotalRevenue()}</span></p>
        </div>
        <div>
          <Downloadbtn func={downloadCSV} />
        </div>
      </div>
    </div>
  );
};

export default Areachartpage;
