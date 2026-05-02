import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import {
  Megaphone,
  FileText,
  Users,
  Vote,
  BarChart3,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

/* ─── Timeline Stage Data ─── */
interface TimelineStage {
  id: number;
  title: string;
  icon: LucideIcon;
  date: string;
  description: string;
  details: string[];
  color: string;       // Tailwind-compatible color for active state
  bgColor: string;     // Background for icon wrapper
  glowColor: string;   // Glow shadow color
}

const stages: TimelineStage[] = [
  {
    id: 1,
    title: 'Announcement',
    icon: Megaphone,
    date: 'Day 1',
    description: 'Election Commission officially announces the upcoming elections and key dates.',
    details: [
      'Schedule published by Election Commission',
      'Model Code of Conduct comes into effect',
      'Constituencies & seat allocation finalized',
    ],
    color: '#3b82f6',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 2,
    title: 'Nominations',
    icon: FileText,
    date: 'Week 1–2',
    description: 'Candidates file their nomination papers and undergo scrutiny.',
    details: [
      'Filing of nomination papers',
      'Scrutiny of nominations',
      'Withdrawal of candidatures',
      'Final list of contesting candidates',
    ],
    color: '#FF9933',
    bgColor: 'bg-orange-100 dark:bg-orange-900/40',
    glowColor: 'rgba(255, 153, 51, 0.4)',
  },
  {
    id: 3,
    title: 'Campaigning',
    icon: Users,
    date: 'Week 2–5',
    description: 'Candidates and parties engage in rallies, debates, and public outreach.',
    details: [
      'Public rallies and road shows',
      'TV debates and interviews',
      'Manifesto releases',
      'Campaign ends 48 hrs before voting',
    ],
    color: '#8b5cf6',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    glowColor: 'rgba(139, 92, 246, 0.4)',
  },
  {
    id: 4,
    title: 'Voting Day',
    icon: Vote,
    date: 'Election Day',
    description: 'Citizens exercise their right to vote at designated polling booths.',
    details: [
      'Polling stations open for voters',
      'Electronic Voting Machines (EVMs) used',
      'VVPAT verification available',
      'Voter turnout tracked in real-time',
    ],
    color: '#138808',
    bgColor: 'bg-green-100 dark:bg-green-900/40',
    glowColor: 'rgba(19, 136, 8, 0.4)',
  },
  {
    id: 5,
    title: 'Counting',
    icon: BarChart3,
    date: 'Count Day',
    description: 'Votes are counted under strict supervision and results start emerging.',
    details: [
      'Postal ballots counted first',
      'EVM results tabulated round-wise',
      'Trends available on live dashboards',
      'Candidates and agents observe',
    ],
    color: '#ef4444',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    glowColor: 'rgba(239, 68, 68, 0.4)',
  },
  {
    id: 6,
    title: 'Results',
    icon: Trophy,
    date: 'Final Day',
    description: 'Winners are declared and the new government formation begins.',
    details: [
      'Winning candidates officially declared',
      'Certificates of election issued',
      'Government formation process begins',
      'Swearing-in ceremony scheduled',
    ],
    color: '#eab308',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/40',
    glowColor: 'rgba(234, 179, 8, 0.4)',
  },
];

/* ─── Detail Panel (shown when a stage is selected) ─── */
function DetailPanel({ stage }: { stage: TimelineStage }) {
  const Icon = stage.icon;

  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 shadow-lg"
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className={cn('flex items-center justify-center w-14 h-14 rounded-2xl shrink-0', stage.bgColor)}
        >
          <Icon size={28} style={{ color: stage.color }} />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">{stage.title}</h3>
          <span className="text-sm font-medium" style={{ color: stage.color }}>
            {stage.date}
          </span>
        </div>
      </div>

      <p className="text-[var(--foreground)]/80 mb-5 leading-relaxed">
        {stage.description}
      </p>

      <ul className="space-y-3">
        {stage.details.map((detail, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 text-sm text-[var(--foreground)]/70"
          >
            <span
              className="mt-1.5 w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: stage.color }}
            />
            {detail}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Main Timeline Component ─── */
export default function ElectionTimeline() {
  const [activeId, setActiveId] = useState(1);
  const activeStage = stages.find((s) => s.id === activeId)!;

  return (
    <div className="w-full">
      {/* ── DESKTOP: Horizontal Timeline (hidden on mobile) ── */}
      <div className="hidden md:block mb-10">
        <div className="relative flex items-center justify-between">
          {/* Background track line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-[var(--glass-border)] rounded-full" />

          {/* Animated progress fill */}
          <motion.div
            className="absolute top-6 left-0 h-1 rounded-full"
            style={{ backgroundColor: activeStage.color }}
            initial={false}
            animate={{
              width: `${((activeId - 1) / (stages.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Stage nodes */}
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeId;
            const isPast = stage.id < activeId;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveId(stage.id)}
                className="relative z-10 flex flex-col items-center group cursor-pointer bg-transparent border-none outline-none"
                aria-label={`View ${stage.title} stage`}
              >
                {/* Node circle */}
                <motion.div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors',
                    isActive
                      ? 'border-transparent text-white'
                      : isPast
                        ? 'border-transparent text-white'
                        : 'border-[var(--glass-border)] bg-[var(--background)] text-[var(--foreground)]/40'
                  )}
                  style={{
                    backgroundColor: isActive || isPast ? stage.color : undefined,
                    boxShadow: isActive ? `0 0 20px ${stage.glowColor}` : 'none',
                  }}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon size={20} />
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    'mt-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'font-bold'
                      : 'text-[var(--foreground)]/50 group-hover:text-[var(--foreground)]/80'
                  )}
                  style={{ color: isActive ? stage.color : undefined }}
                >
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE: Vertical Timeline (hidden on desktop) ── */}
      <div className="md:hidden mb-8">
        <div className="relative pl-8">
          {/* Vertical track line */}
          <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-[var(--glass-border)]" />

          {/* Animated progress fill */}
          <motion.div
            className="absolute top-0 left-[15px] w-0.5 rounded-full"
            style={{ backgroundColor: activeStage.color }}
            initial={false}
            animate={{
              height: `${((activeId - 1) / (stages.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Stage nodes */}
          <div className="space-y-6">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = stage.id === activeId;
              const isPast = stage.id < activeId;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveId(stage.id)}
                  className="relative flex items-center gap-4 w-full text-left bg-transparent border-none outline-none cursor-pointer group"
                  aria-label={`View ${stage.title} stage`}
                >
                  {/* Node dot */}
                  <motion.div
                    className={cn(
                      'absolute -left-8 w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0',
                      isActive
                        ? 'border-transparent text-white'
                        : isPast
                          ? 'border-transparent text-white'
                          : 'border-[var(--glass-border)] bg-[var(--background)] text-[var(--foreground)]/40'
                    )}
                    style={{
                      backgroundColor: isActive || isPast ? stage.color : undefined,
                      boxShadow: isActive ? `0 0 14px ${stage.glowColor}` : 'none',
                    }}
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Icon size={14} />
                  </motion.div>

                  {/* Label */}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors',
                        isActive
                          ? 'font-bold'
                          : 'text-[var(--foreground)]/50 group-hover:text-[var(--foreground)]/80'
                      )}
                      style={{ color: isActive ? stage.color : undefined }}
                    >
                      {stage.title}
                    </span>
                    <span className="text-xs text-[var(--foreground)]/40">
                      {stage.date}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <AnimatePresence mode="wait">
        <DetailPanel stage={activeStage} />
      </AnimatePresence>
    </div>
  );
}
