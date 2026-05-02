import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        setEmail('');
      }, 800);
    }
  };

  return (
    <Card className="bg-[var(--primary)] text-white overflow-hidden border-none" hoverEffect={false}>
      <CardContent className="p-8 md:p-16 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8 backdrop-blur-md">
              <Mail size={32} />
            </div>
            
            <Typography variant="h2" className="text-white mb-4">
              Stay Informed, Vote Smarter
            </Typography>
            <Typography variant="lead" className="text-white/80 mb-10">
              Join 50,000+ voters getting weekly AI-powered insights on constituency updates and policy changes.
            </Typography>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-md"
                  />
                  <Button 
                    type="submit" 
                    variant="glass" 
                    className="bg-white text-[var(--primary)] hover:bg-white/90 border-none px-8"
                  >
                    Subscribe
                    <Send size={18} className="ml-2" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-4"
                >
                  <div className="bg-green-400 text-[var(--primary)] p-2 rounded-full">
                    <CheckCircle2 size={32} />
                  </div>
                  <Typography variant="h4" className="text-white">
                    You're on the list!
                  </Typography>
                  <Typography variant="body" className="text-white/70">
                    Check your inbox for a welcome guide soon.
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Typography variant="caption" className="text-white/40 mt-8 block">
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
