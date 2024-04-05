import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import PieChart from './Charts/Pie';
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';

export default function Subcategory() {
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
        <div className=" flex my-20 gap-10 flex-wrap justify-center w-full ">
            <div className="bg-white shadow-xl m-3 p-4 rounded-2xl w-[1100px] ">
                <div className="flex justify-between">
                    <p className="font-semibold text-xl">Products sold by Subcategory</p>
                    
                </div>
                <div className="mt-7">
                    <div className=''>
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}
