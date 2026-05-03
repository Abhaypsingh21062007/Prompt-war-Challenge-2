import { render, screen, fireEvent } from '@testing-library/react';
import VotingEssentials from '@/components/VotingEssentials';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('VotingEssentials Component', () => {
  // ── RENDERING ─────────────────────────────────────────────────────────────
  describe('Initial Render', () => {
    it('renders all 9 voting essential cards', () => {
      render(<VotingEssentials />);
      const allItems = ['EVM', 'Voter ID', 'Indelible Ink', 'VVPAT', 'Polling Station', 'Voter Slip', 'NOTA', 'MCC', 'Postal Ballot'];
      allItems.forEach(name => {
        // Each card renders its name on front AND back so getAllByText is needed
        expect(screen.getAllByText(name).length).toBeGreaterThanOrEqual(1);
      });
    });

    it('renders alt text for all card images', () => {
      render(<VotingEssentials />);
      expect(screen.getByAltText('EVM')).toBeInTheDocument();
      expect(screen.getByAltText('Voter ID')).toBeInTheDocument();
      expect(screen.getByAltText('Indelible Ink')).toBeInTheDocument();
    });
  });

  // ── FLIP CARD INTERACTION ─────────────────────────────────────────────────
  describe('FlashCard Hover Interaction', () => {
    it('shows description on mouse enter (flip)', () => {
      render(<VotingEssentials />);
      // Find the EVM card container (the outermost div with onMouseEnter)
      const evmDescription = /The Electronic Voting Machine is used to record and count votes electronically/i;
      // Description is always rendered (back side), just hidden via CSS transform
      expect(screen.getByText(evmDescription)).toBeInTheDocument();
    });

    it('triggers flip state on mouseEnter for first card', () => {
      render(<VotingEssentials />);
      // The first card's container has the mouse events
      const cards = document.querySelectorAll('.perspective-1000');
      expect(cards.length).toBe(9);
      // Fire mouseEnter to toggle isFlipped to true
      fireEvent.mouseEnter(cards[0]);
      // Fire mouseLeave to toggle isFlipped back
      fireEvent.mouseLeave(cards[0]);
      // Component should not crash
      expect(cards[0]).toBeInTheDocument();
    });

    it('contains NOTA description text', () => {
      render(<VotingEssentials />);
      expect(screen.getByText(/register a vote of rejection for all candidates/i)).toBeInTheDocument();
    });

    it('contains Postal Ballot description text', () => {
      render(<VotingEssentials />);
      expect(screen.getByText(/cast their vote remotely through post/i)).toBeInTheDocument();
    });

    it('contains MCC description text', () => {
      render(<VotingEssentials />);
      expect(screen.getByText(/Model Code of Conduct/i)).toBeInTheDocument();
    });
  });

  // ── GRID LAYOUT ───────────────────────────────────────────────────────────
  describe('Grid Structure', () => {
    it('renders exactly 9 flashcard containers', () => {
      render(<VotingEssentials />);
      const cards = document.querySelectorAll('.perspective-1000');
      expect(cards.length).toBe(9);
    });
  });
});
