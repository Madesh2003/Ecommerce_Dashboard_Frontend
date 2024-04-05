import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useStateContext } from '../contexts/ContextProvider';


const Navbar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div>
      <nav className="relative shadow-xl p-2 bg-white dark:ease-in-out duration-700 dark:text-gray-200 dark:bg-white/10 backdrop-blur-lg">
      <button
      type="button"
      onClick={handleActiveMenu}
      className="relative text-xl rounded-full p-2 hover:bg-light-gray duration-700"
    >
      
     <AiOutlineMenu />
    </button>
      </nav>
    </div>
  );
};

export default Navbar;
