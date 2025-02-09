import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

const EmailVerify = () => {

    axios.defaults.withCredentials = true;

    const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent);

    const navigate = useNavigate();

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

    const onSubmithandler = async (e) => {
      try {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value)
        const otp = otpArray.join('');

        const { data } = await axios.post(`${backendUrl}/auth/verify-account`, { otp });

        if (data.success) {
          toast.success(data.message);
          getUserData();
          navigate('/dashboard');
        } else {
          toast.error(data.message);

        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }

    useEffect(() => {
      isLoggedin && userData && userData.isAccountVerified && navigate('/dashboard');
    }, [isLoggedin, userData, navigate])

    return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-400'>
        <img onClick={() => navigate('/')} src={assets.fixly} alt='' className='absolute left-5 sm:left-20 top-5 size-10 w-28 sm:w-32 cursor-pointer' />
        <form onSubmit={onSubmithandler} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
          <h1>Email Verification OTP</h1>
          <p className='text-center mb-6 text-indigo-600'>Enter 6-digit code sent to your email id.</p>
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
          <button className='w-full bg-indigo-800 rounded-lg py-2 cursor-pointer hover:bg-indigo-900'>Verify</button>
        </form>
    </div>
  )
}

export default EmailVerify;