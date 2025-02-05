import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

const EmailVerify = () => {

    const navigate = useNavigate();
    return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-400'>
        <img onClick={() => navigate('/')} src={assets.fixly} alt='' className='absolute left-5 sm:left-20 top-5 size-10 w-28 sm:w-32 cursor-pointer' />
        <form className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
          <h1>Email Verification OTP</h1>
          <p className='text-center mb-6 text-indigo-600'>Enter 6-digit code sent to your email id.</p>
        </form>
    </div>
  )
}

export default EmailVerify;