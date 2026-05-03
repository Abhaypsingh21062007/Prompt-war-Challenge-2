import { render, screen } from '@testing-library/react';
import VoteKitPage from '@/pages/votekit';

jest.mock('@/components/VotingEssentials', () => {
  return function MockVotingEssentials() {
    return <div data-testid="voting-essentials-full">Voting Essentials Full Mock</div>;
  };
});

describe('VoteKit Page', () => {
  it('renders the votekit page correctly', () => {
    render(<VoteKitPage />);
    
    expect(screen.getByText(/The/i, { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByText(/VoteKit/i, { selector: 'h1 span' })).toBeInTheDocument();
    expect(screen.getByText(/Everything you need to navigate/i)).toBeInTheDocument();
    expect(screen.getByTestId('voting-essentials-full')).toBeInTheDocument();
  });
});
