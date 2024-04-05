import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const SoldProductsContext = createContext();

const SoldProductsProvider = ({ children }) => {
  const [soldProduct, setSoldProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/soldproducts/");
      
      const deliveredProducts = response.data.filter(product =>
        product.orders.some(order => order.status === 'Delivered')
      );
  
      setSoldProduct(deliveredProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalRevenue = () => {
    return soldProduct.reduce((total, product) => {
      if (product.orders && product.orders.length > 0) {
        product.orders.forEach(order => {
          order.items.forEach(item => {
            const price = item.isOfferPurchased === 'true' ? parseFloat(item.offeredPrice) : parseFloat(item.productPrice);
            total += price; 
          });
        });
      } else {
        console.log("No orders found for the product");
      }
  
      return total;
    }, 0);
  };

  const calculateTodayRevenue = () => {
    const currentDate = new Date();
    let todayRevenue = 0;

    soldProduct.forEach(product => {
      product.orders.forEach(order => {
        const orderDate = new Date(order.order_date);

        if (
          orderDate.getDate() === currentDate.getDate() &&
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          order.items.forEach(item => {
            const price =
              item.isOfferPurchased === 'true'
                ? parseFloat(item.offeredPrice)
                : parseFloat(item.productPrice);
            todayRevenue += price;
          });
        }
      });
    });

    return todayRevenue;
  };

  const calculateWeekRevenue = () => {
    const currentDate = new Date();
    let weekRevenue = 0;
    
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    
    soldProduct.forEach(product => {
      product.orders.forEach(order => {
        const orderDate = new Date(order.order_date);
    
        if (
          orderDate >= startOfWeek &&
          orderDate < endOfWeek &&
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          order.items.forEach(item => {
            const price = item.isOfferPurchased === 'true' ?
              parseFloat(item.offeredPrice) :
              parseFloat(item.productPrice);
            weekRevenue += price;
          });
        }
      });
    });
    
    return weekRevenue;
  };
  
  
  const calculateMonthRevenue = () => {
    const currentDate = new Date();
    let monthRevenue = 0;

    soldProduct.forEach(product => {
      product.orders.forEach(order => {
        const orderDate = new Date(order.order_date);

        if (
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          order.items.forEach(item => {
            const price =
              item.isOfferPurchased === 'true'
                ? parseFloat(item.offeredPrice)
                : parseFloat(item.productPrice);
            monthRevenue += price;
          });
        }
      });
    });

    return monthRevenue;
  };

  const calculateProductsSoldToday = () => {
    const currentDate = new Date();
    let productsSoldToday = 0;
  
    soldProduct.forEach(product => {
      product.orders.forEach(order => {
        const orderDate = new Date(order.order_date);
  
        if (
          orderDate.getDate() === currentDate.getDate() &&
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          productsSoldToday += order.items.length;
        }
      });
    });
  
    return productsSoldToday;
  };
  
  const calculateProductsSoldThisWeek = () => {
    const currentDate = new Date();
    let productsSoldThisWeek = 0;
  
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
  
    soldProduct.forEach(product => {
      product.orders.forEach(order => {
        const orderDate = new Date(order.order_date);
  
        if (
          orderDate >= startOfWeek &&
          orderDate < endOfWeek &&
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          productsSoldThisWeek += order.items.length;
        }
      });
    });
  
    return productsSoldThisWeek;
  };
  
  
  const calculateProductsSoldThisMonth = () => {
    const currentDate = new Date();
    let productsSoldThisMonth = 0;
  
    soldProduct.forEach(product => {
      product.orders.forEach(order => {
        const orderDate = new Date(order.order_date);
  
        if (
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          productsSoldThisMonth += order.items.length;
        }
      });
    });
  
    return productsSoldThisMonth;
  };
  

  const downloadCSV = () => {
    const csvData = soldProduct.map(product => {
      const order = product.orders.find(order => order.status === 'Delivered'); 
      const item = order.items[0]; 
      const productName = item.productName;
      const price = item.isOfferPurchased === 'true' ? parseFloat(item.offeredPrice) : parseFloat(item.productPrice);
      const orderDate = order.order_date;
      const year = orderDate ? new Date(orderDate).getFullYear() : 'N/A';
  
      return `${productName},${price},${year}`;
    });
  
    const csvContent = `Product Name,Price,Year\n${csvData.join('\n')}`;
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  
    saveAs(blob, 'sold_products_data.csv');
  };

  const contextValue = {
    soldProduct,
    calculateTotalRevenue,
    calculateTodayRevenue,
    calculateWeekRevenue,
    calculateMonthRevenue,
    calculateProductsSoldToday,
    calculateProductsSoldThisWeek,
    calculateProductsSoldThisMonth,
    downloadCSV,
  };
  
  return (
    <SoldProductsContext.Provider value={contextValue}>
      {children}
    </SoldProductsContext.Provider>
  );
};

const useSoldProducts = () => {
  return useContext(SoldProductsContext);
};

export { SoldProductsProvider, useSoldProducts };
