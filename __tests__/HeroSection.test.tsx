import { render, screen } from '@testing-library/react';
import HeroSection from '../src/components/HeroSection';

// Mock next/link to avoid issues with standard <a> tag mapping
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('lucide-react', () => ({
  Sparkles: () => <span>Sparkles</span>,
  MessageCircle: () => <span>MessageCircle</span>,
  Bot: () => <span>Bot</span>,
}));

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />);
    const heading = screen.getByText(/Understand Elections/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders trust indicators', () => {
    render(<HeroSection />);
    expect(screen.getByText('100% Unbiased & Neutral')).toBeInTheDocument();
    expect(screen.getByText('ECI-Verified & Fact-Checked')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Election Intelligence')).toBeInTheDocument();
  });
});
