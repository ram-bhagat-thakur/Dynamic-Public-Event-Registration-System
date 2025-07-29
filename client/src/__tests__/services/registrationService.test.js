import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
  getAllRegistrants,
  getRegistrantsByEvent,
  deleteAllRegistrants,
  deleteSingleRegistrant,
  getRegistrations,
} from '../../services/registrationService';

vi.mock('axios');

const token = 'mock-token';
const eventId = 'event123';
const registrantId = 'reg456';

describe('registrationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls getAllRegistrants with correct headers', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await getAllRegistrants(token);

    expect(axios.get).toHaveBeenCalledWith(
      '/api/registrations',
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('calls getRegistrantsByEvent with correct URL and headers', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await getRegistrantsByEvent(eventId, token);

    expect(axios.get).toHaveBeenCalledWith(
      `/api/registrations/event/${eventId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('calls deleteAllRegistrants with correct URL and headers', async () => {
    axios.delete.mockResolvedValue({});

    await deleteAllRegistrants(eventId, token);

    expect(axios.delete).toHaveBeenCalledWith(
      `/api/registrations/event/${eventId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('calls deleteSingleRegistrant with correct URL and headers', async () => {
    axios.delete.mockResolvedValue({});

    await deleteSingleRegistrant(registrantId, token);

    expect(axios.delete).toHaveBeenCalledWith(
      `/api/registrations/${registrantId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('calls getRegistrations with correct URL and headers', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await getRegistrations(eventId, token);

    expect(axios.get).toHaveBeenCalledWith(
      `/api/registrations/event/${eventId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });
});