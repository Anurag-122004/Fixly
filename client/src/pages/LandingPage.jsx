// import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-offwhite-100 to-blue-200'>
        <Navbar />
        <Header />
    </div>
  )
}

export default LandingPage;