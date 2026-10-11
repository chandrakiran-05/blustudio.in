import './globals.css';
import SmoothScroll from '../components/SmoothScroll';

export const metadata = {
  title: 'BLU Studio — Established AI Automation Studio (Est. 2023)',
  description: 'Established in 2023 with over 3 years of operational engineering experience. We build battle-tested AI workflows that eliminate manual work, connect systems, and scale operations on autopilot.',
  keywords: 'BLU Studio, AI automation, workflow automation, n8n, Make, Zapier, AI agency, digital automation, established AI studio',
  openGraph: {
    title: 'BLU Studio — Intelligent Automation for Modern Business',
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
