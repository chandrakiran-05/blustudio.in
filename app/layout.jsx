import './globals.css';
import SmoothScroll from '../components/SmoothScroll';

export const metadata = {
  title: 'BLU Agency — AI Automation Studio',
  description: 'We build AI-powered workflows that eliminate manual work, connect your tools, and scale your operations. Book a free 30-min automation audit.',
  keywords: 'AI automation, workflow automation, n8n, Make, Zapier, AI agency, digital automation',
  openGraph: {
    title: 'BLU Agency — Intelligent Automation for Modern Business',
    description: 'AI workflows. Zero friction. Infinite scale.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
