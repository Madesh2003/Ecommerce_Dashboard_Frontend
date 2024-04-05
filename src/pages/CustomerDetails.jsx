import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { IoClose } from "react-icons/io5";
import { saveAs } from "file-saver";
import Downloadbtn from "../components/Downloadbtn";
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';

const CustomerDetails = () => {
  const [customerData, setCustomerData] = useState([]);
  const [originalCustomerData, setOriginalCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { activeMenu } = useStateContext();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        const aggregatedData = aggregateCustomerData(response.data);
        setCustomerData(aggregatedData);
        setOriginalCustomerData(aggregatedData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, []);

  const aggregateCustomerData = (data) => {
    const aggregatedData = [];
    const customerMap = new Map();

    data.forEach((product) => {
      const customerEmail = product.customer.email;

      if (!customerMap.has(customerEmail)) {
        customerMap.set(customerEmail, {
          email: customerEmail,
          name: product.customer.name,
          country: product.customer.address.country,
          state: product.customer.address.state,
          street: product.customer.address.street,
          city: product.customer.address.city,
          profile: product.customer.profile[0],
          products: [product],
        });
      } else {
        const existingCustomer = customerMap.get(customerEmail);
        existingCustomer.products.push(product);
      }
    });

    customerMap.forEach((customer) => {
      aggregatedData.push(customer);
    });

    return aggregatedData;
  };

  const handleViewClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = originalCustomerData.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
      );
    });
    setCustomerData(filteredData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customerData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadCustomerDetails = () => {
    const customerDetailsCSV = convertToCSV(selectedCustomer);
    const blob = new Blob([customerDetailsCSV], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, `${selectedCustomer.name}_details.csv`);
  };

  const convertToCSV = (customer) => {
    let csv = "";
    csv +=
      "Name,Email,Country,Order ID,Order Date,Status,Product Name,Brand Name\n";
    customer.products.forEach((product) => {
      product.orders.forEach((order) => {
        order.items.forEach((item) => {
          csv += `${customer.name},${customer.email},${customer.country},${order.order_id},${order.order_date},${order.status},${item.productName},${item.brandName}\n`;
        });
      });
    });
    return csv;
  };


  return (
    <div>
      <div className="flex relative ">
        {activeMenu ? (
          <div className="w-64 fixed sidebar  bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 ">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "  bg-main-bg min-h-screen md:ml-64 w-full  "
              : "bg-main-bg   w-full min-h-screen flex-2 "
          }
        >
          <div className="xl:fixed bg-main-bg  navbar w-full ">
            <Navbar />
          </div>
          <div className=" flex my-20 gap-10 flex-wrap justify-center">
            <div
              className="bg-white shadow-xl  m-3 p-4 rounded-2xl"
              style={{
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex justify-between">
                <p className="font-semibold text-xl">
                  Customer Table
                </p>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  onChange={handleSearch}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "300px",
                    marginBottom: "1rem",
                  }}
                />
              </div>
              <div
                className="mt-7"
                style={{ overflowX: "auto", width: "900px" }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "1rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          backgroundColor: "#f2f2f2",
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        Profile
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          backgroundColor: "#f2f2f2",
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        Customer Name
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          backgroundColor: "#f2f2f2",
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          backgroundColor: "#f2f2f2",
                          borderBottom: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        Country
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          backgroundColor: "#f2f2f2",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((customer, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          <div>
                            <img
                              src={customer.profile}
                              alt="Profile"
                              className="rounded-full h-10 w-10"
                            />
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {customer.name}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {customer.email}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            borderBottom: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {customer.country}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            textAlign: "center",
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          <button
                            onClick={() => handleViewClick(customer)}
                            className="bg-brand-bg rounded-[20px] text-white px-4 py-2 capitalize"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {[
                    ...Array(
                      Math.ceil(customerData.length / itemsPerPage)
                    ).keys(),
                  ].map((number) => (
                    <li
                      key={number}
                      style={{ display: "inline-block", margin: "0 5px" }}
                    >
                      <button
                        onClick={() => paginate(number + 1)}
                        style={{
                          backgroundColor:
                            currentPage === number + 1 ? "#422AFB" : "",
                          borderRadius: "20px",
                          padding: "8px 16px",
                          color: currentPage === number + 1 ? "white" : "black",
                        }}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <div
          className=" overflow-y-auto"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            width: "800px",
            height: "600px",
            margin: "auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <button
              onClick={() => setSelectedCustomer(null)}
              className=" text-brand-500 dark:text-white opacity-0.9 rounded-full w-10 h-10 bg-card-bg flex justify-center items-center dark:bg-card-dark-bg p-2 hover:drop-shadow-xl duration-500"
            >
              <IoClose />
            </button>
          </div>
          <h2 className="uppercase tracking-wide font-semibold">
            {selectedCustomer.name}'s Details
          </h2>
          <div className="flex justify-evenly my-8">
            <img
              src={selectedCustomer.profile}
              alt="profile"
              className="rounded-full h-32 w-32"
            />
            <div className=" font-semibold capitalize tracking-wide space-y-1">
              <p>{selectedCustomer.email}</p>
              <p>{selectedCustomer.street}</p>
              <p>{selectedCustomer.city}</p>
              <p>{selectedCustomer.state}</p>
              <p>{selectedCustomer.country}</p>
            </div>
          </div>

          <div className="overflow-y-auto">
            <h3 className=" uppercase tracking-wide font-semibold"> {selectedCustomer.name}'s Orders</h3>
            {selectedCustomer.products.map((product, index) => (
              <div className="flex space-x-40 border-b-2 items-center justify-evenly">
                <div>
                  <img className="h-36 w-36" src={product.orders[0].items[0].images[0]} alt="" />
                </div>
                <div className=" font-medium py-5 space-y-1">
                 
                      <p>{product.orders[0].order_id}</p>
                      <p className=" space-x-10">Order Date: <span>{product.orders[0].order_date}</span></p>
                      <p>Status: {product.orders[0].status}</p>
                      <p>
                        Product Name: {product.orders[0].items[0].productName}
                      </p>
                      <p>Brand Name: {product.orders[0].items[0].brandName}</p>
                 
                      {product.orders[0].items[0].isOfferPurchased ? (
              <div>
                <p>Offer Name: {product.orders[0].items[0].offerName}</p>
                <p>Offered Price: {product.orders[0].items[0].offeredPrice}</p>
              </div>
            ) : (
              <p>Price: {product.orders[0].items[0].productPrice}</p>
            )}

                </div>
              </div>
            ))}
          </div>
         <div className="my-5 flex justify-end">
         <Downloadbtn func={downloadCustomerDetails} />
         </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;