import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

export const useCustomerContext = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const [uniqueCustomerCount, setUniqueCustomerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/soldproducts/');
        const uniqueCount = calculateUniqueCustomerCount(response.data);
        setUniqueCustomerCount(uniqueCount);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateUniqueCustomerCount = (data) => {
    const uniqueCustomers = new Set(); 
    
    data.forEach((product) => {
      
      const customerIdentifier = product.customer.email; 
  
      uniqueCustomers.add(customerIdentifier);
    });
  
    return uniqueCustomers.size;
  };
  

  return (
    <CustomerContext.Provider value={{ uniqueCustomerCount }}>
      {children}
    </CustomerContext.Provider>
  );
};
