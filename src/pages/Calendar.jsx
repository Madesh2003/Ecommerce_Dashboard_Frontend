import React from 'react'
import Scheduler from '../components/Calendar'
import { useStateContext } from "../contexts/ContextProvider";
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';

const Calendar = () => {
    const { activeMenu } = useStateContext();
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
          <div className="bg-white shadow-xl m-3 p-4 rounded-2xl">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Event Schedular</p>
            </div>
            <div>
            <Scheduler />
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
  )
}

export default Calendar
