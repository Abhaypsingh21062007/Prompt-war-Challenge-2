import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Building2, 
  Users, 
  RefreshCcw, 
  ArrowRight,
  AlertCircle,
  Map as MapIcon,
  ExternalLink
} from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { PINCODE_MAPPING, PincodeData } from '@/data/pincodeMapping';

export default function FindConstituency() {
  const [pincode, setPincode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PincodeData | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<{city: string, state: string} | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const handleSearch = async (code: string) => {
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const localData = PINCODE_MAPPING[code];
      if (localData) {
        setResult(localData);
        setIsLoading(false);
        return;
      }

      // Fallback to real Geocoding API for unknown pincodes
      const response = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to find location details.");
      }

      // Generate realistic constituency data based on real city/state
      const generatedData: PincodeData = {
        pincode: code,
        constituency: `${data.city} Constituency`,
        state: data.state,
        pollingBooth: `Govt. School, ${data.city}`,
        candidates: [
          { name: "Local Candidate A", party: "PFP" },
          { name: "Local Candidate B", party: "NPA" }
        ],
        lat: data.lat,
        lng: data.lng
      };
      setResult(generatedData);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocation = async () => {
    setIsLoading(true);
    setError(null);
    setDetectedLocation(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const response = await fetch('/api/geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to get pincode from location");
          }

          if (data.pincode) {
            setPincode(data.pincode); // Auto-fill the pincode input field
            if (data.city && data.state) {
              setDetectedLocation({ city: data.city, state: data.state });
            }
            handleSearch(data.pincode); // Automatically trigger search
          } else {
            throw new Error("Pincode not found for this location");
          }
        } catch (err: any) {
          setError(err.message || "An error occurred while detecting location.");
          setIsLoading(false);
        }
      },
      (err) => {
        let msg = "Unable to retrieve your location. Please enter your PIN code manually.";
        if (err.code === 1) msg = "Location permission denied. Please enter your PIN code manually.";
        else if (err.code === 2) msg = "Location information is unavailable.";
        else if (err.code === 3) msg = "The request to get user location timed out.";
        
        setError(msg);
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  };

  const resetSearch = () => {
    setResult(null);
    setPincode('');
    setError(null);
    setDetectedLocation(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="search-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-grow space-y-6">
                <div>
                  <Typography variant="h2" className="mb-2">Find My <span className="text-gradient">Constituency</span></Typography>
                  <Typography variant="body" className="text-[var(--foreground)]/60">
                    Enter your PIN code or use your location to find your constituency and voting details instantly.
                  </Typography>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30 group-focus-within:text-[var(--primary)] transition-colors" size={20} />
                    <input 
                      ref={inputRef}
                      type="text" 
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPincode(val);
                        if (error) setError(null);
                        if (val.length === 6) handleSearch(val);
                      }}
                      placeholder="Enter 6-digit PIN Code"
                      className="w-full bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-2xl pl-14 pr-6 py-5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all placeholder:font-normal placeholder:opacity-30"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-grow bg-[var(--glass-border)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">OR</span>
                    <div className="h-px flex-grow bg-[var(--glass-border)]" />
                  </div>

                  <button 
                    onClick={handleGeolocation}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] hover:bg-[var(--foreground)]/10 transition-all font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span>📍</span>
                    {isLoading ? "Detecting location..." : "Detect My Location"}
                  </button>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </div>

              <div className="hidden md:flex w-64 h-64 shrink-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-3xl items-center justify-center relative overflow-hidden group">
                <MapIcon size={120} className="text-[var(--foreground)]/5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-xl animate-bounce">
                    <MapPin size={32} />
                  </div>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="absolute inset-0 bg-[var(--background)]/60 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4" />
                <Typography variant="caption" className="font-bold tracking-widest uppercase">Fetching Details...</Typography>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white flex items-center justify-center shadow-lg">
                      <MapIcon size={32} />
                    </div>
                    <div>
                      <Typography variant="caption" className="uppercase tracking-widest text-[var(--primary)] font-bold mb-1">Your Constituency</Typography>
                      <Typography variant="h1" className="text-3xl md:text-4xl">{result.constituency}</Typography>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Typography variant="body" className="opacity-40">{result.state} • PIN {result.pincode}</Typography>
                        {detectedLocation && (
                          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <span>📍</span> Auto-Detected: {detectedLocation.city}, {detectedLocation.state}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={resetSearch}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] hover:bg-[var(--foreground)]/10 transition-all text-sm font-bold cursor-pointer"
                  >
                    <RefreshCcw size={16} /> Search Again
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Polling Booth Card */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 size={18} className="text-[var(--primary)]" />
                      <Typography variant="h4" className="text-sm uppercase tracking-widest opacity-60">Polling Station</Typography>
                    </div>
                    <div className="p-6 rounded-3xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <Typography variant="h4" className="mb-1">{result.pollingBooth}</Typography>
                        <Typography variant="body" className="text-xs opacity-50">Please carry your Voter ID or valid photo ID to this location.</Typography>
                      </div>
                    </div>
                  </div>

                  {/* Candidates List */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-[var(--secondary)]" />
                      <Typography variant="h4" className="text-sm uppercase tracking-widest opacity-60">Top Candidates</Typography>
                    </div>
                    <div className="space-y-3">
                      {result.candidates.map((cand, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--glass-border)] flex items-center justify-between group hover:border-[var(--primary)]/30 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--foreground)]/5 flex items-center justify-center text-sm font-bold opacity-40">
                              {cand.name.charAt(0)}
                            </div>
                            <div>
                              <Typography variant="h4" className="text-sm">{cand.name}</Typography>
                              <Typography variant="caption" className="text-[10px] font-bold uppercase opacity-30 tracking-widest">{cand.party}</Typography>
                            </div>
                          </div>
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Google Maps Integration */}
                {isLoaded && result.lat && result.lng && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapIcon size={18} className="text-[var(--primary)]" />
                        <Typography variant="h4" className="text-sm uppercase tracking-widest opacity-60">Interactive Map View</Typography>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 hover:underline"
                      >
                        Open in Google Maps <ExternalLink size={12} />
                      </a>
                    </div>
                    <div className="w-full h-80 rounded-[2rem] overflow-hidden border border-[var(--glass-border)] shadow-xl relative group">
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={{ lat: result.lat, lng: result.lng }}
                        zoom={14}
                        options={{
                          styles: [
                            {
                              "featureType": "all",
                              "elementType": "labels.text.fill",
                              "stylers": [{"color": "#ffffff"}, {"weight": "0.20"}]
                            },
                            {
                              "featureType": "water",
                              "elementType": "geometry",
                              "stylers": [{"color": "#193341"}]
                            },
                            {
                              "featureType": "landscape",
                              "elementType": "geometry",
                              "stylers": [{"color": "#2c5a71"}]
                            }
                          ],
                          disableDefaultUI: true,
                          zoomControl: true,
                        }}
                      >
                        <Marker position={{ lat: result.lat, lng: result.lng }} />
                      </GoogleMap>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-grow py-5 rounded-2xl bg-[var(--primary)] text-white font-bold shadow-xl hover:shadow-[var(--primary)]/20 transition-all cursor-pointer flex items-center justify-center gap-2">
                Download Voter Slip <ArrowRight size={18} />
              </button>
              <button className="flex-grow py-5 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-bold shadow-xl hover:shadow-black/10 transition-all cursor-pointer flex items-center justify-center gap-2">
                View Election Schedule <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
