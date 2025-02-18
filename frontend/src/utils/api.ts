import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendVerifyOtp = async (userId: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/send-verify-otp`, { userId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyEmail = async (userId: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, { userId, otp });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/is-authenticated`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendResetOtp = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/send-reset-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { email, otp, newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

