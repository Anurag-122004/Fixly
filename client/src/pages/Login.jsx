import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent);
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;
      if ( state === 'Sign Up')  {
        const {data} = await axios.post(`${backendUrl}/auth/register`, {name, email, password});
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          getUserData();
          navigate('/dashboard');

        } else {
          toast.error(data.message);
        }
      } else {
        const {data} = await axios.post(`${backendUrl}/auth/login`, {email, password});
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          getUserData();
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-200 to-purple-400 '>
      <img onClick={() => navigate('/')} src={assets.fixly} alt='' className='absolute left-5 sm:left-20 top-5 size-10 w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

        <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>

        <p className="text-center text-sm mb-6">{state === 'Sign Up' ? 'Create your Account' : 'Login to your Account'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-gray-100'>
            <input 
            onChange={(e) => setName(e.target.value)}
            value={name} 
            className='bg-transparent outline-none' type="text" placeholder="Name" required/>
          </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-gray-100'>
            <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
            className='bg-transparent outline-none' type="email" placeholder="email id" required/>
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-gray-100'>
            <input 
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            className='bg-transparent outline-none' type="password" placeholder="password" required/>
          </div>

          <p 
          onClick={() => navigate('/reset-password')}
          className='cursor-pointer text-indigo-500 mb-4 '>Forgot password?</p>

          <button className='cursor-pointer rounded-full bg-indigo-500 text-white w-full py-2.5'>
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {state === 'Sign Up' ? (<p className='text-center text-gray-400 text-s mt-4'>Already have an account?{'  '}
          <span onClick={()=>setState('Login')}
            className='text-blue-400 cursor-pointer underline'>Login Here</span>
        </p>) : 
        (<p className='text-center text-gray-400 text-s mt-4'>Don&apos;t have an account?{'  '}
          <span onClick={()=>setState('Sign Up')}
          className='text-blue-400 cursor-pointer underline'>Sign Up</span>
        </p>)}
        
      </div>
    </div>
  );
};

export default Login;
