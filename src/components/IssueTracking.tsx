import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { IconWrapper } from '@/components/ui/Icon';
import { BookOpen, Scale, Globe2, Lightbulb } from 'lucide-react';

const IssueTracking = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
      <Card className="p-8 group">
        <CardHeader>
          <IconWrapper icon={BookOpen} variant="secondary" size="lg" />
          <Typography variant="h3" className="mt-6">Topic Breakdowns</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Complex political issues simplified. Our AI breaks down national and local topics into clear, easy-to-understand summaries without the jargon.
          </Typography>
        </CardContent>
      </Card>

      <Card className="p-8">
        <CardHeader>
          <IconWrapper icon={Scale} variant="primary" size="lg" />
          <Typography variant="h3" className="mt-6">Balanced Views</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Get multiple perspectives on every issue. We use cross-verified sources to ensure you see the full picture, not just one side of the story.
          </Typography>
        </CardContent>
      </Card>

      <Card className="p-8 border-t-4 border-t-[var(--accent)]">
        <CardHeader>
          <IconWrapper icon={Globe2} variant="accent" size="lg" />
          <Typography variant="h3" className="mt-6">National Impact</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            Understand how local voting decisions impact national progress in sectors like education, healthcare, and infrastructure.
          </Typography>
        </CardContent>
      </Card>

      <Card className="p-8">
        <CardHeader>
          <IconWrapper icon={Lightbulb} variant="secondary" size="lg" />
          <Typography variant="h3" className="mt-6">Future Outlook</Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="text-lg leading-relaxed text-[var(--foreground)]/70">
            AI-driven projections on how different policy paths might shape the future of your constituency over the next five years.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueTracking;
