import axios from 'axios';

const API_URL = '/api/auth';

// Register user
const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login user
const login = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

// Get current user
const getCurrentUser = async () => {
  return await axios.get(`${API_URL}/me`);
};

// Forgot password
const forgotPassword = async (email) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

// Reset password
const resetPassword = async (data) => {
  return await axios.post(`${API_URL}/reset-password`, data);
};

const authService = {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  resetPassword
};

export default authService;
