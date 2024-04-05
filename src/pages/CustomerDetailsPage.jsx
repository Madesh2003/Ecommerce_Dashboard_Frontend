import React, { useState, useEffect } from 'react';
import { orderBy } from 'lodash';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { useSoldProducts } from '../contexts/revenuecontext';
import axios from 'axios';

const LatestlyOrdered = () => {  
  const { soldProduct } = useSoldProducts();
  const editing = { allowDeleting: false, allowEditing: false };
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/soldproducts/');
        const data = response.data;
        setSoldProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const pageSettings = { pageSize: 5 };

  const latestOrderedProducts = () => {
    // Flatten all the orders to get a single array of all ordered items
    const allItems = soldProducts.flatMap(customer => customer.orders.flatMap(order => order.items));

    // Sort the items by order date in descending order
    const sortedItems = orderBy(allItems, ['order_date'], ['desc']);

    // Take the latest five items
    const latestFiveItems = sortedItems.slice(0, 5);

    // Construct an array containing product name and order date
    const latestProducts = latestFiveItems.map(item => {
      const orderDate = item.order_date ? new Date(item.order_date.trim()) : null;
      const formattedOrderDate = orderDate instanceof Date && !isNaN(orderDate) ? orderDate.toLocaleDateString() : "N/A";
      return {
        productName: item.productName,
        orderDate: formattedOrderDate
      };
    });

    return latestProducts;
  };

  const orderedProducts = latestOrderedProducts();

  return (
    <div>
      <GridComponent 
        dataSource={orderedProducts}
        width="auto"
        height="auto"
        allowPaging={false}
        allowSorting
        editSettings={editing}>
        <ColumnsDirective>
          <ColumnDirective field="productName" headerText="Product Name" />
          <ColumnDirective field="orderDate" headerText="Order Date" />
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default LatestlyOrdered;
