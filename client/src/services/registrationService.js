import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';


const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllRegistrants = (token) =>
  axiosInstance.get('/api/registrations', authHeaders(token));

export const getRegistrantsByEvent = (eventId, token) =>
  axiosInstance.get(`/api/registrations/event/${eventId}`, authHeaders(token));

export const deleteAllRegistrants = (eventId, token) =>
  axiosInstance.delete(`/api/registrations/event/${eventId}`, authHeaders(token));

export const deleteSingleRegistrant = (id, token) =>
  axiosInstance.delete(`/api/registrations/${id}`, authHeaders(token));

export const getRegistrations = (eventId, token) =>
  axiosInstance.get(`/api/registrations/event/${eventId}`, authHeaders(token));