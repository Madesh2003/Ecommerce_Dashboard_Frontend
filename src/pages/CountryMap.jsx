import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { WorldMap } from './Charts/Geography';
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';


export default function Countrymap() {
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
                     ? '  bg-main-bg min-h-screen md:ml-64 w-full  '
                     : 'bg-main-bg   w-full min-h-screen flex-2 '
                 }
               >
                 <div className="xl:fixed bg-main-bg  navbar w-full ">
                   <Navbar />
                 </div>
    <div className=" flex my-20 gap-10 flex-wrap justify-center max-sm:h-[800px] sm:h-[800px] items-center">
            <div className="bg-white shadow-xl m-3 p-8 rounded-2xl w-[1100px] h-[800px] ">
                <div className="flex justify-between">
                    <p className="font-semibold text-xl capitalize">geography</p>
                </div>
                <div className="flex justify-center items-center">
                       <WorldMap />
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
  )
}
