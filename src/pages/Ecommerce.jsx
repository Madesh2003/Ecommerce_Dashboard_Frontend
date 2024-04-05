import React, { useContext } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { GoDot } from "react-icons/go";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useSoldProducts } from "../contexts/revenuecontext";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { ProductsContext } from "../contexts/Productcountcontext";
import Area from "../components/Charts/Area";
import { useCustomerContext } from "../contexts/CustomerContext";
import Downloadbtn from "../components/Downloadbtn";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Ecommerce = () => {
  const { activeMenu } = useStateContext();

  const { calculateTotalProducts } = useContext(ProductsContext);
  const {
    calculateTotalRevenue,
    calculateTodayRevenue,
    calculateWeekRevenue,
    calculateMonthRevenue,
    calculateProductsSoldToday,
    calculateProductsSoldThisWeek,
    calculateProductsSoldThisMonth,
    downloadCSV,
  } = useSoldProducts();
  const { uniqueCustomerCount } = useCustomerContext();

  const currentYear = new Date().getFullYear();
  return (
    <div>
      <div className="flex relative ">
        {activeMenu ? (
          <div className="w-64 fixed sidebar bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
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

          <div className="my-24">
            <div className="flex flex-wrap lg:flex-nowrap justify-center ">
              <div className="bg-white shadow-2xl  h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-2">
                    <p className="font-bold text-gray-400">Earnings</p>
                    <p className="text-2xl font-extrabold tracking-wide">
                      &#8377; {calculateTotalRevenue()}
                    </p>
                    <Downloadbtn func={downloadCSV} />
                  </div>
                  <button
                    type="button"
                    className="text-2xl h-14 text-brand-500  opacity-0.9 rounded-full bg-card-bg  p-4 hover:drop-shadow-xl"
                  >
                    <FaIndianRupeeSign />
                  </button>
                </div>
              </div>

              <div className="flex my-7 flex-wrap justify-center gap-4 items-center">
                <div className="flex flex-wrap gap-6 cursor-pointer  shadow-xl bg-white h-36  md:w-56  p-4 pt-9 rounded-2xl ">
                  <Link to="/customerdetails">
                    <button
                      type="button"
                      className="text-2xl h-14 text-brand-500  opacity-0.9 rounded-full bg-card-bg  p-4 hover:drop-shadow-xl"
                    >
                      <MdOutlineSupervisorAccount />
                    </button>
                  </Link>
                  <div>
                    <p className="mt-3">
                      <span className="text-lg font-extrabold tracking-wide">
                        {uniqueCustomerCount}
                      </span>
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Customers
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6  shadow-xl bg-white h-36  md:w-56  p-4 pt-9 rounded-2xl ">
                  <Link to="/products">
                    <button
                      type="button"
                      className="text-2xl h-14 text-brand-500  opacity-0.9 rounded-full bg-card-bg  p-4 hover:drop-shadow-xl"
                    >
                      <BsBoxSeam />
                    </button>
                  </Link>
                  <div>
                    <p className="mt-3">
                      <span className="text-lg font-extrabold tracking-wide">
                        {calculateTotalProducts()}
                      </span>
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Products
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex my-7 flex-wrap justify-center gap-4 items-center">
              <div className="shadow-xl bg-white h-40  md:w-60  p-4 rounded-2xl flex flex-col justify-around items-center">
                <p className=" font-semibold tracking-wide">Today</p>
                <div className="flex flex-wrap justify-evenly items-center gap-6">
                  <div className="flex flex-wrap flex-col items-center">
                    <p className="text-lg font-extrabold tracking-wide">
                      {calculateProductsSoldToday()}
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Products
                    </p>
                  </div>
                  <div className="flex flex-wrap flex-col items-center">
                    <p className="">
                      <span className="text-lg font-extrabold tracking-wide">
                        &#8377; {calculateTodayRevenue()}
                      </span>
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Revenue
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow-xl bg-white h-40  md:w-60  p-4 rounded-2xl flex flex-col justify-around items-center">
                <p className=" font-semibold tracking-wide">Week</p>
                <div className="flex flex-wrap justify-evenly items-center gap-6">
                  <div className="flex flex-wrap flex-col items-center">
                    <p className="text-lg font-extrabold tracking-wide">
                      {calculateProductsSoldThisWeek()}
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Products
                    </p>
                  </div>
                  <div className="flex flex-wrap flex-col items-center">
                    <p className="">
                      <span className="text-lg font-extrabold tracking-wide">
                        &#8377; {calculateWeekRevenue()}
                      </span>
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Revenue
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow-xl bg-white h-40  md:w-60  p-4 rounded-2xl flex flex-col justify-around items-center">
                <p className=" font-semibold tracking-wide">Month</p>
                <div className="flex flex-wrap justify-evenly items-center gap-6">
                  <div className="flex flex-wrap flex-col items-center">
                    <p className="text-lg font-extrabold tracking-wide">
                      {calculateProductsSoldThisMonth()}
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Products
                    </p>
                  </div>
                  <div className="flex flex-wrap flex-col items-center">
                    <p className="">
                      <span className="text-lg font-extrabold tracking-wide">
                        &#8377; {calculateMonthRevenue()}
                      </span>
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-gray-500  mt-1">
                      Revenue
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex my-7 gap-10 flex-wrap justify-center">
              <div className="bg-white shadow-xl  m-3 p-4 rounded-2xl md:w-780 ">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl">
                    Revenue Updates For {currentYear}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                      <span>
                        <GoDot />
                      </span>
                      <span>Sold Products</span>
                    </p>
                    <p className="flex items-center text-myblue gap-2 hover:drop-shadow-xl">
                      <span>
                        <GoDot />
                      </span>
                      <span>Revenue</span>
                    </p>
                  </div>
                </div>
                <div className="mt-7">
                  <div>
                    <Area width="700px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
