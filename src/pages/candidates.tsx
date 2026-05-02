import SEO from '@/components/SEO';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { IconWrapper } from '@/components/ui/Icon';
import { Search, Filter, User, MapPin, Award, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const CANDIDATES = [
  {
    id: 1,
    name: "Dr. Aradhana Sharma",
    party: "People's First Party",
    region: "South Delhi",
    education: "PhD in Public Policy",
    experience: "15 Years",
    criminalCases: 0,
    assets: "₹4.2 Crores",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    party: "National Progress Alliance",
    region: "South Delhi",
    education: "MBA, Harvard",
    experience: "8 Years",
    criminalCases: 1,
    assets: "₹12.8 Crores",
    color: "bg-orange-500"
  },
  {
    id: 3,
    name: "Sanjay Deshmukh",
    party: "Justice & Unity Front",
    region: "South Delhi",
    education: "Law Graduate",
    experience: "22 Years",
    criminalCases: 0,
    assets: "₹1.5 Crores",
    color: "bg-green-500"
  },
  {
    id: 4,
    name: "Priya Venkatesh",
    party: "Independent",
    region: "South Delhi",
    education: "Social Work",
    experience: "10 Years",
    criminalCases: 0,
    assets: "₹85 Lakhs",
    color: "bg-purple-500"
  }
];

export default function Candidates() {
  return (
    <>
      <SEO title="Candidates - Election Guide AI" />
      
      <Section className="pt-32 pb-16">
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            Candidate <span className="text-gradient">Profiles</span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto">
            Deep dive into the backgrounds, records, and policies of contesting candidates in your constituency.
          </Typography>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, party or region..."
              className="w-full bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] hover:bg-[var(--foreground)]/10 transition-all font-bold cursor-pointer">
            <Filter size={20} /> Filters
          </button>
        </div>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {CANDIDATES.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group hover:ring-2 hover:ring-[var(--primary)]/30 transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Avatar Placeholder */}
                    <div className={cn("w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg", candidate.color)}>
                      <User size={48} />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Typography variant="h3">{candidate.name}</Typography>
                          <Typography variant="caption" className="text-[var(--primary)] font-bold uppercase tracking-wider">
                            {candidate.party}
                          </Typography>
                        </div>
                        <div className="bg-green-500/10 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full border border-green-500/20">
                          VERIFIED AFFIDAVIT
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                          <MapPin size={14} /> {candidate.region}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                          <Award size={14} /> {candidate.experience} Exp.
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                          <ShieldAlert size={14} className={candidate.criminalCases > 0 ? "text-red-500" : "text-green-500"} /> 
                          {candidate.criminalCases} Criminal Cases
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                          <Typography variant="caption" className="font-bold">Assets: {candidate.assets}</Typography>
                        </div>
                      </div>

                      <div className="mt-8 flex gap-3">
                        <button className="flex-grow py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:bg-[var(--primary)]/90 transition-all cursor-pointer">
                          View Full Profile
                        </button>
                        <button className="px-4 py-3 rounded-xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] text-sm font-bold hover:bg-[var(--foreground)]/10 transition-all cursor-pointer">
                          Compare
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}

import { cn } from '@/utils/cn';
