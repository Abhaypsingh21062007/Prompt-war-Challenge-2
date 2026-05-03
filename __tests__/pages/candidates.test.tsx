import { render, screen } from '@testing-library/react';
import CandidatesPage from '@/pages/candidates';

jest.mock('@/components/CandidateAnalysis', () => {
  return function MockCandidateAnalysis() {
    return <div data-testid="candidate-match-full">Candidate Match Full Mock</div>;
  };
});

describe('Candidates Page', () => {
  it('renders the candidates page correctly', () => {
    render(<CandidatesPage />);
    
    expect(screen.getByText(/Candidate/i, { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByText(/Profiles/i, { selector: 'h1 span' })).toBeInTheDocument();
    expect(screen.getByText(/Deep dive into the backgrounds/i)).toBeInTheDocument();
  });
});
