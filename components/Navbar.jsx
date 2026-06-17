'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const NAV = [
  ['#services', 'Services'],
  ['#process', 'Process'],
  ['#proof', 'Results'],
  ['#contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const indicatorX = useMotionValue(0);
  const indicatorW = useMotionValue(0);
  const sIndX = useSpring(indicatorX, { stiffness: 300, damping: 28 });
  const sIndW = useSpring(indicatorW, { stiffness: 300, damping: 28 });
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    indicatorX.set(rect.left - navRect.left);
    indicatorW.set(rect.width);
    setActiveLink(e.currentTarget.dataset.label);
  };
  const handleMouseLeave = () => setActiveLink(null);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
        className="nav-container"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9990,
          height: '68px',
          display: 'flex', alignItems: 'center',
          background: scrolled
            ? 'rgba(248, 250, 252, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 82, 255, 0.12)' : 'none',
          transition: 'background 0.5s, backdrop-filter 0.5s, border-color 0.5s',
        }}
      >
        {/* Inner top shimmer when scrolled */}
        {scrolled && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 82, 255, 0.3), transparent)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Logo */}
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', flexShrink: 0 }}
          aria-label="BLU Agency home"
        >
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0052FF, #003ECC)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 82, 255, 0.35)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Inner specular */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.25) 0%, transparent 60%)',
            }} />
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '0.75rem', color: '#fff', position: 'relative' }}>B</span>
          </div>
          <span style={{
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: '0.92rem',
            color: 'var(--text)', letterSpacing: '-0.02em',
          }}>
            BLU <span style={{ color: 'var(--accent)', fontWeight: 400 }}>AGENCY</span>
          </span>
        </a>

        {/* Desktop nav links with hover indicator */}
        <div
          className="nav-links-desktop"
          onMouseLeave={handleMouseLeave}
        >
          {/* Sliding hover pill */}
          <motion.div
            style={{
              position: 'absolute', top: '50%',
              x: sIndX, width: sIndW,
              transform: 'translateY(-50%)',
              height: '32px', borderRadius: '6px',
              background: 'rgba(0, 82, 255, 0.06)',
              border: '1px solid rgba(0, 82, 255, 0.15)',
              pointerEvents: 'none',
              opacity: activeLink ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          />
          {NAV.map(([h, l]) => (
            <a
              key={h} href={h}
              data-label={l}
              onMouseEnter={handleMouseEnter}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.58rem',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--t2)', textDecoration: 'none',
                padding: '0.5rem 0.85rem', borderRadius: '6px',
                transition: 'color 0.25s', position: 'relative', zIndex: 1,
              }}
              onFocus={handleMouseEnter}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" className="btn-primary hide-mobile" style={{ fontSize: '0.7rem', padding: '0.65rem 1.4rem' }}>
          Free Audit
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 5.5h9M5.5 1.5l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={mOpen}
          className="hamburger-btn"
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '0.5rem', marginLeft: '1rem',
            color: 'var(--text)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d={mOpen ? 'M3 3l14 14M3 17L17 3' : 'M3 6h14M3 10h14M3 14h14'}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(32px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9989,
              background: 'rgba(248, 250, 252, 0.96)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '2rem',
            }}
            onClick={() => setMOpen(false)}
          >
            {NAV.map(([h, l], i) => (
              <motion.a
                key={h} href={h}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--display)', fontSize: '2.2rem',
                  fontWeight: 700, color: 'var(--text)', textDecoration: 'none',
                  letterSpacing: '-0.03em',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              >
                {l}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-primary"
              style={{ marginTop: '1.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              Book Free Audit
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
