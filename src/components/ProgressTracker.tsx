import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

const STAGES = [
  { id: 'hero',         name: 'Home' },
  { id: 'timeline',     name: 'Journey' },
  { id: 'map',          name: 'Map' },
  { id: 'constituency', name: 'Pulse' },
  { id: 'guide',        name: 'Guide' },
  { id: 'stats',        name: 'Data' },
  { id: 'issues',       name: 'Issues' },
  { id: 'faq',          name: 'FAQ' },
];

export default function ProgressTracker() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const stageCount = STAGES.length;
      const index = Math.min(Math.floor(latest * stageCount), stageCount - 1);
      setCurrentStage(index);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Main Progress Bar */}
        <motion.div 
          className="w-full h-1 bg-[var(--primary)] origin-left"
          style={{ scaleX }}
        />

        {/* Floating Stage Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pointer-events-auto"
        >
          <div className="bg-[var(--background)]/80 backdrop-blur-md border border-[var(--glass-border)] rounded-full px-4 py-1.5 shadow-lg flex items-center gap-3">
            {STAGES.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={cn(
                  "flex items-center gap-1.5 transition-all duration-300",
                  index === currentStage ? "opacity-100 scale-105" : "opacity-30 scale-95"
                )}>
                  {index < currentStage ? (
                    <CheckCircle2 size={14} className="text-green-500" />
                  ) : (
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold",
                      index === currentStage ? "border-[var(--primary)] text-[var(--primary)]" : "border-[var(--foreground)]/20 text-[var(--foreground)]/40"
                    )}>
                      {index + 1}
                    </div>
                  )}
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest hidden sm:block",
                    index === currentStage ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                  )}>
                    {stage.name}
                  </span>
                </div>
                {index < STAGES.length - 1 && (
                  <ChevronRight size={12} className="mx-2 opacity-10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
