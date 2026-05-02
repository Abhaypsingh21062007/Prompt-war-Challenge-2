import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/ui/Typography';
import { IconWrapper } from '@/components/ui/Icon';
import { 
  UserPlus, 
  Search, 
  IdCard, 
  MapPin, 
  Fingerprint, 
  ReceiptText,
  ChevronDown
} from 'lucide-react';

interface VotingStep {
  id: number;
  title: string;
  icon: any;
  summary: string;
  details: string;
  color: 'primary' | 'secondary' | 'accent';
}

const votingSteps: VotingStep[] = [
  {
    id: 1,
    title: 'Register Voter ID',
    icon: UserPlus,
    summary: 'Ensure you are registered to vote in your constituency.',
    details: 'Visit the National Voters\' Service Portal (NVSP) or use the Voter Helpline App to register. You need to be 18 years or older on the qualifying date.',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Check Name in List',
    icon: Search,
    summary: 'Verify your name exists in the current electoral roll.',
    details: 'Search your name on the Electoral Search website using your EPIC number or personal details to find your polling station and serial number.',
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Carry ID Proof',
    icon: IdCard,
    summary: 'Bring your Voter ID or an alternative approved document.',
    details: 'While EPIC (Voter ID) is preferred, you can also carry Aadhaar Card, PAN Card, Driving License, or Passport as valid identity proof.',
    color: 'accent'
  },
  {
    id: 4,
    title: 'Visit Booth',
    icon: MapPin,
    summary: 'Go to your assigned polling station on election day.',
    details: 'Polling usually takes place from 7 AM to 6 PM. Locate your booth in advance to avoid last-minute confusion.',
    color: 'primary'
  },
  {
    id: 5,
    title: 'Vote Privately',
    icon: Fingerprint,
    summary: 'Cast your vote on the EVM in the voting compartment.',
    details: 'The polling officer will ink your finger. Inside the booth, press the blue button next to your chosen candidate\'s name and symbol on the EVM.',
    color: 'secondary'
  },
  {
    id: 6,
    title: 'Verify Slip',
    icon: ReceiptText,
    summary: 'Check the VVPAT slip to confirm your vote.',
    details: 'A slip will appear in the VVPAT window for 7 seconds showing the candidate\'s name and symbol you voted for. Wait for the beep sound.',
    color: 'accent'
  }
];

export default function VotingGuide() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {votingSteps.map((step) => (
        <motion.div
          key={step.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: step.id * 0.1 }}
          className={cn(
            "group relative bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300",
            expandedId === step.id ? "ring-2 ring-[var(--primary)]/50 shadow-2xl" : "hover:shadow-xl hover:-translate-y-1"
          )}
          onClick={() => toggleExpand(step.id)}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <IconWrapper icon={step.icon} variant={step.color} size="md" />
              <motion.div
                animate={{ rotate: expandedId === step.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[var(--foreground)]/40"
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
            
            <Typography variant="h4" className="mb-2">
              {step.title}
            </Typography>
            
            <Typography variant="body" className="text-sm">
              {step.summary}
            </Typography>

            <AnimatePresence>
              {expandedId === step.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-[var(--glass-border)]">
                    <Typography variant="caption" className="text-sm leading-relaxed">
                      {step.details}
                    </Typography>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Step Number Badge */}
          <div className="absolute top-4 right-4 bg-[var(--foreground)]/5 rounded-full w-8 h-8 flex items-center justify-center">
            <Typography variant="caption" className="font-bold">
              {step.id}
            </Typography>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
