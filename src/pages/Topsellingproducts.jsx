import React,{useEffect} from 'react';
import Topsellingproducts from '../components/Topselling';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';

export default function Topsellingproductsgrid() {
    const { setCurrentMode, currentMode, activeMenu } = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentMode(currentThemeMode);
        }
      }, [setCurrentMode]);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>

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
                     ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-64 w-full  '
                     : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                 }
               >
                 <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                   <Navbar />
                 </div>
    <div className=" flex my-7 gap-10 flex-wrap justify-center">
            <div className="bg-white shadow-xl dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl">
                <div className="flex justify-between">
                    <p className="font-semibold text-xl">Top Selling Products Grid</p>
                </div>
                <div className="mt-7">
                    <div>
                       <Topsellingproducts />
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
  )
}