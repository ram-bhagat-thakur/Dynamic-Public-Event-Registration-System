import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllRegistrants = (token) =>
  axios.get('/api/registrations', authHeaders(token));

export const getRegistrantsByEvent = (eventId, token) =>
  axios.get(`/api/registrations/event/${eventId}`, authHeaders(token));

export const deleteAllRegistrants = (eventId, token) =>
  axios.delete(`/api/registrations/event/${eventId}`, authHeaders(token));

export const deleteSingleRegistrant = (id, token) =>
  axios.delete(`/api/registrations/${id}`, authHeaders(token));

export const getRegistrations = (eventId, token) =>
  axios.get(`/api/registrations/event/${eventId}`, authHeaders(token));