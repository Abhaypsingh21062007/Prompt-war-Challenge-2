import SEO from '@/components/SEO';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import FindConstituency from '@/components/FindConstituency';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function LocateMePage() {
  return (
    <>
      <SEO
        title="Locate Me - Find Your Constituency | Election Guide AI"
        description="Enter your pincode or use GPS to instantly find your Lok Sabha constituency, polling booth, and local candidates."
      />

      {/* Hero Banner */}
      <Section className="pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-bold mb-6"
          >
            <MapPin size={16} />
            Location-Aware Constituency Finder
          </motion.div>

          <Typography variant="h1" className="mb-4">
            Find Your <span className="text-gradient">Constituency</span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto opacity-70">
            Enter your 6-digit PIN code or tap <strong>Detect My Location</strong> to instantly
            discover your Lok Sabha constituency, nearest polling booth, and registered candidates.
          </Typography>
        </motion.div>
      </Section>

      {/* Main Tool */}
      <Section className="pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <FindConstituency />
        </motion.div>
      </Section>

      {/* Quick links back */}
      <Section className="pb-20 bg-[var(--foreground)]/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <Typography variant="h4" className="opacity-60">
            Explore more tools
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="px-6 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--foreground)]/10 transition-all font-bold text-sm">
              🏠 Home
            </Link>
            <Link href="/votekit" className="px-6 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--foreground)]/10 transition-all font-bold text-sm">
              🗳️ VoteKit
            </Link>
            <Link href="/issues" className="px-6 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--foreground)]/10 transition-all font-bold text-sm">
              📋 Issues
            </Link>
            <Link href="/candidates" className="px-6 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--foreground)]/10 transition-all font-bold text-sm">
              👥 Candidates
            </Link>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
