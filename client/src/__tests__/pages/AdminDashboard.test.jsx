import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import AdminDashboard from '../../pages/AdminDashboard';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// ✅ Mock localStorage
beforeAll(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => {
      if (key === 'adminName') return 'Ram';
      if (key === 'adminToken') return 'mock-token';
      return null;
    }),
    removeItem: vi.fn(),
  });
});

// ✅ Mock services
vi.mock('../../services/eventService', () => ({
  getEvents: vi.fn(() =>
    Promise.resolve({
      data: [
        {
          _id: 'e1',
          title: 'React Summit',
          date: '2025-08-01',
          tags: 'react,frontend',
          totalSeats: 100,
          leftSeats: 25,
        },
      ],
    })
  ),
  deleteEvent: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../services/registrationService', () => ({
  getRegistrations: vi.fn(() =>
    Promise.resolve({
      data: [
        { name: 'Alice', email: 'alice@example.com', mobile: '1234567890', message: 'Excited!' },
      ],
    })
  ),
}));

vi.mock('../../services/csvService', () => ({
  exportToCSV: vi.fn(),
}));

// ✅ Helper: Match partial text content
const getAllByTextContent = (container, text) =>
  within(container).getAllByText((_, el) => el.textContent?.includes(text));

describe('AdminDashboard', () => {
  test('renders admin greeting and stats', async () => {
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);
    expect(await screen.findByText(/Welcome, Ram/i)).toBeInTheDocument();
    expect(await screen.findByText('📅 Total Events')).toBeInTheDocument();
    expect(await screen.findByText('🎟️ Total Seats')).toBeInTheDocument();
    expect(await screen.findByText('🪑 Seats Left')).toBeInTheDocument();
  });

  test('renders event table with correct data', async () => {
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);
    const table = await screen.findByRole('table', { name: /List of all events/i });
    expect(getAllByTextContent(table, 'React Summit')).toHaveLength(5);
    expect(getAllByTextContent(table, '2025-08-01')).toHaveLength(4);
    expect(getAllByTextContent(table, 'react,frontend')).toHaveLength(4);
    expect(getAllByTextContent(table, '25/100')).toHaveLength(4);
  });

  test('renders all action buttons', () => {
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /View contact messages/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View all registrants/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add new event/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register new admin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Manage user feedback/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  test('deletes an event with confirmation and loading state', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);
    const deleteButton = await screen.findByRole('button', { name: /Delete event titled React Summit/i });
    fireEvent.click(deleteButton);
    await waitFor(() => expect(deleteButton).toHaveTextContent(/Deleting.../i));
  });

  test('exports registrants for an event', async () => {
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);
    const exportButton = await screen.findByRole('button', { name: /Export registrants for event titled React Summit/i });
    fireEvent.click(exportButton);
    await waitFor(() => expect(screen.getByText(/Registrants exported successfully/i)).toBeInTheDocument());
  });
});