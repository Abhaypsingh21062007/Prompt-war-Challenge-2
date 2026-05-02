import { render, screen } from '@testing-library/react';
import EligibilityChecker from '../src/components/EligibilityChecker';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('EligibilityChecker', () => {
  it('renders the eligibility checker form', () => {
    render(<EligibilityChecker />);
    expect(screen.getByText('Check Your Eligibility')).toBeInTheDocument();
  });
});
