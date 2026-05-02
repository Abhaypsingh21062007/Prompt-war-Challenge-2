import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import VoteBuddy from '@/components/VoteBuddy';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
      <VoteBuddy />
    </div>
  );
}
