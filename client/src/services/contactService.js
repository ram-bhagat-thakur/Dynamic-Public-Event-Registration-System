import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const submitContactForm = (data) =>
  axios.post('/api/contact', data);

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  },
};

export const getMessages = () =>
  axios.get('/api/contact', config);

export const markMessageAsRead = (id) =>
  axios.patch(`/api/contact/${id}/read`, {}, config);

export const deleteMessage = (id) =>
  axios.delete(`/api/contact/${id}`, config);