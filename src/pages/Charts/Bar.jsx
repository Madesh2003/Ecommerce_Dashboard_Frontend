import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Downloadbtn from '../../components/Downloadbtn';

const Barchart = () => {
    const [productData, setProductData] = useState([]);
    const [showOffered, setShowOffered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/soldproducts/");
                const deliveredProducts = response.data.filter(product =>
                    product.orders.some(order => order.status === 'Delivered')
                  );
              
                  setProductData(deliveredProducts); 
                  console.log(deliveredProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredProductData = showOffered ? productData.filter(product => 
        product.orders.some(order => order.items.some(item => item.isOfferPurchased))
    ) : productData;

    const categoryCounts = filteredProductData.reduce((counts, product) => {
        product.orders.forEach(order => {
            order.items.forEach(item => {
                const category = item.category;
                counts[category] = (counts[category] || 0) + 1;
            });
        });
        return counts;
    }, {});


const categoryRevenue = filteredProductData.reduce((revenue, product) => {
    product.orders.forEach(order => {
        order.items.forEach(item => {
            const category = item.category;
            const price = item.productPrice || 0; 
            console.log(`Category: ${category}, Price: ${price}`);
            revenue[category] = (revenue[category] || 0) + price;
        });
    });
    return revenue;
}, {});


    const allCategories = Array.from(new Set(productData.flatMap(product => product.orders.flatMap(order => order.items.map(item => item.category)))));

    const labels = allCategories.map(category => categoryCounts[category] ? category : category);
    const dataValues = allCategories.map(category => categoryCounts[category] || 0);

    const chartData = {
        options: {
            chart: {
                type: 'bar',
                toolbar: {
                    tools: {
                        download: false,
                    },
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                }
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: labels,
                labels: {
                    style: {
                        colors: 'black',
                        fontSize: '14px',
                    },
                    rotate: -90,
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'black',
                        fontSize: "16px"
                    },
                    formatter: function (value) {
                        return Math.round(value);
                    }
                },
                min: 0, 
                max: Math.max(...dataValues) + 1, 
            },
            colors: ["#4318FF"]
        },
        series: [
            {
                name: 'Number of Products Sold',
                data: dataValues,
            },
        ],
    };

    const handleDownloadCSV = () => {
        const csvContent = `Category,Products Sold,Revenue\n${labels.map((label, index) => `${label},${dataValues[index]},${categoryRevenue[label] || 0}`).join('\n')}`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'product_data.csv');
    };

    return (
        <div>
            <div className='flex flex-wrap justify-between'>
                <div className='flex items-center space-x-4'>
                    <label className='font-semibold'>
                        Show Offered Products:
                    </label>
                    <input
                        type="checkbox"
                        checked={showOffered}
                        onChange={() => setShowOffered(!showOffered)}
                    />
                </div>
                <Downloadbtn func={handleDownloadCSV} />
            </div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={520} 
            />
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Revenue by Category:</h2>
                <ul>
                    {labels.map((label, index) => (
                        <li key={index}>{label}:  &#8377; {categoryRevenue[label] || 0}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Barchart;
