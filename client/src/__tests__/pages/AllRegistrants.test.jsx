import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import AllRegistrants from '../../pages/AllRegistrants';
import * as registrationService from '../../services/registrationService';
import * as csvService from '../../services/csvService';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock CSV export
vi.mock('../../services/csvService', () => ({
  exportToCSV: vi.fn(),
}));

// ✅ Mock registration service
vi.mock('../../services/registrationService', () => ({
  getAllRegistrants: vi.fn(),
  deleteSingleRegistrant: vi.fn(),
  deleteAllRegistrants: vi.fn(),
}));

const mockRegistrants = [
  {
    _id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    mobile: '1234567890',
    message: 'Excited to join!',
    eventId: { title: 'React Workshop' },
  },
  {
    _id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    mobile: '9876543210',
    message: '',
    eventId: { title: 'Cultural Fest' },
  },
];

describe('AllRegistrants', () => {
  beforeEach(() => {
    registrationService.getAllRegistrants.mockResolvedValue({
      data: mockRegistrants,
    });
    localStorage.setItem('adminToken', 'mock-token');
  });

  it('renders registrants after fetching', async () => {
    render(<AllRegistrants />, { wrapper: MemoryRouter });

    const list = await screen.findByTestId('registrant-list');
    expect(within(list).getByText('Alice')).toBeInTheDocument();
    expect(within(list).getByText('Bob')).toBeInTheDocument();
  });

  it('filters registrants by search term', async () => {
    render(<AllRegistrants />, { wrapper: MemoryRouter });

    const input = screen.getByLabelText(/search registrants/i);
    fireEvent.change(input, { target: { value: 'bob' } });

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('shows fallback when no registrants match', async () => {
    render(<AllRegistrants />, { wrapper: MemoryRouter });

    const input = screen.getByLabelText(/search registrants/i);
    fireEvent.change(input, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText(/no registrants found/i)).toBeInTheDocument();
    });
  });

  it('removes a single registrant', async () => {
    registrationService.deleteSingleRegistrant.mockResolvedValue({});
    window.confirm = vi.fn(() => true);

    render(<AllRegistrants />, { wrapper: MemoryRouter });

    const list = await screen.findByTestId('registrant-list');
    expect(within(list).getByText('Alice')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('remove-1'));

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  it('removes all registrants', async () => {
    registrationService.deleteAllRegistrants.mockResolvedValue({});
    window.confirm = vi.fn(() => true);

    render(<AllRegistrants />, { wrapper: MemoryRouter });

    const list = await screen.findByTestId('registrant-list');
    expect(within(list).getByText('Alice')).toBeInTheDocument();
    expect(within(list).getByText('Bob')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('remove-all'));

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  it('calls exportToCSV with correct data', async () => {
    render(<AllRegistrants />, { wrapper: MemoryRouter });

    await screen.findByText('Alice');
    fireEvent.click(screen.getByTestId('export-csv'));

    expect(csvService.exportToCSV).toHaveBeenCalledWith(
      'all_registrants.csv',
      ['Name', 'Email', 'Mobile', 'Message', 'Event Title'],
      [
        ['Alice', 'alice@example.com', '1234567890', 'Excited to join!', 'React Workshop'],
        ['Bob', 'bob@example.com', '9876543210', '', 'Cultural Fest'],
      ]
    );
  });
});