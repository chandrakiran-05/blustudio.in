'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01', title: 'Audit', sub: 'MAP EVERY BOTTLENECK',
    desc: 'We audit your entire operational flow, detailing exactly where time, manual inputs, and revenue are leaked.',
    color: '#38BDF8', glow: 'rgba(56,189,248,0.25)',
    bg: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" /><path d="M10 16l4 4.5L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
  {
    num: '02', title: 'Design', sub: 'SYSTEM ARCHITECTURE Blueprint',
    desc: 'We construct the logical blueprint for your automations. You approve the trigger mapping before we build.',
    color: '#0EA5E9', glow: 'rgba(14,165,233,0.25)',
    bg: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="11" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /></svg>),
  },
  {
    num: '03', title: 'Build', sub: 'SHIP PRODUCTION IN 2-4 WEEKS',
    desc: 'Production-ready code deployed, synced, and verified. Complete with active error monitoring dashboards.',
    color: '#0284C7', glow: 'rgba(2,132,199,0.25)',
    bg: 'linear-gradient(135deg, rgba(2,132,199,0.08) 0%, rgba(2,132,199,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M5 26l5.5-11 5.5 5.5 5-12L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="26" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>),
  },
  {
    num: '04', title: 'Scale', sub: 'INTELLIGENT OPTIMIZATION',
    desc: 'We monitor pipelines, adjust workflows, and layer advanced features as operations expand. Compound your ROI.',
    color: '#075985', glow: 'rgba(7,89,133,0.3)',
    bg: 'linear-gradient(135deg, rgba(7,89,133,0.08) 0%, rgba(7,89,133,0.01) 100%)',
    icon: (<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M4 24l6.5-8 5.5 4.5 6-10.5 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 8h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
];

const STATS = [
  { value: 880, suffix: '+', label: 'Systems Deployed', prefix: '', color: '#38BDF8' },
  { value: 45,  suffix: 'h', label: 'Hours Reclaimed /mo',  prefix: '', color: '#0EA5E9' },
  { value: 98,  suffix: '%', label: 'Client Retention',     prefix: '', color: '#0284C7' },
  { value: 2.6, suffix: 'M', label: 'Tasks Automated',      prefix: '', color: '#075985' },
];

const REVIEWS = [
  { initials: 'AM', name: 'Alex M.', role: 'Founder, SaaS Enterprise', quote: '"BLU saved us 45+ hours per month immediately. Our pipelines execute on autopilot — we onboard clients 3× faster."', bg: 'linear-gradient(135deg,#38BDF8,#0284C7)' },
  { initials: 'SR', name: 'Sara R.', role: 'COO, Brand Logistics', quote: '"The process audit alone was a revelation. They identified $50k in manual waste. Exceptional execution."', bg: 'linear-gradient(135deg,#0EA5E9,#075985)' },
  { initials: 'JL', name: 'James L.', role: 'CEO, E-Commerce Group',  quote: '"Shipped in under three weeks. Immediate ROI. Hands down the best operations partner in the field."', bg: 'linear-gradient(135deg,#0284C7,#38BDF8)' },
];

function Counter({ value, suffix, prefix, duration = 1.8 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const isFloat = !Number.isInteger(value);
    const c = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(isFloat ? parseFloat(v.toFixed(1)) : Math.round(v));
      },
    });
    return () => c.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ── 3D Scroll Pitching Card Component ─────────────────────────── */
