import { render, screen, fireEvent } from '@testing-library/react';
import VoterStats from '@/components/VoterStats';

describe('VoterStats Component', () => {
  // ── RENDERING ─────────────────────────────────────────────────────────────
  describe('Initial Render', () => {
    it('renders the Voter Turnout heading', () => {
      render(<VoterStats />);
      expect(screen.getByText(/Voter Turnout/i)).toBeInTheDocument();
    });

    it('renders all 5 election years in the chart', () => {
      render(<VoterStats />);
      expect(screen.getByText(/2004/)).toBeInTheDocument();
      expect(screen.getByText(/2009/)).toBeInTheDocument();
      expect(screen.getByText(/2014/)).toBeInTheDocument();
      expect(screen.getByText(/2019/)).toBeInTheDocument();
      expect(screen.getByText(/2024/)).toBeInTheDocument();
    });

    it('shows the projected label for 2024', () => {
      render(<VoterStats />);
      expect(screen.getByText(/Projected/i)).toBeInTheDocument();
    });

    it('renders all turnout percentages', () => {
      render(<VoterStats />);
      expect(screen.getByText('58.07%')).toBeInTheDocument();
      expect(screen.getByText('58.19%')).toBeInTheDocument();
      expect(screen.getByText('66.44%')).toBeInTheDocument();
      expect(screen.getByText('67.4%')).toBeInTheDocument();
      expect(screen.getByText('70.2%')).toBeInTheDocument();
    });

    it('renders the data verification note', () => {
      render(<VoterStats />);
      expect(screen.getByText(/Data verified by Election Guide AI Research Team/i)).toBeInTheDocument();
    });
  });

  // ── INTERACTIVE MAP CARD ──────────────────────────────────────────────────
  describe('Interactive Map Section', () => {
    it('renders the Live Constituency Map heading', () => {
      render(<VoterStats />);
      expect(screen.getByText(/Live Constituency Map/i)).toBeInTheDocument();
    });

    it('shows the constituencies tracked count', () => {
      render(<VoterStats />);
      expect(screen.getByText(/543 Constituencies Tracked/i)).toBeInTheDocument();
    });
  });
});
