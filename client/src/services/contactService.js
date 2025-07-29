import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const submitContactForm = (data) =>
  axiosInstance.post('/api/contact', data);

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  },
};

export const getMessages = () =>
  axiosInstance.get('/api/contact', config);

export const markMessageAsRead = (id) =>
  axiosInstance.patch(`/api/contact/${id}/read`, {}, config);

export const deleteMessage = (id) =>
  axiosInstance.delete(`/api/contact/${id}`, config);