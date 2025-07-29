import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
import * as authService from '../../services/authService';

vi.mock('../../services/authService', () => ({
  loginAdmin: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AdminLogin', () => {
  beforeEach(() => {
    localStorage.clear();
    authService.loginAdmin.mockReset();
    mockNavigate.mockReset();
  });

  it('updates input fields correctly', () => {
    render(<AdminLogin />, { wrapper: MemoryRouter });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'secret' } });

    expect(usernameInput.value).toBe('admin');
    expect(passwordInput.value).toBe('secret');
  });

  it('logs in successfully and navigates', async () => {
    authService.loginAdmin.mockResolvedValueOnce({
      data: { token: 'abc123', name: 'Admin Ram' },
    });

    render(<AdminLogin />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'secret' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.loginAdmin).toHaveBeenCalledWith({
        username: 'admin',
        password: 'secret',
      });
      expect(localStorage.getItem('adminToken')).toBe('abc123');
      expect(localStorage.getItem('adminName')).toBe('Admin Ram');
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  it('shows error message on failed login', async () => {
    authService.loginAdmin.mockRejectedValueOnce(new Error('Invalid'));

    render(<AdminLogin />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});