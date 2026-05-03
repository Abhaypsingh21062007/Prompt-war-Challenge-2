import { render, screen } from '@testing-library/react';
import IssuesPage from '@/pages/issues';

jest.mock('@/components/IssueTracking', () => {
  return function MockIssueTracking() {
    return <div data-testid="issue-tracker-full">Issue Tracker Full Mock</div>;
  };
});

describe('Issues Page', () => {
  it('renders the issues page correctly', () => {
    render(<IssuesPage />);
    
    expect(screen.getByText(/Key Election/i)).toBeInTheDocument();
    expect(screen.getByText(/Understand the critical topics/i)).toBeInTheDocument();
  });
});
