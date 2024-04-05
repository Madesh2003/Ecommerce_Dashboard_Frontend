import React, { useEffect, useState } from "react";
import axios from "axios";
import { orderBy } from "lodash";
import {
  GridComponent,
  Inject,
  Toolbar,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

const imageTemplate = (props) => {
  return (
    <img
      src={props.images[0]}
      alt="Product"
      style={{ width: "80px", height: "80px" }} 
    />
  );
};

const Topsellingproducts = () => {
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



  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: false, allowEditing: false };
  const pageSettings = { pageSize: 5 };
  const searchOptions = {
    fields: ["productName"],
  };

  const aggregateSalesByProduct = () => {
    const aggregatedData = {};
  
    soldProducts.forEach((customer) => {
      customer.orders.forEach((order) => {
        if (order.status === "Delivered") {
          order.items.forEach((item) => {
            const {
              productName,
              images,
              brandName,
              category,
              productPrice,
              isOfferPurchased,
              offeredPrice,
              offerName,
            } = item;
  
            const key = `${productName}-${brandName}-${category}-${productPrice}`;
  
            if (aggregatedData[key]) {
              aggregatedData[key].sales += 1;
              if (isOfferPurchased === true) {
                aggregatedData[key].offeredSales += 1;
              }
            } else {
              aggregatedData[key] = {
                productName,
                images,
                brandName,
                category,
                productPrice,
                sales: 1,
                offeredSales: isOfferPurchased === true ? 1 : 0,
                offeredPrice: isOfferPurchased === true ? offeredPrice : null,
                offerName: isOfferPurchased === true ? offerName : null,
              };
            }
          });
        }
      });
    });
  
    return Object.values(aggregatedData).filter((product) => product.sales > 0);
  };
  

const soldProductsData = orderBy(
  aggregateSalesByProduct(),
  ["sales"],
  ["desc"]
);

  return (
    <div>
      <style>
        {`
          .e-grid * {
            font-size: 16px !important;
          }
        `}
      </style>
      <GridComponent
        dataSource={soldProductsData}
        width="auto"
        height="auto"
        allowPaging={true}
        pageSettings={pageSettings}
        editSettings={editing}
        allowSearching={true}
        searchSettings={searchOptions}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="productName" headerText="Product Name" />
          <ColumnDirective
            headerText="Images"
            width="150"
            template={imageTemplate}
          />
          <ColumnDirective field="brandName" headerText="Brand Name" />
          <ColumnDirective field="category" headerText="Category" />
          <ColumnDirective field="productPrice" headerText="Price" />
          <ColumnDirective field="sales" headerText="Sales" />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Topsellingproducts;
