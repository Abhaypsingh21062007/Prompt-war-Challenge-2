import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { 
  ShieldCheck, 
  Accessibility, 
  Lock, 
  Globe, 
  MessageSquare, 
  Send, 
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--glass-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gradient mb-6 block">
              Election Guide AI
            </Link>
            <Typography variant="body" className="text-[var(--foreground)]/60 max-w-sm mb-6">
              Our mission is to empower citizens with unbiased, AI-powered information to make informed decisions and strengthen the foundation of democracy.
            </Typography>
            {/* Social Links */}
            <div className="flex gap-4">
              {[MessageSquare, Send, Globe].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="p-2.5 rounded-xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] text-[var(--foreground)]/40 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant="h4" className="mb-6">Resources</Typography>
            <ul className="space-y-4">
              {['Candidate List', 'Issue Tracking', 'Polling Stations', 'Voter Helpline'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <Typography variant="h4" className="mb-6">Company</Typography>
            <ul className="space-y-4">
              {['About Us', 'Contact Support', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[var(--glass-border)] mb-8">
          {[
            { icon: ShieldCheck, text: "Fact-Checked Data", color: "text-blue-500" },
            { icon: Lock, text: "Privacy Protected", color: "text-green-500" },
            { icon: Accessibility, text: "WCAG 2.1 Compliant", color: "text-orange-500" },
            { icon: Globe, text: "Unbiased AI", color: "text-purple-500" }
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
              <badge.icon size={20} className={badge.color} />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--foreground)]/40">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs text-[var(--foreground)]/40">
            <span>© {currentYear} Election Guide AI</span>
            <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Statement</Link>
            <Link href="/accessibility" className="hover:text-[var(--primary)] transition-colors">Accessibility Note</Link>
          </div>
          
          <div className="flex flex-col items-end gap-1 text-xs text-[var(--foreground)]/30">
            <div className="flex items-center gap-1">
              Made with <Heart size={12} className="text-red-500 fill-current" /> for a stronger democracy
            </div>
            <div className="font-bold text-[var(--foreground)]/50">
              Deployed by Abhay Pratap Singh
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
