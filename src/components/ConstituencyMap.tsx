import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { CONSTITUENCY_GEOJSON } from '@/data/constituencies';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Info, 
  X,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '@/utils/cn';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

interface ConstituencyProps {
  name: string;
  state: string;
  turnout: string;
  status: 'Live' | 'Counting' | 'Result';
  candidates: Array<{ name: string; party: string }>;
}

export default function ConstituencyMap() {
  const [selectedData, setSelectedData] = useState<ConstituencyProps | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => setSelectedData(feature.properties),
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 0.7,
          weight: 3,
          color: 'var(--primary)'
        });
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 0.3,
          weight: 1,
          color: 'var(--glass-border)'
        });
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live': return <Zap size={14} className="text-orange-500 animate-pulse" />;
      case 'Counting': return <Clock size={14} className="text-blue-500" />;
      case 'Result': return <CheckCircle2 size={14} className="text-green-500" />;
      default: return null;
    }
  };

  if (!isMounted) return <div className="h-[500px] w-full bg-[var(--foreground)]/5 animate-pulse rounded-3xl" />;

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      {/* Map Side */}
      <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-2xl h-[500px]">
        <MapContainer 
          center={[28.61, 77.23]} 
          zoom={11} 
          className="h-full w-full z-10"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <GeoJSON 
            data={CONSTITUENCY_GEOJSON}
            onEachFeature={onEachFeature}
            style={{
              fillColor: 'var(--primary)',
              fillOpacity: 0.3,
              color: 'var(--glass-border)',
              weight: 1,
            }}
          />
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 z-20 bg-[var(--background)]/80 backdrop-blur-md p-4 rounded-2xl border border-[var(--glass-border)] shadow-lg space-y-2">
          <Typography variant="caption" className="font-bold block mb-2 opacity-50 uppercase tracking-widest text-[8px]">Map Legend</Typography>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" /> Live Voting
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <div className="w-3 h-3 rounded-full bg-blue-500" /> Counting
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold">
            <div className="w-3 h-3 rounded-full bg-green-500" /> Declared
          </div>
        </div>
      </div>

      {/* Info Panel Side */}
      <div className="lg:col-span-4 h-full min-h-[500px]">
        <AnimatePresence mode="wait">
          {!selectedData ? (
            <motion.div
              key="no-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-8 text-center bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center mb-6 text-[var(--foreground)]/20">
                <MapPin size={40} />
              </div>
              <Typography variant="h3" className="mb-2">Select a Constituency</Typography>
              <Typography variant="body" className="text-sm text-[var(--foreground)]/40">
                Click on any colored region on the map to view real-time election details and candidates.
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="h-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Typography variant="h2" className="text-2xl">{selectedData.name}</Typography>
                  <Typography variant="caption" className="text-[var(--primary)] font-bold uppercase tracking-widest mt-1 block">
                    {selectedData.state}
                  </Typography>
                </div>
                <button 
                  onClick={() => setSelectedData(null)}
                  className="p-2 hover:bg-[var(--foreground)]/5 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} className="text-[var(--foreground)]/30" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)]">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={14} className="text-[var(--primary)]" />
                    <Typography variant="caption" className="text-[8px] font-bold uppercase opacity-40">Turnout</Typography>
                  </div>
                  <Typography variant="h4" className="text-xl">{selectedData.turnout}</Typography>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)]">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(selectedData.status)}
                    <Typography variant="caption" className="text-[8px] font-bold uppercase opacity-40">Status</Typography>
                  </div>
                  <Typography variant="h4" className="text-xl">{selectedData.status}</Typography>
                </div>
              </div>

              <div className="flex-grow">
                <Typography variant="caption" className="font-bold text-[var(--primary)] uppercase tracking-widest block mb-4">
                  Contesting Candidates
                </Typography>
                <div className="space-y-3">
                  {selectedData.candidates.map((cand, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] hover:border-[var(--primary)]/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-[10px] font-bold">
                          {cand.name.charAt(0)}
                        </div>
                        <div>
                          <Typography variant="h4" className="text-sm">{cand.name}</Typography>
                          <Typography variant="caption" className="text-[8px] font-bold opacity-40">{cand.party}</Typography>
                        </div>
                      </div>
                      <ChevronIcon size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <Typography variant="body" className="text-[10px] leading-relaxed opacity-60">
                    Results shown are based on the latest round of counting verified by election officials.
                  </Typography>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { ChevronRight as ChevronIcon } from 'lucide-react';
