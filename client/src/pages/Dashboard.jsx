// import React from 'react';
import Navbar from '../components/Navbar';
import { AppContent } from '../context/AppContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userData, isLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-offwhite-100 to-blue-200'>
      <Navbar />
      <h1>Hey {userData ? userData.name : ''} welcome to fixly</h1>
    </div>
  );
};

export default Dashboard;