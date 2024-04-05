import React from 'react';
import Areachartpage from './Charts/Areachartpage';
import { GoDot } from 'react-icons/go';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';


export default function Soldproductschart() {
  const { activeMenu } = useStateContext();

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
                     ? '  bg-main-bg min-h-screen md:ml-64 w-full  '
                     : 'bg-main-bg   w-full min-h-screen flex-2 '
                 }
               >
                 <div className="xl:fixed bg-main-bg  navbar w-full ">
                   <Navbar />
                 </div>
    <div className=" flex my-20 gap-10 flex-wrap justify-center items-center h-[800px] w-full">
    <div className="bg-white shadow-xl m-3 p-4 rounded-2xl w-[1100px] h-[700px]">
      <div className="flex justify-between">
        <p className="font-semibold text-xl">Revenue Updates</p>
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
          <Areachartpage />
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  )
}
