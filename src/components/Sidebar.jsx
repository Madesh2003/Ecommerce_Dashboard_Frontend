import React,{ useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiAsus } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { AuthContext } from "../contexts/AuthContext";
import { BiSolidDashboard } from "react-icons/bi";
import { MdOutlineBarChart } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { FaRankingStar } from "react-icons/fa6";
import { FaChartPie, FaShoppingCart } from "react-icons/fa";
import { BsBoxFill, BsPersonLinesFill } from "react-icons/bs";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/signup");
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/Dashboard"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <span className="text-8xl">
                <SiAsus />
              </span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ background: "#5F3AFF" }}
                className="text-xl rounded-full p-3 hover:bg-light-gray duration-500 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10 ">
            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Ecommerce
              </p>
              <NavLink
                to="/Dashboard"
                key="Dashboard"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BiSolidDashboard />
                <span className="uppercase ">dashboard</span>
              </NavLink>
            </div>





            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                product
              </p>
              <NavLink
                to="/Topsellingproducts"
                key="Topsellingproducts"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaRankingStar />
                <span className="uppercase ">Top selling</span>
              </NavLink>
              <NavLink
                to="/products"
                key="products"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaShoppingCart />
                <span className="uppercase ">Products</span>
              </NavLink>

              <NavLink
                to="/customerdetails"
                key="customerdetails"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BsPersonLinesFill />
                <span className="uppercase ">Customer</span>
              </NavLink>
              <NavLink
                to="/order"
                key="orders"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
               <BsBoxFill />
                <span className="uppercase ">orders</span>
              </NavLink>
            </div>

            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                App
              </p>
              <NavLink
                to="/events"
                key="events"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BiSolidDashboard />
                <span className="uppercase ">Events</span>
              </NavLink>
            </div>
            

            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Chart
              </p>
              <NavLink
                to="/revenue"
                key="revenue"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <AiOutlineAreaChart />
                <span className="uppercase ">revenue</span>
              </NavLink>
              <NavLink
                to="/category"
                key="category"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <MdOutlineBarChart />
                <span className="uppercase ">category</span>
              </NavLink>
              <NavLink
                to="/subcategory"
                key="subcategory"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
              <FaChartPie />
                <span className="uppercase ">subcategory</span>
              </NavLink>

              <NavLink
                to="/countries"
                key="country"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
              <FaChartPie />
                <span className="uppercase ">country</span>
              </NavLink>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                profile
              </p>
              <NavLink
                to="/"
                key="signout"
                onClick={handleSignOut} 
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BiSolidDashboard />
                <span className="uppercase ">sign-out</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
