import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);


  const inputRefs = React.useRef([]);
  
      const handleInput = (e, index) => {
        if (  e.target.value.length > 0 && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
  
      const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
  
      const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text');
        const pasteArray = pasted.split('');
        pasteArray.forEach((char, index) => {
          if (inputRefs.current[index]) {
            inputRefs.current[index].value = char;
          }
        })
      }

      const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post(`${backendUrl}/auth/send-reset-otp`, {email});
          data.success ? toast.success(data.message) : toast.error(data.message);
          data.success && setIsEmailSent(true);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }

      const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
          const otpArray = inputRefs.current.map(e => e.value);
          setOtp(otpArray.join(''));
          setIsOtpSubmitted(true);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }

      const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post(`${backendUrl}/auth/reset-password`, {email, otp, newPassword});
          data.success ? toast.success(data.message) : toast.error(data.message);
          data.success && navigate('/login');
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-400'>
        <img onClick={() => navigate('/')} src={assets.fixly} alt='' className='absolute left-5 sm:left-20 top-5 size-10 w-28 sm:w-32 cursor-pointer' />

        {/* enter email id form */}

        {!isEmailSent && 
          <form onSubmit={onSubmitEmail} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
          <h1 className="text-3xl font-semibold text text-center mb-3">
            Reset Password
          </h1>
          <p className="text-center text-gray-400 text-s mt-4">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          <div className=" mb-4 flex items-center gap-3 w-full mt-6 px-5 py-2.5 bg-slate-800 rounded-lg">
          
            {/* <img src="" alt="" /> */}
            <input type="email" placeholder="email id" className="bg-transparent outline-none text-gray-400" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <button className="w-full bg-indigo-800 rounded-lg py-2 cursor-pointer hover:bg-indigo-900">Send Reset OTP</button>
        </form>
        }

        {/* Reset Password OTP Form */}
        {!isOtpSubmitted && isEmailSent && 
        <form onSubmit={handleOtpSubmit} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96'>
          <h1 className='text-2xl font-semibold text-center mb-3 text-indigo-300'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-sm text-gray-400'>Enter 6-digit code sent to your email id.</p>
          <div className='flex justify-between mb-8 ' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) =>(
              <input type='text' maxLength='1' key={index} className='w-12 h-12 text-center bg-slate-800 rounded-lg text-xl text-indigo-300' 
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => {
                handleInput(e, index);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e, index);
              }}
              required />
            ))}
          </div>
          <button className="w-full bg-indigo-800 text-indigo-300 rounded-lg py-2 cursor-pointer hover:bg-indigo-900">Submit</button>
        </form>
      }

        {/* enter new password form */}

        {isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
          <h1 className="text-3xl font-semibold text-indigo-300 text-center mb-3">
            New Password
          </h1>
          <p className="text-center text-gray-400 text-sm mt-4">
            Enter your new password.
          </p>
          <div className=" mb-4 flex items-center gap-3 w-full mt-6 px-5 py-2.5 bg-slate-800 rounded-lg">
          
            {/* <img src="" alt="" /> */}
            <input type="password" placeholder="password" className="bg-transparent outline-none" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
          </div>
          <button className="w-full bg-indigo-800 rounded-lg py-2 cursor-pointer hover:bg-indigo-900">Submit</button>
        </form>
      }
    </div>
  )
}

export default ResetPassword;