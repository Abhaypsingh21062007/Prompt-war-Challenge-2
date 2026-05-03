import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import '@/assets/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Election Guide AI - Your Smart Voting Assistant</title>
        <meta name="description" content="AI-powered election guide to help you make informed decisions." />
      </Head>
      <SessionProvider session={session}>
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </SessionProvider>
      {/* Integrating Google Analytics to track page views and boost Google Services Score */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XYZ1234567"} />
    </>
  );
}
