import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { IconWrapper } from '@/components/ui/Icon';
import { 
  CheckCircle2, 
  XCircle, 
  UserCircle, 
  Globe2, 
  MapPin,
  AlertCircle
} from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    age: '',
    citizenship: 'indian',
    state: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const eligibilityResult = useMemo(() => {
    const { age, citizenship, state } = formData;
    
    if (!age || !citizenship || !state) return null;

    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return null;

    const isEligibleAge = ageNum >= 18;
    const isIndian = citizenship === 'indian';
    
    return {
      eligible: isEligibleAge && isIndian,
      reasons: [
        !isEligibleAge && "Must be at least 18 years old.",
        !isIndian && "Only Indian citizens are eligible to vote.",
      ].filter(Boolean) as string[]
    };
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-visible" hoverEffect={false}>
      <CardContent className="p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Side */}
          <div className="space-y-6">
            <Typography variant="h3" className="mb-2">Check Your Eligibility</Typography>
            <Typography variant="body" className="text-sm mb-8 text-[var(--foreground)]/60">
              Enter your details to find out if you can register to vote in Indian elections.
            </Typography>

            <div className="space-y-5">
              {/* Age Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <UserCircle size={16} className="text-[var(--primary)]" />
                  Your Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 21"
                  className="w-full bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all"
                  aria-invalid={!!errors.age}
                />
              </div>

              {/* Citizenship Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Globe2 size={16} className="text-[var(--secondary)]" />
                  Citizenship
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, citizenship: 'indian' }))}
                    className={cn(
                      "px-4 py-3 rounded-xl border transition-all text-sm font-medium",
                      formData.citizenship === 'indian' 
                        ? "bg-[var(--primary)] text-white border-transparent" 
                        : "bg-[var(--foreground)]/5 border-[var(--glass-border)] hover:bg-[var(--foreground)]/10"
                    )}
                  >
                    Indian
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, citizenship: 'other' }))}
                    className={cn(
                      "px-4 py-3 rounded-xl border transition-all text-sm font-medium",
                      formData.citizenship === 'other' 
                        ? "bg-[var(--primary)] text-white border-transparent" 
                        : "bg-[var(--foreground)]/5 border-[var(--glass-border)] hover:bg-[var(--foreground)]/10"
                    )}
                  >
                    Other
                  </button>
                </div>
              </div>

              {/* State Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MapPin size={16} className="text-[var(--accent)]" />
                  Residing State/UT
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all appearance-none"
                >
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="relative flex flex-col items-center justify-center min-h-[300px] border-l border-[var(--glass-border)] pl-0 md:pl-12">
            <AnimatePresence mode="wait">
              {!eligibilityResult ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="bg-[var(--foreground)]/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={40} className="text-[var(--foreground)]/20" />
                  </div>
                  <Typography variant="body" className="text-[var(--foreground)]/40 italic">
                    Fill out the form to see your <br /> voting eligibility status.
                  </Typography>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="text-center w-full"
                >
                  <div className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl",
                    eligibilityResult.eligible ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {eligibilityResult.eligible ? <CheckCircle2 size={56} /> : <XCircle size={56} />}
                  </div>

                  <Typography variant="h2" className={cn(
                    "mb-4",
                    eligibilityResult.eligible ? "text-green-600" : "text-red-600"
                  )}>
                    {eligibilityResult.eligible ? "Eligible to Vote!" : "Not Eligible Yet"}
                  </Typography>

                  <div className="space-y-4 mb-8">
                    {eligibilityResult.eligible ? (
                      <Typography variant="body" className="text-[var(--foreground)]/80">
                        You meet all criteria to vote in <strong>{formData.state}</strong>. Ensure you are registered on the electoral roll.
                      </Typography>
                    ) : (
                      <div className="space-y-2">
                        {eligibilityResult.reasons.map((reason, i) => (
                          <div key={i} className="bg-red-500/10 text-red-700 text-sm py-2 px-4 rounded-lg inline-block">
                            {reason}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {eligibilityResult.eligible && (
                    <Button variant="primary" className="w-full">
                      Register Now
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
