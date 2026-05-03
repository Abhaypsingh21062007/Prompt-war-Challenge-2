import { cn } from '@/utils/cn';

/**
 * Tests for the `cn` utility — merges Tailwind classes safely.
 * This is a pure function, so no mocking is needed.
 */
describe('cn utility', () => {
  // ── BASIC MERGING ─────────────────────────────────────────────────────────
  describe('Basic class merging', () => {
    it('merges multiple class strings', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles a single class string', () => {
      expect(cn('text-white')).toBe('text-white');
    });

    it('returns empty string with no arguments', () => {
      expect(cn()).toBe('');
    });
  });

  // ── CONDITIONAL CLASSES ───────────────────────────────────────────────────
  describe('Conditional classes (clsx behaviour)', () => {
    it('includes truthy conditional classes', () => {
      expect(cn('base', true && 'active')).toBe('base active');
    });

    it('excludes falsy conditional classes', () => {
      expect(cn('base', false && 'hidden')).toBe('base');
    });

    it('handles undefined gracefully', () => {
      expect(cn('base', undefined)).toBe('base');
    });

    it('handles null gracefully', () => {
      expect(cn('base', null)).toBe('base');
    });

    it('handles object-style conditionals', () => {
      expect(cn({ 'text-red-500': true, 'text-green-500': false })).toBe('text-red-500');
    });

    it('handles array-style inputs', () => {
      expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
    });
  });

  // ── TAILWIND CONFLICT RESOLUTION ──────────────────────────────────────────
  describe('Tailwind conflict resolution (twMerge behaviour)', () => {
    it('resolves conflicting padding classes (last one wins)', () => {
      expect(cn('px-4', 'px-8')).toBe('px-8');
    });

    it('resolves conflicting text color classes', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('resolves conflicting font size classes', () => {
      expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('resolves conflicting background color classes', () => {
      expect(cn('bg-red-500', 'bg-green-500')).toBe('bg-green-500');
    });

    it('does NOT remove non-conflicting classes', () => {
      const result = cn('p-4', 'text-white', 'rounded-xl');
      expect(result).toContain('p-4');
      expect(result).toContain('text-white');
      expect(result).toContain('rounded-xl');
    });
  });

  // ── REAL-WORLD USAGE ──────────────────────────────────────────────────────
  describe('Real-world component usage patterns', () => {
    it('handles dynamic button variant class merging', () => {
      const isActive = true;
      const result = cn(
        'px-4 py-2 rounded-xl font-bold transition-all',
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
      );
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('text-white');
      expect(result).not.toContain('bg-gray-100');
    });

    it('merges override prop classes with base classes', () => {
      const base = 'text-sm font-medium';
      const override = 'text-lg'; // should override text-sm
      expect(cn(base, override)).toBe('font-medium text-lg');
    });
  });
});
