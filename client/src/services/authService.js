import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const API = '/api/admin';

export const loginAdmin = (credentials) =>
  axiosInstance.post(`${API}/login`, credentials);

export const registerAdmin = (credentials) =>
  axiosInstance.post(`${API}/register`, credentials);