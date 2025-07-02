import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};
