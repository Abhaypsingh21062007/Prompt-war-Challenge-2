import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '@/components/FAQ';

describe('FAQ Component', () => {
  // ── RENDERING ─────────────────────────────────────────────────────────────
  describe('Initial Render', () => {
    it('renders all 4 FAQ questions', () => {
      render(<FAQ />);
      expect(screen.getByText(/How do I register to vote\?/i)).toBeInTheDocument();
      expect(screen.getByText(/What should I do if my name is missing/i)).toBeInTheDocument();
      expect(screen.getByText(/What is NOTA and how does it work\?/i)).toBeInTheDocument();
      expect(screen.getByText(/How are the election results counted\?/i)).toBeInTheDocument();
    });

    it('renders no answer text on initial load (all collapsed)', () => {
      render(<FAQ />);
      // Answers should not be visible until a question is clicked
      expect(screen.queryByText(/You can register online through the Voter Helpline App/i)).not.toBeInTheDocument();
    });

    it('renders all toggle buttons with aria-expanded=false initially', () => {
      render(<FAQ />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(btn => {
        expect(btn).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  // ── INTERACTION ───────────────────────────────────────────────────────────
  describe('Accordion Interaction', () => {
    it('opens the first FAQ when clicked', () => {
      render(<FAQ />);
      const firstButton = screen.getByText(/How do I register to vote\?/i).closest('button')!;
      fireEvent.click(firstButton);
      expect(screen.getByText(/You can register online through the Voter Helpline App/i)).toBeInTheDocument();
    });

    it('sets aria-expanded=true when a question is opened', () => {
      render(<FAQ />);
      const firstButton = screen.getByText(/How do I register to vote\?/i).closest('button')!;
      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes an open FAQ when clicked again (toggle)', () => {
      render(<FAQ />);
      const firstButton = screen.getByText(/How do I register to vote\?/i).closest('button')!;
      fireEvent.click(firstButton); // open
      fireEvent.click(firstButton); // close
      expect(screen.queryByText(/You can register online through the Voter Helpline App/i)).not.toBeInTheDocument();
    });

    it('closes the previously open FAQ when another is clicked', () => {
      render(<FAQ />);
      // Open first FAQ
      const firstButton = screen.getByText(/How do I register to vote\?/i).closest('button')!;
      fireEvent.click(firstButton);
      expect(screen.getByText(/You can register online through the Voter Helpline App/i)).toBeInTheDocument();

      // Open second FAQ — first should close
      const secondButton = screen.getByText(/What should I do if my name is missing/i).closest('button')!;
      fireEvent.click(secondButton);
      expect(screen.queryByText(/You can register online through the Voter Helpline App/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Electoral Registration Officer/i)).toBeInTheDocument();
    });

    it('opens the NOTA question and shows its full answer', () => {
      render(<FAQ />);
      const notaButton = screen.getByText(/What is NOTA/i).closest('button')!;
      fireEvent.click(notaButton);
      expect(screen.getByText(/None of the Above/i)).toBeInTheDocument();
    });

    it('opens the results counting question and shows its answer', () => {
      render(<FAQ />);
      const countingButton = screen.getByText(/How are the election results counted/i).closest('button')!;
      fireEvent.click(countingButton);
      expect(screen.getByText(/designated counting centers/i)).toBeInTheDocument();
    });
  });

  // ── ACCESSIBILITY ─────────────────────────────────────────────────────────
  describe('Accessibility', () => {
    it('each toggle button has aria-expanded attribute', () => {
      render(<FAQ />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(4);
      buttons.forEach(btn => {
        expect(btn).toHaveAttribute('aria-expanded');
      });
    });
  });
});
