import React, { useState, useEffect } from 'react';
import { orderBy } from 'lodash';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids'
import axios from 'axios';


const Topsellingproducts = () => {  

  const editing = { allowDeleting: false, allowEditing: false };

  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await axios.get('http://localhost:8000/soldproducts/');
        // Assuming data is in response.data
        const data = response.data;
        setSoldProducts(data); // Set fetched data to state
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);



  const pageSettings = { pageSize: 5 };
 

  const aggregateSalesByProduct = () => {
    const aggregatedData = {};
  
    // Iterate over each customer object in the fetched data
    soldProducts.forEach((customer) => {
      // Iterate over each order for the current customer
      customer.orders.forEach((order) => {
        // Check if the order status is "Delivered"
        if (order.status === "Delivered") {
          // Iterate over each item in the current order
          order.items.forEach((item) => {
            const {
              productName,
              brandName,
              category,
              productPrice,
              isOfferPurchased,
              offeredPrice,
            } = item;
  
            const key = `${productName}-${brandName}-${productPrice}`;
  
            if (aggregatedData[key]) {
              aggregatedData[key].sales += 1;
              if (isOfferPurchased === true) {
                aggregatedData[key].offeredSales += 1;
              }
            } else {
              aggregatedData[key] = {
                productName,
                brandName,
                category,
                productPrice,
                sales: 1,
                offeredSales: isOfferPurchased === true ? 1 : 0,
                offeredPrice: isOfferPurchased === true ? offeredPrice : null,
              };
            }
          });
        }
      });
    });
  
    return Object.values(aggregatedData).filter((product) => product.sales > 0);
  };
  

  const topSellingProducts = orderBy(aggregateSalesByProduct(), ['sales'], ['desc']).slice(0, 5);

  return (
    <div>
      
      <GridComponent 
      dataSource={topSellingProducts}
      width="auto"
      height="auto"
      allowPaging={false}
      allowSorting
      editSettings={editing}>
          <ColumnsDirective>
          <ColumnDirective field="productName" headerText="Product Name" />
          <ColumnDirective field="sales" headerText="Sales" />
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
         </GridComponent>
      </div>
  );
};

export default Topsellingproducts;