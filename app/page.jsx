'use client';

import { GridProvider } from '@/components/GridProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <GridProvider>
      {/* Background fixed-attachment grid alignment wireframes */}
      <div className="grid-bg-fixed" />

      <div key="site-content">
        <Navbar />
        <main style={{ position: 'relative', zIndex: 2 }}>
          <HeroSection />
          <ProblemSection />
          <ServicesSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </GridProvider>
  );
}

