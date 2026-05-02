'use client';

import { useState } from 'react';
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
  ArrowRight,
  X,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

type Issue = typeof ISSUES[number];

async function fetchAIAnalysis(prompt: string): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: prompt }),
  });
  if (!response.ok) throw new Error('Failed to fetch AI analysis');
  const data = await response.json();
  return data.reply || data.response || data.text || 'No response from AI.';
}

export default function Issues() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [analysisText, setAnalysisText] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const openAnalysis = async (issue: Issue) => {
    setSelectedIssue(issue);
    setAnalysisText('');
    setIsLoadingAnalysis(true);
    try {
      const prompt = `You are an expert Indian political analyst. Provide a detailed, balanced, and fact-checked analysis of the following election issue in the context of Indian democracy and current affairs:

Issue: "${issue.title}"
Summary: "${issue.summary}"
Party Positions:
${issue.partyPositions.map(p => `- ${p.party}: ${p.stance}`).join('\n')}

Please provide:
1. **Current State** – What is the situation today in India?
2. **Key Challenges** – What are the main obstacles to progress?
3. **Party Positions Analyzed** – A deeper look at the party stances above.
4. **Expert Consensus** – What do economists/experts generally recommend?
5. **Impact on Citizens** – How does this issue affect the common Indian voter?

Keep your tone neutral, informative, and accessible to a general audience. Format with clear headings using **bold**.`;

      const text = await fetchAIAnalysis(prompt);
      setAnalysisText(text);
    } catch {
      setAnalysisText('❌ Failed to load analysis. Please check your internet connection and try again.');
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const generateSummary = async () => {
    setShowSummary(true);
    setSummaryText('');
    setIsLoadingSummary(true);
    try {
      const prompt = `You are a neutral Indian political analyst. Provide a concise, balanced AI summary of the following 6 key election issues for an Indian voter:

${ISSUES.map((issue, i) => `${i + 1}. ${issue.title}: ${issue.summary}`).join('\n')}

Give a 3-4 sentence overview of the overall election landscape, what voters should focus on, and why these issues matter for India's future. Keep it simple, engaging, and unbiased.`;

      const text = await fetchAIAnalysis(prompt);
      setSummaryText(text);
    } catch {
      setSummaryText('❌ Failed to generate summary. Please try again.');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  // Format markdown-style bold text for display
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p key={i} className={`${line.startsWith('**') || line.match(/^\d\./) ? 'mt-4 mb-1' : 'mb-2'} leading-relaxed`}
          dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    });
  };

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
                <CardContent className="p-8 pt-0 flex-grow flex flex-col">
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

                  {/* ✅ Functional Read Detailed Analysis Button */}
                  <button
                    onClick={() => openAnalysis(issue)}
                    className="mt-8 w-full flex items-center justify-between group text-sm font-bold text-[var(--primary)] cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={14} />
                      Read Detailed Analysis
                    </span>
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
            {/* ✅ Functional Generate AI Summary Button */}
            <button
              onClick={generateSummary}
              disabled={isLoadingSummary}
              className="bg-white text-[var(--primary)] px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-70"
            >
              {isLoadingSummary ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {isLoadingSummary ? 'Generating...' : 'Generate AI Summary'}
            </button>

            {/* Summary Output */}
            <AnimatePresence>
              {showSummary && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-white/10 rounded-2xl p-6 border border-white/20"
                >
                  {isLoadingSummary ? (
                    <div className="flex items-center gap-3 text-white/80">
                      <Loader2 size={20} className="animate-spin" />
                      <span>AI is analyzing all issues...</span>
                    </div>
                  ) : (
                    <div className="text-white/90 text-sm leading-relaxed">{summaryText}</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Section>

      {/* ✅ Analysis Modal */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedIssue(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-2xl bg-[var(--background)] border border-[var(--glass-border)] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-8 pb-6 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-4">
                  <IconWrapper icon={selectedIssue.icon} variant={selectedIssue.color as any} size="md" />
                  <div>
                    <Typography variant="caption" className="text-[var(--primary)] uppercase tracking-widest font-bold block">
                      Detailed Analysis
                    </Typography>
                    <Typography variant="h3">{selectedIssue.title}</Typography>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="p-2 rounded-xl hover:bg-[var(--foreground)]/10 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 max-h-[65vh] overflow-y-auto">
                {isLoadingAnalysis ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                    <div className="text-center">
                      <Typography variant="body" className="font-bold">AI is analyzing this issue...</Typography>
                      <Typography variant="caption" className="opacity-50">Cross-referencing sources and data</Typography>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-sm max-w-none text-[var(--foreground)]/80"
                  >
                    <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20">
                      <Sparkles size={16} className="text-[var(--primary)]" />
                      <span className="text-xs font-bold text-[var(--primary)]">AI-Generated • Powered by Gemini</span>
                    </div>
                    <div className="text-sm leading-relaxed">
                      {formatText(analysisText)}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 pt-4 border-t border-[var(--glass-border)] flex justify-between items-center">
                <span className="text-xs opacity-40">Analysis generated by Gemini AI</span>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="px-6 py-2 rounded-xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] text-sm font-bold hover:bg-[var(--foreground)]/10 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
