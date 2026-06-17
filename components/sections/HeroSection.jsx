'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Neural Canvas ──────────────────────────────────────────── */
function NeuralCanvas() {
  const cvs = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const alive = useRef(true);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    alive.current = true;

    const onMM = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMM);

    let nodes = [], packets = [], tick = 0, raf;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = Array.from({ length: 42 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 2,
        ph: Math.random() * Math.PI * 2,
        z: 0.2 + Math.random() * 0.8,
      }));
      packets = [];
    };
    init();

    const spawn = setInterval(() => {
      if (!alive.current || nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      if (Math.hypot(nodes[b].x - nodes[a].x, nodes[b].y - nodes[a].y) < 260)
        packets.push({ a, b, p: 0, spd: 0.005 + Math.random() * 0.008 });
    }, 150);

    const draw = () => {
      if (!alive.current) return;
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x, my = mouse.current.y;

      nodes.forEach(n => {
        n.x += n.vx * n.z;
        n.y += n.vy * n.z;
        if (n.x < -60) n.x = canvas.width + 60;
        if (n.x > canvas.width + 60) n.x = -60;
        if (n.y < -60) n.y = canvas.height + 60;
        if (n.y > canvas.height + 60) n.y = -60;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y);
          if (d < 260) {
            const md = Math.min(
              Math.hypot(mx - nodes[i].x, my - nodes[i].y),
              Math.hypot(mx - nodes[j].x, my - nodes[j].y)
            );
            const alpha = (1 - d / 260) * 0.22 + Math.max(0, 1 - md / 180) * 0.45;
            const z = (nodes[i].z + nodes[j].z) / 2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 82, 255, ${alpha * 1.6 * z})`;
            ctx.lineWidth = 0.6 * z;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      packets = packets.filter(pk => {
        pk.p += pk.spd;
        if (pk.p >= 1) return false;
        const na = nodes[pk.a], nb = nodes[pk.b];
        if (!na || !nb) return false;
        const x = na.x + (nb.x - na.x) * pk.p;
        const y = na.y + (nb.y - na.y) * pk.p;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, 'rgba(0, 82, 255, 0.95)');
        g.addColorStop(1, 'rgba(0, 82, 255, 0)');
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#0052FF';
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      nodes.forEach(n => {
        const prox = Math.max(0, 1 - Math.hypot(mx - n.x, my - n.y) / 150);
        const br = (0.5 + Math.sin(tick * 0.02 + n.ph) * 0.25 + prox * 0.9) * n.z;
        const r = n.r * n.z;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 14);
        g.addColorStop(0, `rgba(0, 82, 255, ${0.45 * br})`);
        g.addColorStop(1, 'rgba(0, 82, 255, 0)');
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(n.x, n.y, r * 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 82, 255, ${0.95 * br})`;
        ctx.shadowColor = '#0052FF';
        ctx.shadowBlur = 12 * br;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      if (alive.current) init();
    };
    window.addEventListener('resize', onResize);

    return () => {
      alive.current = false;
      cancelAnimationFrame(raf);
      clearInterval(spawn);
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={cvs} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ── 3D Tilt Wrapper ─────────────────────────────────────────── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 180, damping: 25 });
  const sY = useSpring(rotY, { stiffness: 180, damping: 25 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        rotY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 12);
        rotX.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 10);
      }}
      onMouseLeave={() => {
        rotX.set(0);
        rotY.set(0);
      }}
      style={{ rotateX: sX, rotateY: sY, transformStyle: 'preserve-3d', perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Automation Dashboard Card ───────────────────────────────── */
function AutomationCard() {
  const steps = [
    { label: 'Lead Qualified', done: true },
    { label: 'CRM Synced & Updated', done: true },
    { label: 'Slack Ops Notified', done: true },
    { label: 'Email Follow-up Sent', done: true },
    { label: 'Diagnostic Scheduled', active: true },
  ];

  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, y: 70, rotateX: -22 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.4, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel"
        style={{
          border: '1px solid var(--border)',
          padding: '2rem',
          width: '320px',
          boxShadow: '0 20px 45px rgba(14, 165, 233, 0.08), 0 0 0 1px var(--border) inset',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)', pointerEvents: 'none' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <div className="dot-live" />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>SYSTEMS_LIVE</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '0.5rem', color: 'var(--t4)' }}>#B098</span>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', paddingBottom: '0.9rem', position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', left: '6px', top: '15px', width: '1px', height: '100%', background: 'linear-gradient(180deg, rgba(0, 82, 255, 0.3), transparent)' }} />
              )}
              <div style={{
                width: '13px', height: '13px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                border: `1.5px solid ${s.active || s.done ? 'var(--accent)' : 'var(--border)'}`,
                background: s.active ? 'rgba(0, 82, 255, 0.12)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: s.active ? '0 0 10px rgba(0, 82, 255, 0.6)' : 'none',
              }}>
                {s.done && <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M1 3l1.5 1.5 2.5-2.5" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" /></svg>}
                {s.active && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)' }} />}
              </div>
              <span style={{ fontFamily: 'var(--body)', fontSize: '0.8rem', color: s.done ? 'var(--t3)' : s.active ? 'var(--text)' : 'var(--t4)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats footer */}
        <div style={{ marginTop: '0.5rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(0, 82, 255, 0.1)', display: 'flex', justifyContent: 'space-between' }}>
          {[['982', 'workflows'], ['14.2h', 'saved/wk']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', textShadow: '0 0 15px rgba(0, 82, 255, 0.5)' }}>{v}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--t4)', marginTop: '0.15rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ── Hero Section ────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on bg nodes
      gsap.to(bgRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stagger reveal text layers
      gsap.fromTo(titleRef.current.children,
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: [0.16, 1, 0.3, 1] }
      );

      gsap.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
      );

      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.8, ease: 'easeOut' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* 3D background node animation */}
      <div ref={bgRef} style={{ position: 'absolute', inset: '-20%', willChange: 'transform', zIndex: 1 }}>
        <NeuralCanvas />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(248, 250, 252, 0.45) 75%, var(--bg) 95%)' }} />
      </div>

      <div className="wrap" style={{ zIndex: 10, paddingTop: '7rem', paddingBottom: '3rem' }}>
        <div className="hero-layout-grid" style={{ gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Typographic Hero Text Grid-Aligned */}
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="eyebrow">AI AUTOMATION STUDIO</span>
            </div>
            
            <div ref={titleRef}>
              <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5.2vw, 5.8rem)', color: 'var(--text)', lineHeight: 0.93, marginBottom: '0.4rem' }}>
                INTELLIGENT
              </h1>
              <h1 className="display electric" style={{ fontSize: 'clamp(2.5rem, 5.2vw, 5.8rem)', lineHeight: 0.93, marginBottom: '0.4rem' }}>
                AUTOMATION
              </h1>
              <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5.2vw, 5.8rem)', color: 'var(--text)', lineHeight: 0.93, marginBottom: '1.8rem' }}>
                FOR OPERATIONS.
              </h1>
            </div>

            <div ref={descRef}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)', fontWeight: 300, color: 'var(--t2)', lineHeight: 1.8, maxWidth: '460px', marginBottom: '2.5rem' }}>
                We build intelligent AI workflows that run silently in the background, connecting your systems, reducing human error, and scaling operations on autopilot.
              </p>

              {/* Call to Action Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <a href="#contact" className="btn-primary">
                  Book Free Audit
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Systems Status Live Widgets */}
            <div ref={statsRef} style={{ display: 'flex', alignItems: 'center', gap: '2.2rem', flexWrap: 'wrap' }}>
              {[['980+', 'Automations Running'], ['99.99%', 'System Uptime'], ['45h', 'Saved Monthly']].map(([v, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <div className="dot-live" />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', color: 'var(--t3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>{v}</strong> {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Automation Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AutomationCard />
          </div>

        </div>
      </div>

      {/* Scroll indicator cue & connecting line */}
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.42rem', letterSpacing: '0.3em', color: 'var(--t3)', textTransform: 'uppercase' }}>SCROLL</span>
        <svg width="2" height="120" viewBox="0 0 2 120" fill="none" style={{ overflow: 'visible' }}>
          <path d="M1,0 L1,120" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 3" className="glow-path" />
        </svg>
      </div>
    </section>
  );
}
