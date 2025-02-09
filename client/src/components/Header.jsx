// import React from 'react';

const Header = () => {

  return (
    <div className='flex flex-col items-center justify-center h-screen text-center text-gray-800'>
        <h1>Hey welcome to fixly</h1>
        <button className='flex items-center gap-2 border mt-2 border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'>Get Started</button>
    </div>
  )
}

export default Header;