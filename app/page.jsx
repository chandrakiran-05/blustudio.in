'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GridProvider } from '@/components/GridProvider';
import IntroCanvas from '@/components/sections/IntroCanvas';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <GridProvider>
      {/* Background fixed-attachment grid alignment wireframes */}
      <div className="grid-bg-fixed" />
      <div className="noise-overlay" />
      <div className="scanlines" />

      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroCanvas key="intro" onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="site-content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            <main style={{ position: 'relative', zIndex: 2 }}>
              <HeroSection />
              <ProblemSection />
              <ServicesSection />
              <ProcessSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </GridProvider>
  );
}
