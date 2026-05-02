import { render, screen } from '@testing-library/react';
import HeroSection from '../src/components/HeroSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  return {
    __esModule: true,
    motion: {
      div: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
        const { layoutId, variants, initial, animate, exit, transition, ...rest } = props;
        return <div ref={ref} {...rest}>{children}</div>;
      }),
      span: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
        const { layoutId, variants, initial, animate, exit, transition, ...rest } = props;
        return <span ref={ref} {...rest}>{children}</span>;
      }),
      button: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
        const { whileHover, whileTap, variants, ...rest } = props;
        return <button ref={ref} {...rest}>{children}</button>;
      }),
    },
  };
});

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
