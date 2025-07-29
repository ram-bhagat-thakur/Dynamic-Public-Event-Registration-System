// src/__tests__/components/ProtectedRoute.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../../components/ProtectedRoute';

const DummyProtectedPage = () => <div>Protected Content</div>;
const DummyLoginPage = () => <div>Login Page</div>;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to login if no token is present', () => {
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DummyProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<DummyLoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders children if token is present', () => {
    localStorage.setItem('adminToken', 'valid-token');

    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DummyProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<DummyLoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});