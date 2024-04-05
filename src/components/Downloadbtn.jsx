import React from 'react'
import { FaCloudDownloadAlt } from 'react-icons/fa'

const Downloadbtn = ({func}) => {
  return (
    <div className='flex justify-start'>
    <button onClick={func} className=" text-brand-500 dark:text-white opacity-0.9 rounded-full w-14 h-14 bg-card-bg flex justify-center items-center dark:bg-card-dark-bg p-2 hover:drop-shadow-xl duration-500">
        <FaCloudDownloadAlt className='animate-bounce text-3xl' />
    </button>
</div>
  )
}

export default Downloadbtn;
