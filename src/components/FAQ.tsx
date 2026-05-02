import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/ui/Typography';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I register to vote?",
    answer: "You can register online through the Voter Helpline App or the National Voters' Service Portal (NVSP). Simply fill out Form 6, upload a photograph, and provide proof of age and residence. Once verified, your name will be added to the electoral roll."
  },
  {
    question: "What should I do if my name is missing from the list?",
    answer: "If your name is missing, you should check the deadline for adding names in your constituency. You can submit Form 6 to the Electoral Registration Officer (ERO) or use the NVSP portal to request inclusion. Always check your name on the list well before election day."
  },
  {
    question: "What is NOTA and how does it work?",
    answer: "NOTA stands for 'None of the Above'. It is an option on the EVM that allows voters to officially register a vote of rejection for all contesting candidates. While NOTA votes are counted, they currently do not affect the outcome of the election; the candidate with the highest votes among candidates still wins."
  },
  {
    question: "How are the election results counted?",
    answer: "Counting happens at designated counting centers under strict security. Postal ballots are counted first, followed by the electronic votes from EVMs. The process is observed by election officials and authorized agents of all candidates to ensure transparency and accuracy."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div 
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen 
                ? "bg-[var(--glass-bg)] border-[var(--primary)] shadow-lg" 
                : "bg-[var(--foreground)]/5 border-[var(--glass-border)] hover:border-[var(--foreground)]/20"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isOpen ? "bg-[var(--primary)] text-white" : "bg-[var(--foreground)]/10 text-[var(--foreground)]/40"
                )}>
                  <HelpCircle size={18} />
                </div>
                <Typography variant="h4" className="text-base sm:text-lg">
                  {faq.question}
                </Typography>
              </div>
              <div className={cn(
                "ml-4 transition-transform duration-300",
                isOpen ? "rotate-0 text-[var(--primary)]" : "rotate-0 text-[var(--foreground)]/40"
              )}>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-12">
                      <Typography variant="body" className="text-[var(--foreground)]/70 leading-relaxed">
                        {faq.answer}
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
