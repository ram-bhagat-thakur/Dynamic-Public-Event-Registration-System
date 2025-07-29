import { describe, it, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import {
  registerForEvent,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getRegistrations,
} from '../../services/eventService';

vi.mock('axios');

describe('eventService', () => {
  const mockToken = 'test-token';
  const mockFormData = { name: 'Ram', email: 'ram@example.com' };
  const mockId = '123';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('registers for event', async () => {
    axios.post.mockResolvedValueOnce({ data: 'registered' });

    const res = await registerForEvent(mockFormData);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/register',
      mockFormData
    );
    expect(res.data).toBe('registered');
  });

  it('fetches all events', async () => {
    axios.get.mockResolvedValueOnce({ data: ['event1', 'event2'] });

    const res = await getEvents();

    expect(axios.get).toHaveBeenCalledWith('/api/events');
    expect(res.data).toEqual(['event1', 'event2']);
  });

  it('fetches event by ID', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: mockId } });

    const res = await getEventById(mockId);

    expect(axios.get).toHaveBeenCalledWith(`/api/events/${mockId}`);
    expect(res.data.id).toBe(mockId);
  });

  it('creates event with token and formData', async () => {
    axios.post.mockResolvedValueOnce({ data: 'created' });

    const res = await createEvent(mockFormData, mockToken);

    expect(axios.post).toHaveBeenCalledWith(
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
    axios.put.mockResolvedValueOnce({ data: 'updated' });

    const res = await updateEvent(mockId, mockFormData, mockToken);

    expect(axios.put).toHaveBeenCalledWith(
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
    axios.delete.mockResolvedValueOnce({ data: 'deleted' });

    const res = await deleteEvent(mockId, mockToken);

    expect(axios.delete).toHaveBeenCalledWith(
      `/api/events/${mockId}`,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(res.data).toBe('deleted');
  });

  it('fetches registrations with token', async () => {
    axios.get.mockResolvedValueOnce({ data: ['reg1', 'reg2'] });

    const res = await getRegistrations(mockId, mockToken);

    expect(axios.get).toHaveBeenCalledWith(
      `/api/events/${mockId}/registrations`,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(res.data).toEqual(['reg1', 'reg2']);
  });
});