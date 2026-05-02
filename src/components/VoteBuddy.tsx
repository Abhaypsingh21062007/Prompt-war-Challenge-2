import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/ui/Typography';

/* ─── Predefined Q&A Knowledge Base ─── */
const KNOWLEDGE_BASE: { [key: string]: string } = {
  "how to register": "You can register online through the National Voters' Service Portal (NVSP) at nvsp.in or by using the Voter Helpline App. Fill out Form 6 and provide a photo, age proof, and residence proof.",
  "am i eligible": "In India, you are eligible to vote if you are an Indian citizen, at least 18 years old on the qualifying date, and not disqualified by any law. Use our 'Eligibility Checker' on the VoteKit page to verify!",
  "what documents": "The Voter ID (EPIC) is the primary document. If you don't have it, you can carry Aadhaar Card, PAN Card, Passport, or Driving License to the polling station.",
  "what is nota": "NOTA (None of the Above) is a button on the EVM that lets you officially reject all candidates. It was introduced in 2013 following a Supreme Court order. If NOTA gets the most votes, a re-election is NOT held.",
  "how to check my name": "Visit electoralsearch.in or the Voter Helpline App. Search by your EPIC number or by entering your name, state, and constituency.",
  "what is evm": "An EVM (Electronic Voting Machine) is a portable electronic device used to record votes. It has a Control Unit for the polling officer and a Balloting Unit for the voter. Results are stored in a memory chip.",
  "what is vvpat": "VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to the EVM that prints a paper slip showing the symbol and name of the candidate you voted for. The slip is visible for 7 seconds before dropping into a sealed box.",
  "indelible ink": "Indelible ink (also called election ink) is applied on the left index finger to prevent people from voting more than once. It is made from Silver Nitrate and stays visible for several weeks.",
  "voter id": "The EPIC (Electors Photo Identity Card) or Voter ID is issued free of cost by the Election Commission of India. You can apply online at nvsp.in or through your local BLO (Booth Level Officer).",
  "polling booth": "Your polling booth is assigned based on your registered address. You can find it by searching on electoralsearch.in using your name or EPIC number.",
  "election commission": "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering Union and State election processes. Visit eci.gov.in for official information.",
  "postal ballot": "Postal ballots allow certain voters (service voters, senior citizens 85+, disabled persons, essential service workers) to vote by post without visiting the polling booth.",
  "mcc": "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for political parties and candidates during elections. It comes into effect from the date of election announcement until results.",
  "how to vote": "On election day: 1) Carry your Voter ID or valid alternative ID. 2) Go to your assigned polling booth. 3) The officer will verify your details and mark your finger with ink. 4) Press the button next to your chosen candidate on the EVM. 5) Check the VVPAT slip for confirmation.",
  "hello": "Hi there! 👋 I'm VoteBuddy AI. I'm here to help you with all your voting and election questions. What would you like to know?",
  "hi": "Hello! How can I help you with your voting questions today? You can ask me about registration, eligibility, EVMs, or how to vote! 🗳️",
  "thanks": "You're very welcome! Remember, every vote counts. Happy voting! 🇮🇳",
  "thank you": "You're welcome! Feel free to ask if you have more questions about the election process.",
  "helpline": "The Voter Helpline number is 1950. You can also use the Voter Helpline App or visit voterportal.eci.gov.in for assistance.",
  "form 6": "Form 6 is used to register as a new voter or to shift your voter registration to a new constituency. You can fill it online at nvsp.in or at your nearest Electoral Registration Officer.",
};



interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function VoteBuddy() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom event to open the chat from other components
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-votebuddy', handleOpen);
    return () => window.removeEventListener('open-votebuddy', handleOpen);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hello! I'm VoteBuddy AI. How can I help you with your election-related questions today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // ── 1. Check Knowledge Base first (instant, no API call needed) ──
    const lowerText = text.toLowerCase().trim();
    const kbMatch = Object.keys(KNOWLEDGE_BASE).find(key => lowerText.includes(key));

    if (kbMatch) {
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: KNOWLEDGE_BASE[kbMatch],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 600); // small delay to feel natural
      return;
    }

    // ── 2. Fall back to Gemini API for unknown questions ──
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          context: "The user is asking about Indian elections, candidates, or voting procedures."
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: "I'm getting a lot of questions right now! Please wait a moment and try again, or try asking about voter registration, eligibility, documents, or NOTA — I can answer those instantly! 🙏",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        return;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.text || "I couldn't find an answer. Please try rephrasing your question or ask about voter registration, eligibility, or required documents.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error calling AI API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: "Connection issue. Try asking: 'How do I register?', 'Am I eligible?', 'What documents do I need?' — I can answer those right away! 🗳️",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] bg-[var(--background)] border border-[var(--glass-border)] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--primary)] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <Typography variant="h4" className="text-white text-base">VoteBuddy AI</Typography>
                  <span className="flex items-center gap-1.5 text-[10px] opacity-80 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online Assistant
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-3.5 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-[var(--primary)] text-white rounded-tr-none" 
                      : "bg-[var(--foreground)]/5 text-[var(--foreground)]/80 rounded-tl-none border border-[var(--glass-border)]"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-[var(--foreground)]/30 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="bg-[var(--foreground)]/5 border border-[var(--glass-border)] p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-[var(--foreground)]/30 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Try Sample Questions */}
            {!isTyping && (
              <div className="px-4 pb-3 pt-2 bg-[var(--foreground)]/5 border-t border-[var(--glass-border)]">
                <Typography variant="body" className="text-[10px] uppercase font-bold tracking-wider mb-2 text-[var(--foreground)]/50">
                  Try Sample Questions
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What is NOTA?",
                    "What documents do I need to vote?",
                    "How to register as a voter?",
                    "Am I eligible to vote in India?"
                  ].map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSendMessage(question)}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--glass-border)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer shadow-sm text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="p-4 border-t border-[var(--glass-border)] flex gap-2"
            >
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all"
              />
              <button 
                type="submit"
                className="w-12 h-12 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center hover:bg-[var(--primary)]/90 transition-all cursor-pointer"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Button ─── */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all cursor-pointer",
          isOpen ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--primary)] text-white"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <MessageCircle size={32} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--primary)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
