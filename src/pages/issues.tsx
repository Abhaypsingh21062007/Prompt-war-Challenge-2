import SEO from '@/components/SEO';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { IconWrapper } from '@/components/ui/Icon';
import { 
  Briefcase, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  Leaf, 
  Zap,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const ISSUES = [
  {
    id: 1,
    title: "Job Creation & Economy",
    icon: Briefcase,
    color: "primary",
    summary: "Addressing unemployment and boosting GDP through industrial growth and digital economy.",
    partyPositions: [
      { party: "PFP", stance: "Focus on SME sector and tax breaks for startups." },
      { party: "NPA", stance: "Infrastructure-led growth and foreign investment." }
    ]
  },
  {
    id: 2,
    title: "Healthcare Reform",
    icon: HeartPulse,
    color: "secondary",
    summary: "Expanding universal health coverage and improving rural medical infrastructure.",
    partyPositions: [
      { party: "PFP", stance: "Free primary care and increased hospital beds." },
      { party: "JUJ", stance: "Digital health IDs and insurance-led model." }
    ]
  },
  {
    id: 3,
    title: "Education Policy",
    icon: GraduationCap,
    color: "accent",
    summary: "Modernizing curriculum, improving teacher training, and increasing R&D spend.",
    partyPositions: [
      { party: "NPA", stance: "Vocational training and private sector tie-ups." },
      { party: "JUJ", stance: "Subsidized higher education and digital labs." }
    ]
  },
  {
    id: 4,
    title: "National Security",
    icon: ShieldCheck,
    color: "primary",
    summary: "Strengthening border defense and modernizing internal security forces.",
    partyPositions: [
      { party: "NPA", stance: "Modern weaponry and cyber-security focus." },
      { party: "PFP", stance: "Diplomatic strengthening and intelligence reform." }
    ]
  },
  {
    id: 5,
    title: "Climate Action",
    icon: Leaf,
    color: "secondary",
    summary: "Transitioning to renewable energy and strictly enforcing emission standards.",
    partyPositions: [
      { party: "JUJ", stance: "Solar subsidies and afforestation programs." },
      { party: "NPA", stance: "Electric vehicle transition and clean coal." }
    ]
  },
  {
    id: 6,
    title: "Energy Independence",
    icon: Zap,
    color: "accent",
    summary: "Reducing oil imports through domestic production and alternative fuels.",
    partyPositions: [
      { party: "PFP", stance: "Green hydrogen and nuclear energy expansion." },
      { party: "JUJ", stance: "Natural gas infrastructure and bio-fuels." }
    ]
  }
];

export default function Issues() {
  return (
    <>
      <SEO title="Election Issues - Election Guide AI" />
      
      <Section className="pt-32 pb-16">
        <div className="text-center mb-16">
          <Typography variant="h1" className="mb-4">
            Key Election <span className="text-gradient">Issues</span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto">
            Understand the critical topics shaping the nation's future and compare how different parties plan to address them.
          </Typography>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ISSUES.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="p-8 pb-4">
                  <IconWrapper icon={issue.icon} variant={issue.color as any} size="lg" className="mb-4" />
                  <Typography variant="h3">{issue.title}</Typography>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex-grow">
                  <Typography variant="body" className="text-sm text-[var(--foreground)]/60 mb-6">
                    {issue.summary}
                  </Typography>

                  <div className="space-y-4 pt-6 border-t border-[var(--glass-border)]">
                    <Typography variant="caption" className="font-bold text-[var(--primary)] uppercase tracking-wider block mb-2">
                      Party Perspectives
                    </Typography>
                    {issue.partyPositions.map((pos, i) => (
                      <div key={i} className="bg-[var(--foreground)]/5 rounded-xl p-3 border border-[var(--glass-border)]">
                        <span className="text-[10px] font-bold text-[var(--foreground)]/40 block mb-1">{pos.party}</span>
                        <p className="text-xs leading-relaxed">{pos.stance}</p>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 w-full flex items-center justify-between group text-sm font-bold text-[var(--primary)] cursor-pointer">
                    Read Detailed Analysis
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Insight Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MessageSquare size={120} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <Typography variant="h2" className="text-white mb-4">Confused about the data?</Typography>
            <Typography variant="body" className="text-white/80 mb-8">
              Our AI can generate a personalized summary of these issues based on your specific interests and regional concerns.
            </Typography>
            <button className="bg-white text-[var(--primary)] px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-all cursor-pointer">
              Generate AI Summary
            </button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
