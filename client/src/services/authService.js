import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const API = '/api/admin';

export const loginAdmin = (credentials) =>
  axios.post(`${API}/login`, credentials);

export const registerAdmin = (credentials) =>
  axios.post(`${API}/register`, credentials);