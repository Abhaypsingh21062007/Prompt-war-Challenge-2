import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import Image from 'next/image';

const essentials = [
  {
    name: 'EVM',
    image: '/images/essentials/evm.png',
    description: 'The Electronic Voting Machine is used to record and count votes electronically, ensuring a fast and secure voting process.'
  },
  {
    name: 'Voter ID',
    image: '/images/essentials/voter_id.png',
    description: 'Also known as EPIC, this photo identity card is issued by the Election Commission to all eligible voters.'
  },
  {
    name: 'Indelible Ink',
    image: '/images/essentials/ink.png',
    description: 'A semi-permanent ink applied to the index finger of voters to prevent fraudulent multiple voting.'
  },
  {
    name: 'VVPAT',
    image: '/images/essentials/vvpat.png',
    description: 'The Voter Verifiable Paper Audit Trail allows voters to verify that their vote was cast correctly by viewing a printed slip.'
  },
  {
    name: 'Polling Station',
    image: '/images/essentials/polling_station.png',
    description: 'The designated location where voters go to cast their ballots in a secure and supervised environment.'
  },
  {
    name: 'Voter Slip',
    image: '/images/essentials/voter_slip.png',
    description: 'A document provided to voters that includes their details and serial number in the electoral roll for easy identification.'
  },
  {
    name: 'NOTA',
    image: '/images/essentials/nota.png',
    description: 'Allows voters to officially register a vote of rejection for all candidates who are contesting an election.'
  },
  {
    name: 'MCC',
    image: '/images/essentials/mcc.png',
    description: 'The Model Code of Conduct is a set of guidelines issued by the ECI to regulate political parties and candidates.'
  },
  {
    name: 'Postal Ballot',
    image: '/images/essentials/postal_ballot.png',
    description: 'A facility for specific groups like service voters and senior citizens to cast their vote remotely through post.'
  }
];

const VotingEssentials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
      {essentials.map((item, index) => (
        <FlashCard key={index} item={item} />
      ))}
    </div>
  );
};

const FlashCard = ({ item }: { item: typeof essentials[0] }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div 
      className="perspective-1000 h-[400px] w-full cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-[var(--card)]">
          <div className="relative h-2/3 w-full">
            <Image 
              src={item.image} 
              alt={item.name} 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-6 h-1/3 flex items-center justify-center bg-white/5 backdrop-blur-sm">
            <Typography variant="h3" className="text-center font-bold tracking-tight">
              {item.name}
            </Typography>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-8 flex flex-col items-center justify-center text-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Typography variant="h3" className="text-white mb-4 font-bold">
            {item.name}
          </Typography>
          <div className="w-12 h-1 bg-white/30 mb-6 rounded-full" />
          <Typography variant="body" className="text-white/90 leading-relaxed">
            {item.description}
          </Typography>
        </div>
      </motion.div>
    </div>
  );
};

export default VotingEssentials;
