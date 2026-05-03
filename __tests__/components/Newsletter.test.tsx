import { render, screen, fireEvent, act } from '@testing-library/react';
import Newsletter from '@/components/Newsletter';

describe('Newsletter Component', () => {
  // ── RENDERING ─────────────────────────────────────────────────────────────
  describe('Initial Render', () => {
    it('renders the newsletter heading', () => {
      render(<Newsletter />);
      expect(screen.getByText(/Stay Informed, Vote Smarter/i)).toBeInTheDocument();
    });

    it('renders the subscriber count copy', () => {
      render(<Newsletter />);
      expect(screen.getByText(/50,000\+/i)).toBeInTheDocument();
    });

    it('renders the email input', () => {
      render(<Newsletter />);
      expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    });

    it('renders the Subscribe button', () => {
      render(<Newsletter />);
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });

    it('renders privacy notice', () => {
      render(<Newsletter />);
      expect(screen.getByText(/We respect your privacy/i)).toBeInTheDocument();
    });

    it('does NOT show success state on initial render', () => {
      render(<Newsletter />);
      expect(screen.queryByText(/You're on the list!/i)).not.toBeInTheDocument();
    });
  });

  // ── EMAIL INPUT ───────────────────────────────────────────────────────────
  describe('Email Input', () => {
    it('updates email state as user types', () => {
      render(<Newsletter />);
      const input = screen.getByPlaceholderText(/Enter your email/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test@example.com' } });
      expect(input.value).toBe('test@example.com');
    });

    it('email input has type="email"', () => {
      render(<Newsletter />);
      const input = screen.getByPlaceholderText(/Enter your email/i);
      expect(input).toHaveAttribute('type', 'email');
    });

    it('email input has required attribute', () => {
      render(<Newsletter />);
      const input = screen.getByPlaceholderText(/Enter your email/i);
      expect(input).toHaveAttribute('required');
    });
  });

  // ── FORM SUBMISSION ───────────────────────────────────────────────────────
  describe('Form Submission', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('shows success state after valid email submission', () => {
      render(<Newsletter />);
      const input = screen.getByPlaceholderText(/Enter your email/i);
      const form = input.closest('form')!;

      fireEvent.change(input, { target: { value: 'voter@india.gov.in' } });
      fireEvent.submit(form);

      // Simulate the 800ms timeout
      act(() => jest.advanceTimersByTime(800));

      expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
      expect(screen.getByText(/Check your inbox/i)).toBeInTheDocument();
    });

    it('clears the email input after successful subscription', () => {
      render(<Newsletter />);
      const input = screen.getByPlaceholderText(/Enter your email/i) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test@test.com' } });
      fireEvent.submit(input.closest('form')!);
      act(() => jest.advanceTimersByTime(800));

      // Form is gone, success message shown — no stale email
      expect(screen.queryByPlaceholderText(/Enter your email/i)).not.toBeInTheDocument();
    });

    it('does NOT submit if email is empty', () => {
      render(<Newsletter />);
      const form = screen.getByPlaceholderText(/Enter your email/i).closest('form')!;
      fireEvent.submit(form);
      act(() => jest.advanceTimersByTime(800));
      // Success state should NOT appear
      expect(screen.queryByText(/You're on the list!/i)).not.toBeInTheDocument();
    });
  });
});
