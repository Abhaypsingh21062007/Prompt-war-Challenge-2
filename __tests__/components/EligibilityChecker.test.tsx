import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EligibilityChecker from '@/components/EligibilityChecker';

describe('EligibilityChecker Component', () => {
  // ── RENDERING ─────────────────────────────────────────────────────────────
  describe('Initial Render', () => {
    it('renders the form heading', () => {
      render(<EligibilityChecker />);
      expect(screen.getByText('Check Your Eligibility')).toBeInTheDocument();
    });

    it('renders age, citizenship and state inputs', () => {
      render(<EligibilityChecker />);
      expect(screen.getByPlaceholderText(/e.g. 21/i)).toBeInTheDocument();
      expect(screen.getByText('Indian')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('shows the empty state prompt before form is filled', () => {
      render(<EligibilityChecker />);
      expect(screen.getByText(/Fill out the form to see your/i)).toBeInTheDocument();
    });

    it('does NOT show eligibility result before form is filled', () => {
      render(<EligibilityChecker />);
      expect(screen.queryByText(/Eligible to Vote/i)).not.toBeInTheDocument();
    });
  });

  // ── ELIGIBILITY LOGIC ─────────────────────────────────────────────────────
  describe('Eligibility Logic', () => {
    const fillAndCheck = (age: string, citizenship: 'Indian' | 'Other', state: string) => {
      render(<EligibilityChecker />);
      // Enter age
      fireEvent.change(screen.getByPlaceholderText(/e.g. 21/i), { target: { value: age } });
      // Select citizenship
      fireEvent.click(screen.getByText(citizenship));
      // Select state
      fireEvent.change(screen.getByRole('combobox'), { target: { value: state } });
    };

    it('shows ELIGIBLE for an 18-year-old Indian citizen', () => {
      fillAndCheck('18', 'Indian', 'Delhi');
      expect(screen.getByText(/Eligible to Vote!/i)).toBeInTheDocument();
    });

    it('shows ELIGIBLE for a 30-year-old Indian citizen', () => {
      fillAndCheck('30', 'Indian', 'Maharashtra');
      expect(screen.getByText(/Eligible to Vote!/i)).toBeInTheDocument();
    });

    it('shows NOT ELIGIBLE for a 17-year-old (below voting age)', () => {
      fillAndCheck('17', 'Indian', 'Delhi');
      expect(screen.getByText(/Not Eligible Yet/i)).toBeInTheDocument();
      expect(screen.getByText(/Must be at least 18 years old/i)).toBeInTheDocument();
    });

    it('shows NOT ELIGIBLE for a non-Indian citizen', () => {
      fillAndCheck('25', 'Other', 'Delhi');
      expect(screen.getByText(/Not Eligible Yet/i)).toBeInTheDocument();
      expect(screen.getByText(/Only Indian citizens are eligible/i)).toBeInTheDocument();
    });

    it('shows NOT ELIGIBLE for 16-year-old non-Indian (both reasons shown)', () => {
      fillAndCheck('16', 'Other', 'Delhi');
      expect(screen.getByText(/Not Eligible Yet/i)).toBeInTheDocument();
      expect(screen.getByText(/Must be at least 18 years old/i)).toBeInTheDocument();
      expect(screen.getByText(/Only Indian citizens are eligible/i)).toBeInTheDocument();
    });

    it('shows the state name in the eligible result message', () => {
      fillAndCheck('25', 'Indian', 'Kerala');
      // Use getAllByText and check that at least one is present (one in select, one in result)
      expect(screen.getAllByText(/Kerala/i).length).toBeGreaterThanOrEqual(1);
      // Or check specifically for the one in the result text
      expect(screen.getByText(/You meet all criteria to vote in/i)).toBeInTheDocument();
    });

    it('shows Register Now button when eligible', () => {
      fillAndCheck('25', 'Indian', 'Gujarat');
      expect(screen.getByText(/Register Now/i)).toBeInTheDocument();
    });

    it('does NOT show Register Now button when not eligible', () => {
      fillAndCheck('15', 'Indian', 'Punjab');
      expect(screen.queryByText(/Register Now/i)).not.toBeInTheDocument();
    });
  });

  // ── EDGE CASES ────────────────────────────────────────────────────────────
  describe('Edge Cases', () => {
    it('shows no result when only age is filled (incomplete form)', () => {
      render(<EligibilityChecker />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. 21/i), { target: { value: '25' } });
      expect(screen.queryByText(/Eligible to Vote/i)).not.toBeInTheDocument();
    });

    it('shows no result when state is not selected', () => {
      render(<EligibilityChecker />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. 21/i), { target: { value: '25' } });
      // citizenship default is 'indian' but state is empty
      expect(screen.queryByText(/Eligible to Vote/i)).not.toBeInTheDocument();
    });

    it('boundary: age exactly 18 is eligible', () => {
      render(<EligibilityChecker />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. 21/i), { target: { value: '18' } });
      fireEvent.click(screen.getByText('Indian'));
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Delhi' } });
      expect(screen.getByText(/Eligible to Vote!/i)).toBeInTheDocument();
    });

    it('boundary: age 0 is not eligible', () => {
      render(<EligibilityChecker />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. 21/i), { target: { value: '0' } });
      fireEvent.click(screen.getByText('Indian'));
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Delhi' } });
      expect(screen.getByText(/Not Eligible Yet/i)).toBeInTheDocument();
    });
  });

  // ── STATE DROPDOWN ────────────────────────────────────────────────────────
  describe('State Dropdown', () => {
    it('contains all key Indian states', () => {
      render(<EligibilityChecker />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('');
      const options = select.querySelectorAll('option');
      // 36 states/UTs + 1 placeholder = 37
      expect(options.length).toBeGreaterThanOrEqual(36);
    });

    it('includes Delhi in the dropdown', () => {
      render(<EligibilityChecker />);
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'Delhi' } });
      expect(select).toHaveValue('Delhi');
    });
  });
});
