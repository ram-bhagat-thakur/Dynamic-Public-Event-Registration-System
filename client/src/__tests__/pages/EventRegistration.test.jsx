import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EventRegistrants from '../../pages/EventRegistrants';
import * as registrationService from '../../services/registrationService';
import * as eventService from '../../services/eventService';
import * as csvService from '../../services/csvService';

vi.mock('../../services/registrationService', () => ({
  getRegistrations: vi.fn(),
  deleteSingleRegistrant: vi.fn(),
  deleteAllRegistrants: vi.fn(),
}));

vi.mock('../../services/eventService', () => ({
  getEventById: vi.fn(),
}));

vi.mock('../../services/csvService', () => ({
  exportToCSV: vi.fn(),
}));

const mockEvent = {
  _id: 'event123',
  title: 'React Workshop',
  date: '2025-08-01',
  location: 'Online',
};

const mockRegistrants = [
  {
    _id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    mobile: '1234567890',
    message: 'Excited to join!',
  },
  {
    _id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    mobile: '9876543210',
    message: '',
  },
];

const renderWithRouter = (eventId = 'event123') => {
  return render(
    <MemoryRouter initialEntries={[`/events/${eventId}/registrants`]}>
      <Routes>
        <Route path="/events/:eventId/registrants" element={<EventRegistrants />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('EventRegistrants', () => {
  beforeEach(() => {
    registrationService.getRegistrations.mockResolvedValue({ data: mockRegistrants });
    eventService.getEventById.mockResolvedValue({ data: mockEvent });
    localStorage.setItem('adminToken', 'mock-token');
  });

  it('renders event info and registrants', async () => {
    renderWithRouter();

    await screen.findByText('React Workshop');
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('filters registrants by search term', async () => {
    renderWithRouter();

    const input = screen.getByLabelText(/search registrants/i);
    fireEvent.change(input, { target: { value: 'bob' } });

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('shows fallback when no registrants match', async () => {
    renderWithRouter();

    const input = screen.getByLabelText(/search registrants/i);
    fireEvent.change(input, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText(/no registrants found/i)).toBeInTheDocument();
    });
  });

  it('removes a single registrant', async () => {
    registrationService.deleteSingleRegistrant.mockResolvedValue({});
    window.confirm = vi.fn(() => true);

    renderWithRouter();

    await screen.findByText('Alice');
    fireEvent.click(screen.getByLabelText(/remove registrant alice/i));

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  it('removes all registrants', async () => {
    registrationService.deleteAllRegistrants.mockResolvedValue({});
    window.confirm = vi.fn(() => true);

    renderWithRouter();

    await screen.findByText('Alice');
    fireEvent.click(screen.getByLabelText(/remove all registrants/i));

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  it('calls exportToCSV with correct data', async () => {
    renderWithRouter();

    await screen.findByText('Alice');
    fireEvent.click(screen.getByLabelText(/export registrants to csv/i));

    expect(csvService.exportToCSV).toHaveBeenCalledWith(
      'registrants_event123.csv',
      ['Name', 'Email', 'Mobile', 'Message'],
      [
        ['Alice', 'alice@example.com', '1234567890', 'Excited to join!'],
        ['Bob', 'bob@example.com', '9876543210', ''],
      ]
    );
  });

  it('shows error message if event fetch fails', async () => {
    eventService.getEventById.mockRejectedValueOnce(new Error('fail'));

    renderWithRouter();

    await screen.findByText(/failed to load event details/i);
  });

  it('shows error message if registrants fetch fails', async () => {
    registrationService.getRegistrations.mockRejectedValueOnce(new Error('fail'));

    renderWithRouter();

    await screen.findByText(/failed to load registrants/i);
  });
});