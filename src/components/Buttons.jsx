import React from 'react'

export default function Buttons({type, func, btnlabel, icons}) {
  return (
    <div>
      <button
      type={type}
      onClick={func}
      className=' bg-brand-bg uppercase rounded-md flex items-center gap-1 text-white py-2 px-3 duration-500 shadow-xl tracking-wider hover:bg-black'
      >
        {btnlabel} {icons}
      </button>
    </div>
  )
}
