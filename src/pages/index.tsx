import SEO from '@/components/SEO';
import HeroSection from '@/components/HeroSection';

import ElectionTimeline from '@/components/ElectionTimeline';
import IndiaMap from '@/components/IndiaMap';
import ConstituencyMap from '@/components/ConstituencyMap';
import VotingGuide from '@/components/VotingGuide';
import RequiredDocuments from '@/components/RequiredDocuments';


import IssueTracking from '@/components/IssueTracking';

import VoterStats from '@/components/VoterStats';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import FindConstituency from '@/components/FindConstituency';
import ProgressTracker from '@/components/ProgressTracker';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { motion } from 'framer-motion';

const revealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

export default function Home() {
  return (
    <>
      <SEO title="Home" />
      <ProgressTracker />
      
      {/* Hero */}
      <HeroSection />


      {/* Election Timeline */}
      <motion.div {...revealProps} id="timeline">
        <Section className="pt-24">
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--primary)]">
              How It Works
            </Typography>
            <Typography variant="h2" className="mb-4">
              The Election{' '}
              <span className="text-gradient">Journey</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Follow every stage of the election process — from announcement to final results.
            </Typography>
          </div>
          <ElectionTimeline />
        </Section>
      </motion.div>

      {/* Election Across India Map Section */}
      <motion.div {...revealProps} id="map">
        <Section className="bg-[var(--foreground)]/5">
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--secondary)]">
              Election Status
            </Typography>
            <Typography variant="h2" className="mb-4">
              Election Across{' '}
              <span className="text-gradient">India</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Select a state on the map to see the current election phase, voting dates, and real-time status.
            </Typography>
          </div>
          <IndiaMap />
        </Section>
      </motion.div>

      {/* Live Constituency Pulse Section */}
      <motion.div {...revealProps} id="constituency">
        <Section>
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--primary)]">
              Real-Time Tracking
            </Typography>
            <Typography variant="h2" className="mb-4">
              Live Constituency{' '}
              <span className="text-gradient">Pulse</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Drill down into specific constituencies to see live turnout, candidates, and verified counting results.
            </Typography>
          </div>
          <ConstituencyMap />
        </Section>
      </motion.div>



      {/* Required Documents Section */}
      <motion.div {...revealProps}>
        <Section className="bg-[var(--foreground)]/5">
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--primary)]">
              Documentation
            </Typography>
            <Typography variant="h2" className="mb-4">
              Required{' '}
              <span className="text-gradient">Documents</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              A list of valid photo identity documents you can carry to the polling station.
            </Typography>
          </div>
          <RequiredDocuments />
        </Section>
      </motion.div>

      {/* Voting Guide Section */}
      <motion.div {...revealProps} id="guide">
        <Section>
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--accent)]">
              Your Guide
            </Typography>
            <Typography variant="h2" className="mb-4">
              Step-by-Step{' '}
              <span className="text-gradient">Voting Guide</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Everything you need to know about casting your vote correctly and securely.
            </Typography>
          </div>
          <VotingGuide />
        </Section>
      </motion.div>

      {/* Voter Stats & Map Section */}
      <motion.div {...revealProps} id="stats">
        <Section>
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--secondary)]">
              Insights & Data
            </Typography>
            <Typography variant="h2" className="mb-4">
              Explore the{' '}
              <span className="text-gradient">Election Landscape</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Analyze historical turnout patterns and explore our interactive constituency map.
            </Typography>
          </div>
          <VoterStats />
        </Section>
      </motion.div>

      {/* Find My Constituency Section */}
      <motion.div {...revealProps} id="find-constituency">
        <Section className="bg-[var(--foreground)]/5">
          <FindConstituency />
        </Section>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div {...revealProps}>
        <Section>
          <Newsletter />
        </Section>
      </motion.div>


      {/* Issue Tracking Section */}
      <motion.div {...revealProps} id="issues">
        <Section className="bg-[var(--foreground)]/5">
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--secondary)]">
              Fact-Checked
            </Typography>
            <Typography variant="h2" className="mb-4">
              Issue{' '}
              <span className="text-gradient">Tracking</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Understand complex political issues through simple, fact-checked explanations and multi-perspective breakdowns.
            </Typography>
          </div>
          <IssueTracking />
        </Section>
      </motion.div>

      {/* FAQ Section — Last */}
      <motion.div {...revealProps} id="faq">
        <Section>
          <div className="text-center mb-16">
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--accent)]">
              FAQ
            </Typography>
            <Typography variant="h2" className="mb-4">
              Common{' '}
              <span className="text-gradient">Questions</span>
            </Typography>
            <Typography variant="lead" className="max-w-xl mx-auto">
              Clear answers to help you navigate the voting process with ease.
            </Typography>
          </div>
          <FAQ />
        </Section>
      </motion.div>
    </>
  );
}
