import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { INDIA_STATES_DATA, StateData } from '@/data/indiaStates';
import { 
  Calendar, 
  MapPin, 
  Info, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Zap,
  MousePointer2
} from 'lucide-react';

/* ─── Simplified India Map Paths ─── */
/* Each path is identified by the state code matching our data */
const STATE_PATHS = [
  { id: "JK", name: "Jammu & Kashmir", d: "M 85 10 L 105 10 L 115 35 L 85 55 Z" },
  { id: "HP", name: "Himachal Pradesh", d: "M 95 55 L 115 55 L 125 75 L 95 75 Z" },
  { id: "PB", name: "Punjab", d: "M 75 65 L 95 65 L 95 95 L 75 95 Z" },
  { id: "HR", name: "Haryana", d: "M 95 85 L 115 85 L 115 105 L 95 105 Z" },
  { id: "RJ", name: "Rajasthan", d: "M 35 90 L 75 90 L 85 140 L 35 150 Z" },
  { id: "GJ", name: "Gujarat", d: "M 15 155 L 55 155 L 45 205 L 15 195 Z" },
  { id: "MH", name: "Maharashtra", d: "M 45 205 L 105 195 L 115 255 L 55 265 Z" },
  { id: "KA", name: "Karnataka", d: "M 65 265 L 95 265 L 95 335 L 65 335 Z" },
  { id: "KL", name: "Kerala", d: "M 75 335 L 85 335 L 85 385 L 75 385 Z" },
  { id: "TN", name: "Tamil Nadu", d: "M 85 335 L 115 335 L 105 395 L 85 395 Z" },
  { id: "AP", name: "Andhra Pradesh", d: "M 105 255 L 135 255 L 135 335 L 95 335 Z" },
  { id: "TG", name: "Telangana", d: "M 95 235 L 125 235 L 125 275 L 95 275 Z" },
  { id: "OR", name: "Odisha", d: "M 135 205 L 175 195 L 175 255 L 135 255 Z" },
  { id: "WB", name: "West Bengal", d: "M 175 165 L 205 165 L 195 225 L 175 225 Z" },
  { id: "BR", name: "Bihar", d: "M 165 115 L 205 115 L 205 155 L 165 155 Z" },
  { id: "UP", name: "Uttar Pradesh", d: "M 115 95 L 165 95 L 165 155 L 115 155 Z" },
  { id: "MP", name: "Madhya Pradesh", d: "M 85 145 L 145 145 L 145 205 L 85 205 Z" },
  { id: "CT", name: "Chhattisgarh", d: "M 125 185 L 155 185 L 155 245 L 125 245 Z" },
  { id: "JH", name: "Jharkhand", d: "M 155 155 L 185 155 L 185 195 L 155 195 Z" },
  { id: "AS", name: "Assam", d: "M 225 105 L 265 105 L 265 135 L 225 135 Z" },
  { id: "AR", name: "Arunachal Pradesh", d: "M 245 75 L 285 75 L 285 105 L 245 105 Z" },
  { id: "SK", name: "Sikkim", d: "M 210 105 L 220 105 L 220 115 L 210 115 Z" },
  { id: "UK", name: "Uttarakhand", d: "M 115 75 L 135 75 L 145 95 L 115 95 Z" },
  { id: "DL", name: "Delhi", d: "M 110 100 L 115 100 L 115 105 L 110 105 Z" },
  { id: "LA", name: "Ladakh", d: "M 105 5 L 135 5 L 135 35 L 105 35 Z" }
];

