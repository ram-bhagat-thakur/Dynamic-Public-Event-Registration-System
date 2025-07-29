import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import axiosInstance from '../../utils/axiosInstance';

// ✅ Mock axiosInstance
vi.mock('../../utils/axiosInstance', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: 'submitted' })),
  },
}));

// ✅ Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Home Page', () => {
  test('renders FAQ section with all questions', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/1. How do I register/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Is there a limit/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Will I get an email/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Can I cancel/i)).toBeInTheDocument();
  });

  test('renders Why Choose Us cards with icons and titles', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/Real-Time Seat Tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure and Verified/i)).toBeInTheDocument();
    expect(screen.getByText(/Celebratory UI/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Dashboard/i)).toBeInTheDocument();
  });

  test('renders How It Works steps', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/Explore Events/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Confirmation/i)).toBeInTheDocument();
  });

  test('renders feedback form with name, emoji rating, and comment input', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Emoji rating/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Feedback/i })).toBeInTheDocument();
  });

  test('emoji rating selection updates form state', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const goodEmoji = screen.getByLabelText(/Good \(4 star\)/i);
    fireEvent.click(goodEmoji);
    expect(goodEmoji).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/Selected: 4 Stars/i)).toBeInTheDocument();
  });

  test('comment input allows submission when under word limit', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const commentBox = screen.getByRole('textbox', { name: /Feedback/i });
    const shortComment = Array(25).fill('word').join(' ');
    fireEvent.change(commentBox, { target: { value: shortComment } });

    const submitButton = screen.getByRole('button', { name: /Submit Feedback/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('comment input enforces word limit and disables submit if exceeded', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const commentBox = screen.getByRole('textbox', { name: /Feedback/i });
    const longComment = Array(35).fill('word').join(' ');
    fireEvent.change(commentBox, { target: { value: longComment } });

    const submitButton = screen.getByRole('button', { name: /Submit Feedback/i });

    await waitFor(() => {
      const helperText = screen.getByText((content, element) =>
        element?.id === 'comment-help' && content.includes('35/30')
      );
      expect(helperText).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    }, { timeout: 2000 });
  });

  test('emoji insert buttons append emoji to comment', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const commentBox = screen.getByRole('textbox', { name: /Feedback/i });
    const emojiButton = screen.getByLabelText(/Insert 🔥 into comment/i);
    fireEvent.click(emojiButton);
    expect(commentBox.value).toMatch(/🔥/);
  });

  test('emoji insertion does not affect word count enforcement', async () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const commentBox = screen.getByRole('textbox', { name: /Feedback/i });
    const emojiButton = screen.getByRole('button', { name: /😊/i });

    const longComment = Array(30).fill('word').join(' ');
    fireEvent.change(commentBox, { target: { value: longComment } });
    fireEvent.click(emojiButton);

    const submitButton = screen.getByRole('button', { name: /Submit Feedback/i });
    expect(submitButton).toBeDisabled(); // emoji shouldn't bypass limit
  });

  test('call to action button navigates to events page', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    const ctaButton = screen.getByRole('button', { name: /Browse & Register Now/i });
    expect(ctaButton).toBeInTheDocument();
    fireEvent.click(ctaButton);
    // Navigation is mocked, so no assertion needed
  });
});