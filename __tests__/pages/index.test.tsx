import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

// Mock child components to isolate Home page testing
jest.mock('@/components/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section Mock</div>;
  };
});

jest.mock('@/components/IssueTracking', () => {
  return function MockIssueTracking() {
    return <div data-testid="issue-tracker">Issue Tracker Mock</div>;
  };
});

jest.mock('@/components/ElectionTimeline', () => () => <div />);
jest.mock('@/components/IndiaMap', () => () => <div />);
jest.mock('@/components/ConstituencyMap', () => () => <div />);
jest.mock('@/components/VotingGuide', () => () => <div />);
jest.mock('@/components/RequiredDocuments', () => () => <div />);
jest.mock('@/components/VoterStats', () => () => <div />);
jest.mock('@/components/FAQ', () => () => <div />);
jest.mock('@/components/Newsletter', () => () => <div />);
jest.mock('@/components/ProgressTracker', () => () => <div />);

beforeAll(() => {
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  }));
});

describe('Home Page', () => {
  it('renders without crashing and displays core sections', () => {
    render(<Home />);
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('issue-tracker')).toBeInTheDocument();
  });
});
