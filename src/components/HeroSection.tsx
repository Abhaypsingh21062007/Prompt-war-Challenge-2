import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Sparkles, MessageCircle, Bot } from 'lucide-react';
import Link from 'next/link';

/**
 * Floating animated shape for the hero background.
 */
function FloatingShape({
  className,
  delay = 0,
  duration = 6,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * Animated particle dot for subtle background texture.
 */
function ParticleDot({
  size,
  top,
  left,
  delay,
  color,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
      }}
      animate={{
        opacity: [0.2, 0.7, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* Stagger animation for child elements */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* ─── Animated Background Layer ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large gradient orbs */}
        <FloatingShape
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style-bg="radial-gradient(circle, #FF993355 0%, transparent 70%)"
          delay={0}
          duration={7}
        />
        <FloatingShape
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-25 blur-3xl"
          delay={1}
          duration={8}
        />
        <FloatingShape
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
          delay={2}
          duration={6}
        />

        {/* Gradient orb colors via inline styles (CSS vars don't animate well) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl bg-[#FF993355]" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-25 blur-3xl bg-[#00008044]" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl bg-[#13880844]" />

        {/* Subtle particle dots */}
        <ParticleDot size={4} top="15%" left="10%" delay={0} color="#FF9933" />
        <ParticleDot size={6} top="25%" left="85%" delay={0.5} color="#000080" />
        <ParticleDot size={3} top="60%" left="20%" delay={1} color="#138808" />
        <ParticleDot size={5} top="70%" left="75%" delay={1.5} color="#FF9933" />
        <ParticleDot size={4} top="40%" left="50%" delay={2} color="#000080" />
        <ParticleDot size={3} top="80%" left="40%" delay={0.8} color="#138808" />
        <ParticleDot size={5} top="10%" left="60%" delay={1.2} color="#FF9933" />
        <ParticleDot size={4} top="50%" left="90%" delay={0.3} color="#000080" />
      </div>

      {/* ─── Hero Content ─── */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-sm">
            <Sparkles className="w-4 h-4 text-[var(--secondary)]" />
            <span>AI-Powered Election Insights</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants}>
          <Typography variant="h1" className="mb-6 leading-tight">
            Understand Elections{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">in Minutes</span>
          </Typography>
        </motion.div>

        {/* Subtext */}
        <motion.div variants={itemVariants}>
          <Typography variant="lead" className="max-w-2xl mx-auto mb-12 leading-relaxed">
            Your personal AI guide to navigating democracy — get instant, unbiased
            breakdowns of candidates, policies, and voting procedures tailored to
            your constituency. Make confident, informed decisions.
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            size="lg"
            variant="primary"
            className="group"
            onClick={() => {
              const el = document.getElementById('timeline');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <Sparkles className="mr-2 w-5 h-5 transition-transform group-hover:rotate-12" />
            Start Guide
          </Button>
          <Link href="/votekit">
            <Button size="lg" variant="glass" className="group">
              <MessageCircle className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
              Explore VoteKit
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="glass" 
            className="group"
            onClick={() => window.dispatchEvent(new CustomEvent('open-votebuddy'))}
          >
            <Bot className="mr-2 w-5 h-5 transition-transform group-hover:rotate-12" />
            Ask Assistant
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm"
        >
          {[
            { label: 'Unbiased Analysis', emoji: '🎯' },
            { label: 'Fact-Checked', emoji: '✅' },
            { label: 'Real-Time Data', emoji: '⚡' },
          ].map(({ label, emoji }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[var(--foreground)]/60"
            >
              <span className="text-lg">{emoji}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── Bottom fade into next section ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
}