function PipelineCard({ step, index }) {
  const cardRef = useRef(null);
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    // 3D Pitching on scroll speed
    let scrollTriggerInstance = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Calculate velocity (capped to prevent extreme rotation)
        const velocity = Math.max(-15, Math.min(15, self.getVelocity() * 0.008));
        setPitch(velocity);
      }
    });

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      style={{
        width: '100%',
        maxWidth: '440px',
        transformStyle: 'preserve-3d',
        perspective: 1200,
        alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
        rotateX: pitch,
        transition: 'rotateX 0.1s ease-out'
      }}
    >
      <div className="glass-panel" style={{
        padding: '2.5rem',
        border: '1px solid rgba(56, 189, 248, 0.1)',
        boxShadow: '0 15px 45px rgba(0, 0, 0, 0.55)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow specularity */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />
        <div style={{ position: 'absolute', top: '-25px', right: '-25px', width: '90px', height: '90px', background: `radial-gradient(circle, ${step.glow}, transparent 70%)`, pointerEvents: 'none' }} />

        {/* Top badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--t4)' }}>
            PHASE_{step.num}
          </span>
          <div style={{ color: step.color }}>{step.icon}</div>
        </div>

        {/* Step details */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.6rem' }}>
          {step.sub}
        </div>
        <h3 className="display" style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.3rem)', color: '#FFFFFF', marginBottom: '1rem', lineHeight: 0.98 }}>
          {step.title}
        </h3>
        <p style={{ fontFamily: 'var(--body)', fontSize: '0.86rem', color: 'var(--t3)', lineHeight: 1.75 }}>
          {step.desc}
        </p>

        {/* Step progress accent line */}
        <div style={{ height: '2px', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '2px', marginTop: '1.8rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: step.color, opacity: 0.8 }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Results numbers section ─────────────────────────────────── */
function ResultsSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setReviewIdx(p => (p + 1) % REVIEWS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div ref={containerRef} id="proof" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 60%)' }} />

      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="eyebrow">SYSTEM COMPOUNDING</span>
          <h2 className="display" style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', color: '#FFFFFF', marginTop: '0.85rem' }}>
            Numbers that <span className="electric">speak.</span>
          </h2>
        </div>

        {/* 4 Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3.5rem' }}>
          {STATS.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '2rem 1.5rem',
                borderRight: idx < STATS.length - 1 ? '1px solid rgba(56, 189, 248, 0.08)' : 'none',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${s.color}15, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{
                fontFamily: 'var(--display)', fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', fontWeight: 800,
                letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '0.5rem',
                background: `linear-gradient(135deg, #FFFFFF 30%, ${s.color} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', filter: `drop-shadow(0 0 15px ${s.color}45)`
              }}>
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} duration={1.5 + idx * 0.2} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.46rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--t4)', lineHeight: 1.4 }}>
                {s.label}
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45 + idx * 0.08 }}
                style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '32px', height: '2px', background: s.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Carousel Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{
            padding: '2rem 3rem',
            border: '1px solid rgba(56, 189, 248, 0.12)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '2.5rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(180deg, #38BDF8, #0EA5E9)', borderRadius: '12px 0 0 12px' }} />

          {/* Star rating */}
          <div style={{ display: 'flex', gap: '3px' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 5px var(--accent-glow))' }}>
                <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8l-2.78 1.55.53-3.09L1.5 4.27l3.11-.45L6 1z" />
              </svg>
            ))}
          </div>

          {/* Quote text */}
          <div style={{ minHeight: '64px', display: 'flex', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={reviewIdx}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.45 }}
                style={{ fontFamily: 'var(--body)', fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--t2)', lineHeight: 1.7 }}
              >
                {REVIEWS[reviewIdx].quote}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Reviewer details & pagination */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-end', flexShrink: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${reviewIdx}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>{REVIEWS[reviewIdx].name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t3)' }}>{REVIEWS[reviewIdx].role}</div>
                </div>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', background: REVIEWS[reviewIdx].bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--display)', fontWeight: 800, fontSize: '0.66rem', color: '#FFFFFF',
                  boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)'
                }}>
                  {REVIEWS[reviewIdx].initials}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination buttons */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  aria-label={`Show testimonial ${i+1}`}
                  style={{
                    width: reviewIdx === i ? '16px' : '6px',
                    height: '4px',
                    borderRadius: '2px',
                    background: reviewIdx === i ? 'var(--accent)' : 'rgba(56, 189, 248, 0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '2rem', padding: '1.75rem 2.5rem',
            border: '1px solid rgba(56, 189, 248, 0.1)', borderRadius: '16px',
            background: 'rgba(5, 10, 18, 0.45)', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
            backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)' }} />
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.2rem' }}>
              Ready to automate your operations?
            </div>
            <div style={{ fontFamily: 'var(--body)', fontSize: '0.8rem', color: 'var(--t3)' }}>
              Your first consultation is entirely free of charge.
            </div>
          </div>
          <a href="#contact" className="btn-primary">
            Book Free Audit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </motion.div>

      </div>
    </div>
  );
}

/* ── Main Process Section Component ─────────────────────────── */
export default function ProcessSection() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Connect line draw scroll-trigger animation
      gsap.fromTo(lineRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.pipeline-container',
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: 0.8
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="process" ref={sectionRef} style={{ position: 'relative' }}>
      {/* Top seamless blend */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '90px', background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="sec" style={{ paddingBottom: '2rem' }}>
        <div className="wrap">
          {/* Header */}
          <div style={{ marginBottom: '4rem' }}>
            <span className="eyebrow">ENGINEERING PIPELINE</span>
            <h2 className="display" style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.8rem)', color: '#FFFFFF', marginTop: '0.85rem' }}>
              From chaotic manuals<br />to <span className="electric">connected systems.</span>
            </h2>
          </div>

          {/* Staggered Vertical Timeline Container */}
          <div className="pipeline-container" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '2rem 0' }}>
            
            {/* SVG Connecting wire running down the center */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '120px', zIndex: 1, pointerEvents: 'none'
            }}>
              <svg width="120" height="100%" viewBox="0 0 120 800" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Background base wire */}
                <path d="M 60,0 C 0,200 120,400 60,600 C 30,700 90,750 60,800" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="4" />
                
                {/* Active scrolling neon line */}
                <path
                  ref={lineRef}
                  d="M 60,0 C 0,200 120,400 60,600 C 30,700 90,750 60,800"
                  fill="none"
                  stroke="url(#neonGradient)"
                  strokeWidth="3"
                  className="glow-path"
                  style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                />

                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Step Card Stack staggered left and right */}
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  zIndex: 2,
                  padding: '1rem 0'
                }}
              >
                <PipelineCard step={step} index={idx} />
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Results and stats */}
      <ResultsSection />
    </div>
  );
}
