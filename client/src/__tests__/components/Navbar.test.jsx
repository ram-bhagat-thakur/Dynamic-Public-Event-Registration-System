/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  it('renders logo and navigation links', () => {
    expect(screen.getByLabelText(/SECT Event Home/i)).toBeInTheDocument();

    ['Home', 'Events', 'Contact', 'Admin'].forEach((name) => {
      expect(screen.getAllByLabelText(`Go to ${name}`)[0]).toBeInTheDocument();
    });
  });

  it('has correct accessibility roles', () => {
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
    expect(screen.getByRole('menubar')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle navigation menu')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    const toggleButton = screen.getByLabelText('Toggle navigation menu');
    const mobileMenu = screen.getByLabelText('Mobile navigation');

    // Initially hidden
    expect(mobileMenu).toHaveClass('max-h-0');

    // Click to open
    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass('max-h-screen');

    // Click to close
    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass('max-h-0');
  });

  it('closes mobile menu when a link is clicked', () => {
    const toggleButton = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(toggleButton); // open menu

    const mobileLink = screen.getAllByLabelText('Go to Home')[1]; // mobile version
    fireEvent.click(mobileLink);

    const mobileMenu = screen.getByLabelText('Mobile navigation');
    expect(mobileMenu).toHaveClass('max-h-0');
  });
});