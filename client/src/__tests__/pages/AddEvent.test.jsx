import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddEvent from '../../pages/AddEvent';
import * as eventService from '../../services/eventService';

vi.mock('../../services/eventService', () => ({
  createEvent: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AddEvent', () => {
  beforeEach(() => {
    localStorage.setItem('adminToken', 'test-token');
    eventService.createEvent.mockReset();
    mockNavigate.mockReset();
  });

  it('shows validation errors when required fields are empty', async () => {
    render(<AddEvent />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole('button', { name: /create event/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    expect(screen.getByText(/total seats must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/left seats must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    expect(screen.getByText(/banner image is required/i)).toBeInTheDocument();
  });

  it('shows image preview when banner is uploaded', async () => {
    render(<AddEvent />, { wrapper: MemoryRouter });

    const file = new File(['dummy'], 'banner.png', { type: 'image/png' });
    const input = screen.getByLabelText(/banner image/i);
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText(/preview of uploaded banner/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully and navigates', async () => {
    eventService.createEvent.mockResolvedValueOnce({});
    render(<AddEvent />, { wrapper: MemoryRouter });

    const fill = (label, value) => {
      const input = screen.getByLabelText(label);
      fireEvent.change(input, { target: { value } });
    };

    fill(/title/i, 'Test Event');
    fill(/date/i, '2025-08-01');
    fill(/time/i, '18:00');
    fill(/total seats/i, '100');
    fill(/left seats/i, '100');
    fill(/location/i, 'Madhubani');

    const file = new File(['dummy'], 'banner.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/banner image/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole('button', { name: /create event/i }));

    await waitFor(() => {
      expect(eventService.createEvent).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
      expect(screen.getByText(/event created successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    eventService.createEvent.mockRejectedValueOnce(new Error('fail'));
    render(<AddEvent />, { wrapper: MemoryRouter });

    const fill = (label, value) => {
      const input = screen.getByLabelText(label);
      fireEvent.change(input, { target: { value } });
    };

    fill(/title/i, 'Test Event');
    fill(/date/i, '2025-08-01');
    fill(/time/i, '18:00');
    fill(/total seats/i, '100');
    fill(/left seats/i, '100');
    fill(/location/i, 'Madhubani');

    const file = new File(['dummy'], 'banner.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/banner image/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole('button', { name: /create event/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to create event/i)).toBeInTheDocument();
    });
  });
});