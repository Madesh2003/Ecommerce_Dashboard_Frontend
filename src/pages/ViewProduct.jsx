import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import Areachartpage from "../pages/Charts/ViewProductAreachart";
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';

const ViewProduct = () => {
  const { activeMenu } = useStateContext();
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [lastFiveCustomers, setLastFiveCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${productName}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);

        setProduct({
          productName: productData.productName,
          brandName: productData.brandName,
          productPrice: productData.productPrice,
          offeredPrice: productData.offeredPrice,
          offerName: productData.offerName,
          productDescription: productData.productDescription,
          stocks: productData.stocks,
          category: productData.category,
          subcategory: productData.subcategory,
          images: productData.images,
        });
      })
      .catch((error) => console.log(productName));
  }, [productName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/soldproducts/");
        const data = response.data;
        const purchases = data.filter((item) =>
          item.orders.some((order) =>
            order.items.some((product) => product.productName === productName)
          )
        );
        
        const lastFiveCustomers = purchases
          .slice(Math.max(purchases.length - 5, 0)) 
          .map((purchase) => ({
            name: purchase.customer.name,
            email: purchase.customer.email,
            phone: purchase.customer.phone,
            address: purchase.customer.address,
            profile: purchase.customer.profile[0],
              orderDate: purchase.orders[0].order_date,
          }));
        
        setLastFiveCustomers(lastFiveCustomers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();

  }, [productName]);

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
            {product && (
              <div className="bg-white shadow-xl py-10 px-10 m-3 p-4 rounded-2xl">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl uppercase tracking-wide">
                    Product Details
                  </p>
                </div>
                <div className="flex space-x-10 my-5">
                  <img className="h-52 w-52" src={product.images[0]} alt="" />
                  <div className=" text-sm font-semibold tracking-wide space-y-2">
                    <p>{product.productName}</p>
                    <p>
                      {product.brandName} <sub>(Brand)</sub>
                    </p>
                    <p>{product.productDescription}</p>
                    <p>₹ {product.productPrice}</p>
                    <p>
                      {product.stocks} <sub>(stocks)</sub>
                    </p>
                  
                  </div>
                </div>
                <div className="flex justify-evenly border-gray-400 border-t-1 pt-10">
                  <div>
                    <Areachartpage productName={productName} />
                  </div>
                  <div>
                    {lastFiveCustomers.map((customer, index) => (
                       <div className="flex space-x-5 items-center border-1 border-gray-400 my-2 py-2 px-3">
                        <div ><img src={"https://www.bits-pilani.ac.in/wp-content/uploads/no-image-1.jpg"} alt="" className="h-14 w-14 rounded-full" /></div>
                        <div className=" space-y-1">
                          <p className="uppercase font-medium tracking-wide">{customer.name}</p>
                          <p>{customer.email}</p>
                          <p>{customer.orderDate}</p>
                        </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
