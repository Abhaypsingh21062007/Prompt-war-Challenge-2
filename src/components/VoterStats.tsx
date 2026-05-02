import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  Users, 
  TrendingUp, 
  Map as MapIcon, 
  ShieldCheck,
  ChevronRight,
  MousePointer2
} from 'lucide-react';

/* ─── Voter Turnout Data ─── */
const turnoutData = [
  { year: '2004', percentage: 58.07, color: 'bg-blue-400' },
  { year: '2009', percentage: 58.19, color: 'bg-purple-400' },
  { year: '2014', percentage: 66.44, color: 'bg-orange-400' },
  { year: '2019', percentage: 67.40, color: 'bg-green-500' },
  { year: '2024', percentage: 70.20, color: 'bg-[var(--primary)]', projected: true },
];

export default function VoterStats() {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Turnout Infographic */}
        <Card className="h-full">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Typography variant="h3">Voter Turnout</Typography>
                <Typography variant="caption" className="text-[var(--foreground)]/50">
                  Historical general election data
                </Typography>
              </div>
              <TrendingUp className="text-[var(--primary)]" size={32} />
            </div>

            <div className="space-y-6">
              {turnoutData.map((data, index) => (
                <div key={data.year} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{data.year} {data.projected && "(Projected)"}</span>
                    <span className={data.projected ? "text-[var(--primary)]" : ""}>{data.percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-[var(--foreground)]/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={cn("h-full rounded-full", data.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-[var(--glass-border)] flex items-center gap-4 text-xs text-[var(--foreground)]/40">
              <ShieldCheck size={16} />
              Data verified by Election Guide AI Research Team
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map Placeholder */}
        <Card className="h-full relative overflow-hidden group">
          <CardContent className="p-0 h-full min-h-[400px] flex flex-col">
            <div className="p-8 pb-4">
              <Typography variant="h3">Live Constituency Map</Typography>
              <Typography variant="caption" className="text-[var(--foreground)]/50">
                Explore voting centers and real-time updates
              </Typography>
            </div>
            
            <div className="flex-grow relative bg-[var(--foreground)]/5 flex items-center justify-center p-12">
              {/* Simplified India Map Placeholder SVG */}
              <motion.svg 
                viewBox="0 0 200 240" 
                className="w-full h-full max-h-[300px] text-[var(--foreground)]/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <path 
                  fill="currentColor" 
                  d="M100 10 L120 30 L150 40 L160 80 L180 100 L170 140 L140 180 L110 220 L80 230 L50 200 L30 160 L20 120 L40 80 L60 40 L80 20 Z" 
                />
                <motion.circle 
                  cx="100" cy="120" r="4" fill="var(--primary)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.circle 
                  cx="70" cy="80" r="3" fill="var(--secondary)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                />
                <motion.circle 
                  cx="130" cy="160" r="3" fill="var(--accent)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                />
              </motion.svg>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-[var(--background)]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mb-4 shadow-xl">
                  <MapIcon size={32} />
                </div>
                <Typography variant="h4" className="mb-2">Interactive Map Locked</Typography>
                <Typography variant="body" className="text-sm mb-6 max-w-xs">
                  The high-resolution constituency map is available for registered users in your region.
                </Typography>
                <Button size="sm" variant="primary">
                  Unlock Map <MousePointer2 size={14} className="ml-2" />
                </Button>
              </div>

              {/* Decorative Scan Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-[var(--primary)]/20 shadow-[0_0_15px_var(--primary)] pointer-events-none"
              />
            </div>

            <div className="p-4 bg-[var(--foreground)]/5 border-t border-[var(--glass-border)] flex justify-between items-center px-8">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--foreground)]/40">543 Constituencies Tracked</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/20" />)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { cn } from '@/utils/cn';
