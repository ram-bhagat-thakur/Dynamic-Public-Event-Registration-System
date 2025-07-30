import { describe, it, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

import {
  registerForEvent,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getRegistrations,
} from '../../services/eventService';

vi.mock('../../utils/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('eventService', () => {
  const mockToken = 'test-token';
  const mockFormData = { name: 'Ram', email: 'ram@example.com' };
  const mockId = '123';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('registers for event', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: 'registered' });

    const res = await registerForEvent(mockFormData);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      '/api/register',
      mockFormData
    );
    expect(res.data).toBe('registered');
  });

  it('fetches all events', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: ['event1', 'event2'] });

    const res = await getEvents();

    expect(axiosInstance.get).toHaveBeenCalledWith('/api/events');
    expect(res.data).toEqual(['event1', 'event2']);
  });

  it('fetches event by ID', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { id: mockId } });

    const res = await getEventById(mockId);

    expect(axiosInstance.get).toHaveBeenCalledWith(`/api/events/${mockId}`);
    expect(res.data.id).toBe(mockId);
  });

  it('creates event with token and formData', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: 'created' });

    const res = await createEvent(mockFormData, mockToken);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      '/api/events',
      mockFormData,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    expect(res.data).toBe('created');
  });

  it('updates event with token and formData', async () => {
    axiosInstance.put.mockResolvedValueOnce({ data: 'updated' });

    const res = await updateEvent(mockId, mockFormData, mockToken);

    expect(axiosInstance.put).toHaveBeenCalledWith(
      `/api/events/${mockId}`,
      mockFormData,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    expect(res.data).toBe('updated');
  });

  it('deletes event with token', async () => {
    axiosInstance.delete.mockResolvedValueOnce({ data: 'deleted' });

    const res = await deleteEvent(mockId, mockToken);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/events/${mockId}`,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(res.data).toBe('deleted');
  });

  it('fetches registrations with token', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: ['reg1', 'reg2'] });

    const res = await getRegistrations(mockId, mockToken);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/api/events/${mockId}/registrations`,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(res.data).toEqual(['reg1', 'reg2']);
  });
});