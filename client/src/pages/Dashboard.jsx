import React from 'react'
import Navbar from '../components/Navbar';
import { AppContent } from '../context/AppContext';
import { useContext } from 'react';


const Dashboard = () => {
    const {userData} = useContext(AppContent);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-offwhite-100 to-blue-200'>
        <Navbar />
        <h1>Hey {userData ? userData.name : ''} welcome to fixly</h1>
    </div>
  )
}

export default Dashboard;