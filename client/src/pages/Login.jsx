import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/auth/register`, { name, email, password });
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
        const { data } = await axios.post(`${backendUrl}/auth/login`, { email, password });
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
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-200 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.fixly}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full sm:w-96 text-gray-200">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          {state === 'Sign Up' ? 'Create your Account' : 'Login to your Account'}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {state === 'Sign Up' && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="space-y-2 relative w-full">
  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
    Password
  </label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>


          <div className="flex items-center justify-between">
            <span
              onClick={() => navigate('/reset-password')}
              className="cursor-pointer text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition transform hover:scale-105 cursor-pointer"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-4">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className="text-blue-400 cursor-pointer underline">
                Login Here
              </span>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{' '}
              <span onClick={() => setState('Sign Up')} className="text-blue-400 cursor-pointer underline">
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
