import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { IconWrapper } from '@/components/ui/Icon';
import { 
  IdCard, 
  Fingerprint, 
  Book, 
  CreditCard, 
  Car,
  AlertCircle
} from 'lucide-react';

interface DocumentInfo {
  id: number;
  name: string;
  icon: any;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}

const documents: DocumentInfo[] = [
  {
    id: 1,
    name: 'Voter ID (EPIC)',
    icon: IdCard,
    description: 'The primary document for voting. If your name is on the electoral roll, you can use this to verify your identity.',
    color: 'primary'
  },
  {
    id: 2,
    name: 'Aadhaar Card',
    icon: Fingerprint,
    description: 'Universally accepted identification. A valid alternative if you don\'t have your physical Voter ID card with you.',
    color: 'secondary'
  },
  {
    id: 3,
    name: 'Indian Passport',
    icon: Book,
    description: 'An excellent alternative for identity and address proof. Especially useful for NRI voters registered in the list.',
    color: 'accent'
  },
  {
    id: 4,
    name: 'PAN Card',
    icon: CreditCard,
    description: 'Permanent Account Number card issued by the Income Tax Department is a valid photo identity document.',
    color: 'primary'
  },
  {
    id: 5,
    name: 'Driving License',
    icon: Car,
    description: 'A government-issued driving license is widely accepted as a photo identity proof at all polling stations.',
    color: 'secondary'
  },
  {
    id: 6,
    name: 'Other Documents',
    icon: AlertCircle,
    description: 'Includes MNREGA Job Card, Passbooks with photo, Smart Card issued by RGI under NPR, and Pension documents.',
    color: 'accent'
  }
];

export default function RequiredDocuments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {documents.map((doc, index) => (
        <Card key={doc.id} className="h-full">
          <CardContent className="p-8 flex flex-col h-full">
            <div className="mb-6">
              <IconWrapper icon={doc.icon} variant={doc.color} size="lg" />
            </div>
            
            <Typography variant="h4" className="mb-3">
              {doc.name}
            </Typography>
            
            <Typography variant="body" className="text-sm text-[var(--foreground)]/70 flex-grow">
              {doc.description}
            </Typography>

            <motion.div 
              className="mt-6 pt-4 border-t border-[var(--glass-border)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Typography variant="caption" className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                Valid Photo ID
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
