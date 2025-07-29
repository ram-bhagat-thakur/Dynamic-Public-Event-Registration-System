import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EventDetails from '../../pages/EventDetails';
import * as eventService from '../../services/eventService';

vi.mock('../../services/eventService', () => ({
  getEventById: vi.fn(),
}));

const mockEvent = {
  _id: 'event123',
  title: 'React Workshop',
  date: '2025-08-01',
  time: '10:00',
  location: 'Online',
  organizer: 'Tech Group',
  leftSeats: 12,
  description: 'Learn React from scratch.',
  highlights: 'Hooks, JSX, Components',
  bannerPath: 'react-banner.jpg',
};

const renderWithRouter = (id = 'event123') => {
  return render(
    <MemoryRouter initialEntries={[`/events/${id}`]}>
      <Routes>
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('EventDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    eventService.getEventById.mockReturnValue(new Promise(() => {})); // never resolves

    renderWithRouter();

    expect(screen.getByText(/loading event/i)).toBeInTheDocument();
  });

  it('shows error message if fetch fails', async () => {
    eventService.getEventById.mockRejectedValue(new Error('fail'));

    renderWithRouter();

    await screen.findByText(/failed to load event details/i);
  });

  it('shows fallback if event is null', async () => {
    eventService.getEventById.mockResolvedValue({ data: null });

    renderWithRouter();

    await screen.findByText(/no event data found/i);
  });

  it('renders full event details when data is available', async () => {
    eventService.getEventById.mockResolvedValue({ data: mockEvent });

    renderWithRouter();

    await screen.findByText('React Workshop');
    expect(screen.getByText(/date/i)).toHaveTextContent('📅 Date: 2025-08-01');
    expect(screen.getByText(/time/i)).toHaveTextContent('⏰ Time: 10:00');
    expect(screen.getByText(/location/i)).toHaveTextContent('📍 Location: Online');
    expect(screen.getByText(/organized by/i)).toHaveTextContent('Organized By:');
    expect(screen.getByText(/seats availability/i)).toHaveTextContent('Seats Availability:');
    expect(screen.getByText(/limited seats/i)).toBeInTheDocument();
    expect(screen.getByText(/highlights include/i)).toBeInTheDocument();
    expect(screen.getByAltText(/react workshop banner/i)).toBeInTheDocument();
  });

  it('renders navigation buttons', async () => {
    eventService.getEventById.mockResolvedValue({ data: mockEvent });

    renderWithRouter();

    await screen.findByText('React Workshop');

    expect(screen.getByRole('link', { name: /register for react workshop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse more events/i })).toBeInTheDocument();
  });
});