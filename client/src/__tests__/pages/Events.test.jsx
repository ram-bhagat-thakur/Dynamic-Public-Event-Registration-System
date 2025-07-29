import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from '../../pages/Events';
import * as eventService from '../../services/eventService';

vi.mock('../../services/eventService', () => ({
  getEvents: vi.fn(),
}));

const mockEvents = [
  {
    _id: '1',
    title: 'React Workshop',
    location: 'Madhubani',
    date: '2025-08-01',
    time: '10:00',
    leftSeats: 20,
    description: 'Learn React basics',
    bannerPath: '/images/react.png',
    tags: 'tech,workshop',
  },
  {
    _id: '2',
    title: 'Cultural Fest',
    location: 'Patna',
    date: '2025-08-05',
    time: '18:00',
    leftSeats: 50,
    description: 'Celebrate culture',
    bannerPath: '/images/fest.png',
    tags: 'culture,festival',
  },
];

describe('Events', () => {
  beforeEach(() => {
    eventService.getEvents.mockResolvedValue({ data: mockEvents });
  });

  const getEventGrid = () =>
    screen.getByRole('region', { name: /event results/i });

  it('renders events after fetching', async () => {
    render(<Events />, { wrapper: MemoryRouter });

    const grid = await screen.findByRole('region', { name: /event results/i });

    expect(within(grid).getByText(/react workshop/i)).toBeInTheDocument();
    expect(within(grid).getByText(/cultural fest/i)).toBeInTheDocument();
  });

  it('filters events by search term', async () => {
    render(<Events />, { wrapper: MemoryRouter });

    await screen.findByText(/react workshop/i);

    fireEvent.change(screen.getByLabelText(/search events/i), {
      target: { value: 'react' },
    });

    const grid = getEventGrid();
    expect(within(grid).getByText(/react workshop/i)).toBeInTheDocument();
    expect(within(grid).queryByText(/cultural fest/i)).not.toBeInTheDocument();
  });

  it('filters events by tag', async () => {
    render(<Events />, { wrapper: MemoryRouter });

    await screen.findByText(/react workshop/i);

    fireEvent.change(screen.getByLabelText(/filter events by tag/i), {
      target: { value: 'festival' },
    });

    const grid = getEventGrid();
    expect(within(grid).getByText(/cultural fest/i)).toBeInTheDocument();
    expect(within(grid).queryByText(/react workshop/i)).not.toBeInTheDocument();
  });

  it('clears filters when "Clear Filters" is clicked', async () => {
    render(<Events />, { wrapper: MemoryRouter });

    await screen.findByText(/react workshop/i);

    fireEvent.change(screen.getByLabelText(/search events/i), {
      target: { value: 'react' },
    });
    fireEvent.change(screen.getByLabelText(/filter events by tag/i), {
      target: { value: 'tech' },
    });

    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

    const grid = getEventGrid();
    expect(within(grid).getByText(/react workshop/i)).toBeInTheDocument();
    expect(within(grid).getByText(/cultural fest/i)).toBeInTheDocument();
  });

  it('shows fallback message when no events match', async () => {
    render(<Events />, { wrapper: MemoryRouter });

    await screen.findByText(/react workshop/i);

    fireEvent.change(screen.getByLabelText(/search events/i), {
      target: { value: 'nonexistent' },
    });

    expect(screen.getByText(/no events found/i)).toBeInTheDocument();
  });
});