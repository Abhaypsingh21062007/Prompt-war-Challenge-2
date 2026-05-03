import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { useSession } from 'next-auth/react';


jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
  });

  it('renders the logo and title', () => {
    render(<Navbar />);
    expect(screen.getByText('Election Guide AI')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Candidates')).toBeInTheDocument();
    expect(screen.getByText('Issues')).toBeInTheDocument();
    expect(screen.getByText('VoteKit')).toBeInTheDocument();
  });

  it('shows Sign in with Google when not authenticated', () => {
    render(<Navbar />);
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  it('shows Logout when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });
    render(<Navbar />);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
