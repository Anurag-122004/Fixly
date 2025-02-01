// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default App;