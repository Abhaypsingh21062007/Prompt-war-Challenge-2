import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the footer content correctly', () => {
    render(<Footer />);
    
    // "Election Guide AI" appears in both brand link and copyright line
    expect(screen.getAllByText(/Election Guide AI/i).length).toBeGreaterThan(0);
    // Mission text actually rendered in Footer
    expect(screen.getByText(/empower citizens with unbiased/i)).toBeInTheDocument();
    // Section headings in Footer
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    // Copyright line
    expect(screen.getByText(/©/i)).toBeInTheDocument();
  });
});
