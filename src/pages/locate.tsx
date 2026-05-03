import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import FindConstituency from '@/components/FindConstituency';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, LogIn, Save } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, User, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function LocateMePage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedData, setSavedData] = useState<any>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch saved constituency if available
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedData(docSnap.data().constituencyData);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
      alert("Login Error: " + error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSaveConstituency = async (data: any) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        constituencyData: data,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSavedData(data);
      alert("Constituency saved to your profile!");
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  return (
    <>
      <SEO
        title="Locate Me - Find Your Constituency | Election Guide AI"
        description="Login, detect your location to find your constituency, and save it to your profile."
      />

      <Section className="pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-bold mb-6"
          >
            <MapPin size={16} />
            Location-Aware Constituency Finder
          </motion.div>

          <Typography variant="h1" className="mb-4">
            Find & Save Your <span className="text-gradient">Constituency</span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto opacity-70">
            Login with Google, detect your location, and save your constituency details for quick access later.
          </Typography>
        </motion.div>
      </Section>

      <Section className="pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {authLoading ? (
               <motion.div 
                 key="loader"
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 className="flex flex-col items-center justify-center p-20"
               >
                 <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4" />
                 <Typography variant="caption" className="font-bold tracking-widest uppercase opacity-50">Authenticating...</Typography>
               </motion.div>
            ) : !user ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[2.5rem] p-10 text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LogIn size={40} className="text-[var(--primary)]" />
                </div>
                <Typography variant="h3" className="mb-2">Login Required</Typography>
                <Typography variant="body" className="opacity-70 mb-8">
                  Please log in to detect your location and save your constituency to your profile.
                </Typography>
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[var(--primary)] text-white font-bold hover:shadow-[var(--primary)]/30 hover:shadow-xl transition-all"
                >
                  {isLoggingIn ? "Logging in..." : "Sign in with Google"}
                </button>
              </motion.div>
            ) : (
              <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {savedData && (
                   <div className="max-w-4xl mx-auto mb-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center justify-between">
                     <div>
                       <Typography variant="h4" className="text-green-600 mb-1">Saved Constituency: {savedData.constituency}</Typography>
                       <Typography variant="caption" className="text-green-600/70">PIN: {savedData.pincode}</Typography>
                     </div>
                     <MapPin className="text-green-500" />
                   </div>
                )}
                <FindConstituency onResultFound={handleSaveConstituency} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Quick links back */}
      <Section className="pb-20 bg-[var(--foreground)]/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <Typography variant="h4" className="opacity-60">
            Explore more tools
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="px-6 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--foreground)]/10 transition-all font-bold text-sm">
              🏠 Home
            </Link>
            <Link href="/votekit" className="px-6 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--foreground)]/10 transition-all font-bold text-sm">
              🗳️ VoteKit
            </Link>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
