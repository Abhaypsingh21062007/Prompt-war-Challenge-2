import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { IconWrapper } from '@/components/ui/Icon';
import { Search, Users, BarChart3, ShieldCheck } from 'lucide-react';

const CandidateAnalysis = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
      <Card className="p-8">
        <CardHeader>
          <IconWrapper icon={Search} variant="primary" size="lg" />
          <Typography variant="h3" className="mt-6">Deep Search</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Our AI engine aggregates data from official filings, voting records, and public statements to give you a 360-degree view of every candidate in your constituency.
          </Typography>
        </CardContent>
      </Card>

      <Card className="p-8 border-t-4 border-t-[var(--secondary)]">
        <CardHeader>
          <IconWrapper icon={Users} variant="secondary" size="lg" />
          <Typography variant="h3" className="mt-6">Community Pulse</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Understand how candidates align with local community needs through verified sentiment analysis and policy impact projections.
          </Typography>
        </CardContent>
      </Card>

      <Card className="p-8 border-t-4 border-t-[var(--accent)]">
        <CardHeader>
          <IconWrapper icon={BarChart3} variant="accent" size="lg" />
          <Typography variant="h3" className="mt-6">Policy Scorecard</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Compare candidate promises against historical data and feasibility metrics to see who truly delivers on their word.
          </Typography>
        </CardContent>
      </Card>

      <Card className="p-8">
        <CardHeader>
          <IconWrapper icon={ShieldCheck} variant="primary" size="lg" />
          <Typography variant="h3" className="mt-6">Verified Records</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Access criminal records, educational backgrounds, and asset declarations in a simplified, easy-to-read format.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateAnalysis;