/* ─── State Details Panel Component ─── */
function StateDetails({ state }: { state: StateData }) {
  const statusColors = {
    upcoming: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    ongoing: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    completed: 'text-green-500 bg-green-500/10 border-green-500/20'
  };

  const statusIcons = {
    upcoming: Clock,
    ongoing: Zap,
    completed: CheckCircle2
  };

  const StatusIcon = statusIcons[state.status];

  return (
    <motion.div
      key={state.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center shadow-lg">
          <MapPin size={28} />
        </div>
        <div>
          <Typography variant="h2" className="text-2xl">{state.name}</Typography>
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mt-2",
            statusColors[state.status]
          )}>
            <StatusIcon size={12} />
            {state.status}
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)]">
            <Typography variant="caption" className="text-[var(--foreground)]/40 block mb-1 uppercase tracking-tighter">Election Phase</Typography>
            <Typography variant="h4" className="text-lg">{state.phase}</Typography>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)]">
            <Typography variant="caption" className="text-[var(--foreground)]/40 block mb-1 uppercase tracking-tighter">Voting Date</Typography>
            <Typography variant="h4" className="text-lg flex items-center gap-2">
              <Calendar size={16} className="text-[var(--primary)]" />
              {state.date.split(',')[0]}
            </Typography>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 border border-[var(--glass-border)]">
          <div className="flex items-start gap-3 mb-4">
            <Info size={18} className="text-[var(--primary)] shrink-0 mt-1" />
            <Typography variant="body" className="text-sm">
              Polling is scheduled to take place at over <strong>12,000</strong> stations across this state.
            </Typography>
          </div>
          <Link href="/candidates">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:bg-[var(--primary)]/90 transition-all cursor-pointer">
              View Local Candidates <ChevronRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--glass-border)] text-center">
        <Typography variant="caption" className="text-[var(--foreground)]/30">
          Source: Election Commission of India Official Schedule
        </Typography>
      </div>
    </motion.div>
  );
}

/* ─── Main IndiaMap Component ─── */
export default function IndiaMap() {
  const [selectedId, setSelectedId] = useState<string>("RJ");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedState = useMemo(() => INDIA_STATES_DATA[selectedId], [selectedId]);
  const hoveredState = useMemo(() => (hoveredId ? INDIA_STATES_DATA[hoveredId] : null), [hoveredId]);

  const getColor = (id: string, isHovered: boolean, isSelected: boolean) => {
    const data = INDIA_STATES_DATA[id];
    if (!data) return "var(--glass-border)";

    if (isSelected) return "var(--primary)";
    
    switch (data.status) {
      case 'ongoing': return isHovered ? "#FF9933" : "#FF993388";
      case 'completed': return isHovered ? "#138808" : "#13880888";
      case 'upcoming': return isHovered ? "var(--primary)" : "var(--primary-light, #00008044)";
      default: return "var(--glass-border)";
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Map Container */}
        <div className="lg:col-span-7 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-8 left-8">
            <Typography variant="caption" className="uppercase tracking-widest text-[var(--foreground)]/40 font-bold flex items-center gap-2 mb-2">
              <MousePointer2 size={14} /> Interactive Map
            </Typography>
            <Typography variant="h3">Click a State</Typography>
          </div>

          <div className="w-full h-full min-h-[400px] flex items-center justify-center py-12">
            <svg 
              viewBox="0 0 300 400" 
              className="w-full h-full max-h-[500px] drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.1))" }}
            >
              <g className="cursor-pointer">
                {STATE_PATHS.map((path) => {
                  const isSelected = selectedId === path.id;
                  const isHovered = hoveredId === path.id;
                  const data = INDIA_STATES_DATA[path.id];

                  return (
                    <motion.path
                      key={path.id}
                      d={path.d}
                      fill={getColor(path.id, isHovered, isSelected)}
                      stroke="white"
                      strokeWidth={isSelected ? 1.5 : 0.5}
                      initial={false}
                      animate={{
                        scale: isSelected ? 1.05 : 1,
                        opacity: hoveredId && !isHovered && !isSelected ? 0.6 : 1,
                      }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedId(path.id)}
                      onMouseEnter={() => setHoveredId(path.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="transition-all duration-300"
                    >
                      {data?.status === 'ongoing' && (
                        <animate 
                          attributeName="opacity" 
                          values="1;0.7;1" 
                          dur="2s" 
                          repeatCount="indefinite" 
                        />
                      )}
                    </motion.path>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Map Legend */}
          <div className="w-full pt-8 border-t border-[var(--glass-border)] flex flex-wrap justify-center gap-6">
            {[
              { label: 'Upcoming', color: 'bg-[var(--primary)]', icon: Clock },
              { label: 'Ongoing', color: 'bg-orange-500', icon: Zap, pulse: true },
              { label: 'Completed', color: 'bg-green-500', icon: CheckCircle2 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full", 
                  item.color,
                  item.pulse && "animate-pulse"
                )} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)]/60">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-xl text-xs font-bold pointer-events-none shadow-xl flex items-center gap-2"
              >
                {INDIA_STATES_DATA[hoveredId]?.name || hoveredId}
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  INDIA_STATES_DATA[hoveredId]?.status === 'completed' ? "bg-green-500" :
                  INDIA_STATES_DATA[hoveredId]?.status === 'ongoing' ? "bg-orange-500" : "bg-[var(--primary)]"
                )} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <StateDetails state={selectedState} />
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
