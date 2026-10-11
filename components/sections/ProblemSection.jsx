'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  { process: 'DATA ENTRY',     metric: '12.5h / week', cost: '$1,250 lost' },
  { process: 'LEAD FOLLOW-UP', metric: '65% missed',   cost: '$3,800 lost' },
  { process: 'OPS REPORTING',  metric: '3.5h / week',  cost: '$350 lost'   },
  { process: 'CLIENT ONBOARD', metric: '48h avg delay', cost: '$900 lost'  },
];

function ScanRow({ row, index, active }) {
  const [automated, setAutomated] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      setAutomated(true);
    }, 800 + index * 450);
    return () => clearTimeout(t);
  }, [active, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 120px',
        gap: '1rem',
        padding: '0.9rem 1.5rem',
        borderBottom: '1px solid rgba(0, 82, 255, 0.04)',
        alignItems: 'center',
        background: automated ? 'rgba(0, 82, 255, 0.02)' : 'transparent',
        transition: 'background 0.5s ease',
        position: 'relative',
      }}
    >
      {/* Automated left marker line */}
      {automated && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
            background: 'var(--accent)', transformOrigin: 'top'
          }}
        />
      )}

      {/* Process Name */}
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.06em' }}>
        {row.process}
      </span>

      {/* Workload metric */}
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--t3)' }}>
        {row.metric}
      </span>

      {/* Cost state */}
      <span style={{
        fontFamily: 'var(--mono)', fontSize: '0.62rem',
        color: automated ? 'rgba(0, 82, 255, 0.75)' : 'rgba(248, 113, 113, 0.85)',
        transition: 'color 0.5s'
      }}>
        {automated ? '→ $0 lost' : row.cost}
      </span>

      {/* Status indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: automated ? 'var(--accent)' : 'rgba(248, 113, 113, 0.85)',
          boxShadow: automated ? '0 0 8px var(--accent)' : '0 0 6px rgba(248, 113, 113, 0.6)',
          transition: 'all 0.5s',
          animation: automated ? 'ripple 2s infinite' : 'none'
        }} />
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.54rem', fontWeight: 700, letterSpacing: '0.1em',
          color: automated ? 'var(--accent)' : 'rgba(248, 113, 113, 0.85)',
          transition: 'color 0.5s'
        }}>
          {automated ? 'AUTO' : 'MANUAL'}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance scroll animations
      gsap.fromTo(leftColRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      gsap.fromTo(rightColRef.current,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: rightColRef.current, start: 'top 80%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="sec" style={{ background: 'transparent', position: 'relative' }}>
      {/* Decorative background ambient flare */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 75% 50%, rgba(0, 82, 255, 0.04) 0%, transparent 60%)',
        zIndex: 1
      }} />

      <div className="wrap" style={{ zIndex: 2 }}>
        <div className="problem-layout-grid" style={{ gap: '5rem', alignItems: 'center' }}>
          
          {/* Left copy column */}
          <div ref={leftColRef}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="eyebrow">THE OPERATIONAL LEAK</span>
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.8rem)', color: 'var(--text)', lineHeight: 0.95, marginBottom: '1.5rem' }}>
              Every manual<br />process is a<br /><span className="electric">tax on growth.</span>
            </h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: '0.9rem', fontWeight: 300, color: 'var(--t2)', lineHeight: 1.8, marginBottom: '2.2rem', maxWidth: '380px' }}>
              Over 3+ years of operational audits and systems engineering across 120+ businesses, the same repetitive manual tasks appear every single time, eating hundreds of hours.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '2rem', height: '1px', background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.54rem', letterSpacing: '0.15em', color: 'var(--t3)', textTransform: 'uppercase' }}>
                BLU converts <span style={{ color: 'rgba(248,113,113,0.8)' }}>manual friction</span> to <span style={{ color: 'var(--accent)' }}>active efficiency</span>
              </p>
            </div>
          </div>

          {/* Right Live scan console column */}
          <div ref={rightColRef}>
            <div className="glass-panel" style={{
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(14, 165, 233, 0.08), 0 0 0 1px var(--border) inset'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
              
              {/* Header bar */}
              <div style={{
                background: 'var(--bg-deep)',
                borderBottom: '1px solid var(--border)',
                padding: '0.8rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {['#F87171', '#FBBF24', '#0052FF'].map((bg, idx) => (
                    <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: bg, opacity: 0.8 }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', letterSpacing: '0.18em', color: 'var(--t4)' }}>
                  SYSTEM_AUDIT // DIAGNOSTIC_SCAN
                </span>
                <div className="dot-live" style={{ marginLeft: 'auto' }} />
              </div>

              {/* Table headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 1fr 120px',
                gap: '1rem',
                padding: '0.7rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderBottom: '1px solid var(--border)'
              }}>
                {['PROCESS', 'WORKLOAD', 'EST_LOSS', 'STATE'].map(th => (
                  <span key={th} style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', letterSpacing: '0.2em', color: 'var(--t4)', textTransform: 'uppercase' }}>
                    {th}
                  </span>
                ))}
              </div>

              {/* Rows */}
              <div style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
                {ROWS.map((row, idx) => (
                  <ScanRow key={row.process} row={row} index={idx} active={inView} />
                ))}
              </div>

              {/* Total Loss / Footer */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(248, 113, 113, 0.015)'
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--t3)' }}>
                  TOTAL MONTHLY OPERATIONAL LOSS
                </span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '1.15rem', fontWeight: 700,
                  color: 'rgba(248, 113, 113, 0.9)',
                  textShadow: '0 0 15px rgba(248, 113, 113, 0.25)'
                }}>
                  ~ $6,300 / mo
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom connecting line */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2.5rem 0 -6.5rem', position: 'relative', zIndex: 10 }}>
        <svg width="2" height="120" viewBox="0 0 2 120" fill="none" style={{ overflow: 'visible' }}>
          <path d="M1,0 L1,120" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 3" className="glow-path" />
        </svg>
      </div>
    </section>
  );
}
