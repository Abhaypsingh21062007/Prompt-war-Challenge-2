import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export default function SEO({ 
  title = 'Election Guide AI', 
  description = 'Your smart AI-powered guide for navigating elections, understanding candidates, and making informed decisions.',
  keywords = 'election, ai, guide, voting, candidates',
  ogImage = '/og-image.jpg'
}: SEOProps) {
  const fullTitle = title === 'Election Guide AI' ? title : `${title} | Election Guide AI`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  );
}
