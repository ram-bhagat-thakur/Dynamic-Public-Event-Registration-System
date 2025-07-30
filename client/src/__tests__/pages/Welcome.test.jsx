import { render, screen, fireEvent, within } from '@testing-library/react';
import Welcome from '../../pages/Welcome';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// ✅ Mock URL.createObjectURL
beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
});

// ✅ Mock react-confetti
vi.mock('react-confetti', () => ({
    default: () => <div data-testid="mock-confetti" />,
}));

// ✅ Mock react-router
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
        useLocation: () => ({
            state: {
                name: 'Ram',
                email: 'ram@example.com',
                event: {
                    id: 'abc123',
                    title: 'React Summit',
                    date: '2025-08-01',
                    location: 'Bangalore',
                    description: 'A conference for React enthusiasts',
                },
            },
        }),
    };
});

// ✅ Mock clipboard
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockResolvedValue(),
    },
});

// ✅ Helper: Match exact text content
const getByTextContentExact = (container, text) =>
    within(container).getByText((_, el) => el.textContent === text);

// ✅ Helper: Match partial text content
const getAllByTextContent = (container, text) =>
    within(container).getAllByText((_, el) => el.textContent?.includes(text));

describe('Welcome Page', () => {
    test('renders event summary with name, title, date, and location', () => {
        render(<MemoryRouter><Welcome /></MemoryRouter>);
        const summary = screen.getByRole('article');
        expect(getAllByTextContent(summary, 'React Summit')).toHaveLength(3);
        expect(getAllByTextContent(summary, '2025-08-01')).toHaveLength(3);
        expect(getAllByTextContent(summary, 'Bangalore')).toHaveLength(3);
    });

    test('shows days left message', () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );

        const messages = screen.getAllByText((_, element) =>
            element?.textContent?.match(/Only \d+ day(s)? left — get excited!/i)
        );

        expect(messages.length).toBeGreaterThan(0);
    });

    test('copies share link to clipboard and shows confirmation', async () => {
        render(<MemoryRouter><Welcome /></MemoryRouter>);
        const shareButton = screen.getByRole('button', { name: /Copy event share link/i });
        fireEvent.click(shareButton);

        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(await screen.findByText(/Link copied to clipboard/i)).toBeInTheDocument();
    });

    test('calendar invite button triggers download', () => {
        render(<MemoryRouter><Welcome /></MemoryRouter>);
        const downloadSpy = vi.spyOn(document, 'createElement');
        const calendarButton = screen.getByRole('button', { name: /Download calendar invite/i });
        fireEvent.click(calendarButton);

        expect(downloadSpy).toHaveBeenCalledWith('a');
        expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    test('browse events button is present', () => {
        render(<MemoryRouter><Welcome /></MemoryRouter>);
        const browseButton = screen.getByRole('button', { name: /Browse more events/i });
        expect(browseButton).toBeInTheDocument();
    });
});