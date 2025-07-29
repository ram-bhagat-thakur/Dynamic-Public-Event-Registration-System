/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RegisterEvent from '../../pages/RegisterEvent';
import * as eventService from '../../services/eventService';

vi.mock('../../services/eventService');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RegisterEvent Page', () => {
  beforeEach(() => {
    eventService.registerForEvent.mockResolvedValue({});
    mockNavigate.mockClear();
  });

  const setup = () => {
    render(
      <MemoryRouter initialEntries={['/register/abc123']}>
        <Routes>
          <Route path="/register/:eventId" element={<RegisterEvent />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders form fields and submit button', () => {
    setup();
    expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Optional message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Mobile number is required/i)).toBeInTheDocument();
  });

  it('opens modal when form is valid', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: 'Ram' } });
    fireEvent.change(screen.getByLabelText(/Your email/i), { target: { value: 'ram@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile number/i), { target: { value: '9876543210' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Confirm Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Ram/)).toBeInTheDocument();
    expect(screen.getByText(/ram@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/9876543210/)).toBeInTheDocument();
  });

  it('submits form and navigates on confirm', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: 'Ram' } });
    fireEvent.change(screen.getByLabelText(/Your email/i), { target: { value: 'ram@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mobile number/i), { target: { value: '9876543210' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    const confirmButton = await screen.findByRole('button', { name: /Confirm & Submit/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(eventService.registerForEvent).toHaveBeenCalledWith({
        name: 'Ram',
        email: 'ram@example.com',
        mobile: '9876543210',
        message: '',
        eventId: 'abc123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/welcome', expect.anything());
    });
  });
});