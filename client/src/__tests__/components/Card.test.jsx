/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../../components/Card';

const mockProps = {
  id: '123',
  title: 'React Conference 2025',
  date: '2025-08-15',
  location: 'Bangalore',
  description: 'Join us for a deep dive into React and its ecosystem.',
  bannerPath: 'react-conf.jpg',
  leftSeate: 42,
  time: '10:00 AM',
};

describe('Card Component', () => {
  it('renders all event details correctly', () => {
    render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    // Image alt text
    expect(screen.getByAltText(/Banner for React Conference 2025/i)).toBeInTheDocument();

    // Title
    expect(screen.getByRole('heading', { name: /React Conference 2025/i })).toBeInTheDocument();

    // Location and time
    expect(screen.getByText(/📍 Bangalore | ⏰ 10:00 AM/i)).toBeInTheDocument();

    // Description
    expect(screen.getByText(/Join us for a deep dive into React/i)).toBeInTheDocument();

    // Seats left
    expect(screen.getByText(/🪑 Seats Left: 42/i)).toBeInTheDocument();

    // Date
    expect(screen.getByText(/📅 2025-08-15/i)).toBeInTheDocument();

    // Button
    expect(screen.getByRole('button', { name: /View details for React Conference 2025/i })).toBeInTheDocument();
  });

  it('has accessible roles and labels', () => {
    render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    const article = screen.getByRole('group');
    expect(article).toHaveAttribute('aria-labelledby', 'event-title-123');

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('View details for React Conference 2025');
  });

  it('handles missing seats gracefully', () => {
    render(
      <MemoryRouter>
        <Card {...mockProps} leftSeate={null} />
      </MemoryRouter>
    );

    expect(screen.getByText(/🪑 Seats Left: N\/A/i)).toBeInTheDocument();
  });
});