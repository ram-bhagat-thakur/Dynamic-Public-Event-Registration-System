import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const API = '/api/events';

export const registerForEvent = (formData) =>
  axios.post('/api/register', formData);

export const getEvents = () => axios.get(API);

export const getEventById = (id) => axios.get(`${API}/${id}`);

export const createEvent = (formData, token) =>
  axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateEvent = (id, formData, token) =>
  axios.put(`${API}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteEvent = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRegistrations = (eventId, token) =>
  axios.get(`${API}/${eventId}/registrations`, {
    headers: { Authorization: `Bearer ${token}` },
  });