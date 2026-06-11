'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV = [['#services', 'Services'], ['#process', 'Process'], ['#proof', 'Results'], ['#contact', 'Contact']];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: footerRef.current, start: 'top 88%', once: true } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ position: 'relative', borderTop: '1px solid rgba(56,189,248,0.08)', background: 'transparent', overflow: 'hidden' }}>
      {/* Top shimmer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent)' }} />
      {/* Ambient bloom */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 70% at 50% 100%, rgba(56,189,248,0.04) 0%, transparent 70%)' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '3.5rem 2.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '3.5rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(56,189,248,0.06)' }}>

          {/* Brand */}
          <div className="footer-col">
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #38BDF8, #0284C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(56,189,248,0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
                <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '0.78rem', color: '#fff', position: 'relative' }}>B</span>
              </div>
              <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                BLU <span style={{ color: 'var(--accent)', fontWeight: 400 }}>AGENCY</span>
              </span>
            </a>
            <p style={{ fontFamily: 'var(--body)', fontSize: '0.83rem', fontWeight: 300, color: 'var(--t3)', lineHeight: 1.82, maxWidth: '260px' }}>
              AI automation studio building intelligent systems for ambitious businesses.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.55rem', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.12)', borderRadius: '100px', padding: '0.3rem 0.75rem' }}>
              <div className="dot-live" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.46rem', letterSpacing: '0.18em', color: 'var(--accent)', opacity: 0.8 }}>SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="footer-col">
            <h3 style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(56,189,248,0.45)', marginBottom: '1.25rem' }}>Navigation</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {NAV.map(([h, l]) => (
                <li key={h}>
                  <a href={h} style={{ fontFamily: 'var(--body)', fontSize: '0.85rem', color: 'var(--t3)', textDecoration: 'none', transition: 'color 0.25s, padding-left 0.25s', display: 'inline-block' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.paddingLeft = '5px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)'; e.currentTarget.style.paddingLeft = '0'; }}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="footer-col">
            <h3 style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(56,189,248,0.45)', marginBottom: '1.25rem' }}>Connect</h3>
            <a href="mailto:hello@bluagency.io" style={{ display: 'block', fontFamily: 'var(--body)', fontSize: '0.85rem', color: 'var(--t3)', textDecoration: 'none', marginBottom: '0.85rem', transition: 'color 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--t3)'}
            >
              hello@bluagency.io
            </a>
            <a href="https://wa.me/1234567890" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--body)', fontSize: '0.85rem', color: '#4ade80', textDecoration: 'none', transition: 'opacity 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.858L0 24l6.335-1.521A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.366l-.358-.213-3.758.902.949-3.659-.233-.376A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.46rem', letterSpacing: '0.18em', color: 'rgba(56,189,248,0.18)' }}>
            © {new Date().getFullYear()} BLU AGENCY. ALL RIGHTS RESERVED.
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.46rem', letterSpacing: '0.16em', color: 'rgba(56,189,248,0.18)' }}>
            INTELLIGENCE · ENGINEERED
          </p>
        </div>
      </div>
    </footer>
  );
}
