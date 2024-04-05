import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import {
  GridComponent,
  Inject,
  Toolbar,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { activeMenu } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  const toolbarOptions = ["Search"];
  const pageSettings = { pageSize: 10 };
  const searchOptions = {
    fields: ["productName", "customer.name", "offeredName", "status"],
  };

  const orderItems = orderData.flatMap((order) => {
    return order.orders.map((orderItem) => {
      let isOfferPurchased = false;
      if (typeof orderItem.items[0].isOfferPurchased === "string") {
        isOfferPurchased =
          orderItem.items[0].isOfferPurchased.toLowerCase() === "true";
      } else if (typeof orderItem.items[0].isOfferPurchased === "boolean") {
        isOfferPurchased = orderItem.items[0].isOfferPurchased;
      }

      const offeredName = isOfferPurchased
        ? orderItem.items[0].offerName
        : "None";
      const productPrice = isOfferPurchased
        ? parseFloat(orderItem.items[0].offeredPrice)
        : parseFloat(orderItem.items[0].productPrice);

      return {
        productName: orderItem.items[0].productName,
        customer: order.customer,
        productPrice: productPrice,
        status: orderItem.status,
        offeredName: offeredName,
        image: orderItem.items[0].images[0],
      };
    });
  });

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-64 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div className=" flex my-7 gap-10 flex-wrap justify-center">
            <div className="bg-white shadow-xl dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">Orders Table</p>
              </div>
              <div className="mt-7">
                <GridComponent
                  dataSource={orderItems}
                  width="auto"
                  height="auto"
                  allowPaging={true}
                  pageSettings={pageSettings}
                  allowSearching={true}
                  searchSettings={searchOptions}
                  toolbar={toolbarOptions}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field="image"
                      headerText="Image"
                      template={(rowData) => {
                        return (
                          <img
                            src={rowData.image}
                            alt={rowData.productName}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        );
                      }}
                    />
                    <ColumnDirective
                      field="productName"
                      headerText="Product Name"
                      className=" text-xl"
                    />
                    <ColumnDirective
                      field="customer.name"
                      headerText="Customer Name"
                    />
                    <ColumnDirective
                      field="customer.email"
                      headerText="Customer Email"
                    />
                    <ColumnDirective field="productPrice" headerText="Price" />
                    <ColumnDirective
                      field="offeredName"
                      headerText="Offername"
                    />
                    <ColumnDirective
                      field="status"
                      headerText="Status"
                      template={(rowData) => {
                        let statusColor = "";
                        let statusText = "";

                        if (rowData.status === "Delivered") {
                          statusColor = "green";
                          statusText = "Delivered";
                        } else if (rowData.status === "Progress") {
                          statusColor = "orange";
                          statusText = "Progress";
                        } else if (rowData.status === "Cancelled") {
                          statusColor = "red";
                          statusText = "Cancelled";
                        } else {
                          statusText = rowData.status;
                        }
                        return (
                          <span
                            style={{ color: statusColor }}
                            className=" font-medium uppercase flex items-center space-x-2 my-2"
                          >
                            <GoDotFill />
                            {statusText}
                          </span>
                        );
                      }}
                    />
                  </ColumnsDirective>

                  <Inject services={[Search, Page, Toolbar]} />
                </GridComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
