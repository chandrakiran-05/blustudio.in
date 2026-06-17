'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01', tag: 'CORE OPERATIONS',
    title: 'AI Workflow Automation',
    desc: 'We map your operation and automate every manual pipeline — CRM syncing, email sequence triggers, invoice creation, client onboarding, and data entry.',
    bullets: ['n8n · Make · Custom API integrations', 'Lead routing & pipeline syncs', 'Intelligent CRM update engines', 'Document & report generator systems'],
    color: '#0052FF', glow: 'rgba(0,82,255,0.22)',
    bg: 'linear-gradient(135deg, rgba(0,82,255,0.08) 0%, rgba(0,82,255,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="6" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="26" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M16 11.5v5M13.2 18.2L8.5 21M18.8 18.2L23.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>),
  },
  {
    num: '02', tag: 'ENGINEERED INTERFACES',
    title: 'Web Dev & AI Integration',
    desc: 'High-speed modern websites configured with intelligent lead capture, custom chatbot qualifying agents, and automated database entries.',
    bullets: ['Next.js · Zero-friction performance', 'Tailored AI support assistant agents', 'Automated customer intake pipelines', 'SEO analytics dashboard setup'],
    color: '#0066FF', glow: 'rgba(0,102,255,0.22)',
    bg: 'linear-gradient(135deg, rgba(0,102,255,0.08) 0%, rgba(0,102,255,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="2" y="6" width="28" height="20" rx="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2 11h28" stroke="currentColor" strokeWidth="1.5" /><circle cx="6.5" cy="8.5" r="1.2" fill="currentColor" /></svg>),
  },
  {
    num: '03', tag: 'MEDIA REACH',
    title: 'Social Media AI Agents',
    desc: 'Intelligent automation systems that monitor trends, generate original assets, schedule calendar updates, and engage organic leads.',
    bullets: ['AI calendar scheduling engines', 'Trend scanning & topic generators', 'Automated DM response triggers', 'Audience engagement pipelines'],
    color: '#003ECC', glow: 'rgba(0,62,204,0.22)',
    bg: 'linear-gradient(135deg, rgba(0,62,204,0.08) 0%, rgba(0,62,204,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M4 24L12 15l5.5 5.5 5.5-7 6 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M25 4v7h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
];

function ServiceCard({ s, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  // 3D Card Tilt springs
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);
  const sX = useSpring(rX, { stiffness: 150, damping: 20 });
  const sY = useSpring(rY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered scroll slide entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, rotateX: 6 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 1, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rX.set(-(y / (rect.height / 2)) * 8);
    rY.set((x / (rect.width / 2)) * 8);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rX.set(0);
    rY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="service-card-grid"
        style={{
          rotateX: sX, rotateY: sY,
          gap: '3rem', padding: '2.5rem 3rem',
          border: '1px solid var(--border)',
          borderRadius: '16px', alignItems: 'start',
          backdropFilter: 'blur(20px)',
          background: hovered ? s.bg : 'rgba(255, 255, 255, 0.65)',
          borderColor: hovered ? s.color : 'var(--border)',
          boxShadow: hovered 
            ? `0 20px 45px rgba(0, 82, 255, 0.1), 0 0 0 1px ${s.glow} inset` 
            : '0 8px 25px rgba(0, 82, 255, 0.04)',
          position: 'relative', overflow: 'hidden',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s'
        }}
      >
        {/* Specular highlights */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, opacity: hovered ? 0.8 : 0.15, transition: 'opacity 0.4s' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '45%', background: 'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontFamily: 'var(--mono)', fontSize: '0.48rem', letterSpacing: '0.25em', color: 'var(--t4)' }}>{s.num}</div>

        {/* Left column */}
        <div>
          <motion.div
            animate={{ color: hovered ? s.color : 'var(--t4)', scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', marginBottom: '1.5rem', width: 'fit-content' }}
          >
            {s.icon}
          </motion.div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: hovered ? s.color : 'var(--accent)', marginBottom: '0.75rem', opacity: hovered ? 0.95 : 0.6, transition: 'color 0.3s' }}>
            {s.tag}
          </div>
          <h3 className="display" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.1rem)', color: hovered ? 'var(--text)' : 'var(--t2)', marginBottom: '1rem', transition: 'color 0.3s' }}>
            {s.title}
          </h3>
          <p style={{ fontFamily: 'var(--body)', fontSize: '0.86rem', fontWeight: 300, color: 'var(--t3)', lineHeight: 1.75 }}>
            {s.desc}
          </p>
        </div>

        {/* Right column (bullet points list) */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '3.5rem' }}>
          {s.bullets.map((bullet, idx) => (
            <motion.li
              key={bullet}
              animate={{ opacity: hovered ? 1 : 0.6, x: hovered ? 0 : 3 }}
              transition={{ delay: idx * 0.06, duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}
            >
              <span style={{ color: hovered ? s.color : 'var(--accent)', fontSize: '0.6rem', marginTop: '0.15rem', flexShrink: 0, transition: 'color 0.3s' }}>
                ▸
              </span>
              <span style={{ fontFamily: 'var(--body)', fontSize: '0.82rem', fontWeight: 300, color: 'var(--t2)' }}>
                {bullet}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title scroll entrance
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1, y: 0, duration: 1, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="sec" style={{ background: 'transparent', position: 'relative' }}>
      {/* Background radial flare */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 10% 50%, rgba(0,82,255,0.03) 0%, transparent 60%)',
        zIndex: 1
      }} />

      <div className="wrap" style={{ zIndex: 2 }}>
        
        {/* Title header bar */}
        <div ref={headerRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ marginBottom: '1.1rem' }}>
              <span className="eyebrow">CAPABILITIES</span>
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.8rem)', color: 'var(--text)', lineHeight: 0.95 }}>
              Systems that operate<br /><span className="electric">while you sleep.</span>
            </h2>
          </div>
          <a href="#contact" className="btn-primary" style={{ alignSelf: 'flex-end' }}>
            Start Building
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        {/* Service Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SERVICES.map((s, idx) => (
            <ServiceCard key={s.num} s={s} index={idx} />
          ))}
        </div>

      </div>

      {/* Bottom connecting line */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '3.5rem 0 -6.5rem', position: 'relative', zIndex: 10 }}>
        <svg width="2" height="120" viewBox="0 0 2 120" fill="none" style={{ overflow: 'visible' }}>
          <path d="M1,0 L1,120" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 3" className="glow-path" />
        </svg>
      </div>
    </section>
  );
}
