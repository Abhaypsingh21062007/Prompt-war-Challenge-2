import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  UserPlus, 
  Mic,
  Zap
} from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstVoter, setIsFirstVoter] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Candidates', href: '/candidates' },
    { name: 'Issues', href: '/issues' },
    { name: 'VoteKit', href: '/votekit' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-2xl transition-transform group-hover:scale-110 drop-shadow-lg shadow-[var(--primary)]/20">
                <Image 
                  src="/logo_v3.png" 
                  alt="Election Guide AI Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-gradient">
                Election Guide AI
              </span>
            </Link>
            {isFirstVoter && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold border border-orange-500/20 uppercase tracking-tighter"
              >
                <Zap size={10} fill="currentColor" /> First Voter Mode
              </motion.span>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-[var(--foreground)]/80 hover:text-[var(--primary)] font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-[var(--glass-border)] mx-2" />

            {/* First Voter Mode Toggle */}
            <button 
              onClick={() => setIsFirstVoter(!isFirstVoter)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold cursor-pointer border",
                isFirstVoter 
                  ? "bg-orange-500 text-white border-transparent" 
                  : "bg-[var(--foreground)]/5 border-[var(--glass-border)] hover:bg-[var(--foreground)]/10"
              )}
            >
              <UserPlus size={14} />
              {isFirstVoter ? "Beginner" : "Regular"}
            </button>

            {/* Voice Assistant Placeholder */}
            <button className="p-2 rounded-lg bg-[var(--foreground)]/5 border border-[var(--glass-border)] text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-all cursor-not-allowed group relative">
              <Mic size={16} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--foreground)] text-[var(--background)] text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </div>
            </button>

            {mounted && (
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[var(--foreground)]/5 border border-[var(--glass-border)] hover:bg-[var(--foreground)]/10 transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsFirstVoter(!isFirstVoter)}
              className={cn(
                "p-2 rounded-lg border",
                isFirstVoter ? "bg-orange-500 text-white border-transparent" : "bg-[var(--foreground)]/5 border-[var(--glass-border)]"
              )}
            >
              <UserPlus size={18} />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[var(--foreground)] focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--background)] border-b border-[var(--glass-border)] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-lg font-medium text-[var(--foreground)]/80"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--glass-border)]">
                {mounted && (
                  <button 
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 py-3 w-full rounded-xl bg-[var(--foreground)]/5 font-bold"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} Theme
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
