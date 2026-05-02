import SEO from '@/components/SEO';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import VotingEssentials from '@/components/VotingEssentials';
import EligibilityChecker from '@/components/EligibilityChecker';
import { motion } from 'framer-motion';

const revealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

export default function VoteKit() {
  return (
    <>
      <SEO title="VoteKit - Your Essential Voting Toolkit" />
      
      <Section className="pt-32 pb-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="caption" className="uppercase tracking-widest mb-4 block text-[var(--primary)] font-bold">
              Digital Voting Toolkit
            </Typography>
            <Typography variant="h1" className="mb-4">
              The <span className="text-gradient">VoteKit</span>
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto">
              Everything you need to navigate the polling station with confidence. From understanding EVMs to checking your eligibility.
            </Typography>
          </motion.div>
        </div>

        {/* Voting Essentials (Flashcards) */}
        <motion.div {...revealProps} id="essentials" className="mb-24">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">Voting <span className="text-gradient">Essentials</span></Typography>
            <Typography variant="body" className="opacity-60 max-w-xl mx-auto">
              Flip the cards below to learn about the critical components of the Indian electoral system.
            </Typography>
          </div>
          <VotingEssentials />
        </motion.div>

        {/* Eligibility Checker */}
        <motion.div {...revealProps} className="mb-24">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">Am I <span className="text-gradient">Eligible?</span></Typography>
            <Typography variant="body" className="opacity-60 max-w-xl mx-auto">
              A quick interactive tool to verify your voting qualifications.
            </Typography>
          </div>
          <EligibilityChecker />
        </motion.div>


      </Section>
    </>
  );
}
