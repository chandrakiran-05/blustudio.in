'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MATRIX_CHARS = ['.', ':', '-', '+', '/', '=', 'x', 'o', '0', '1', 'B', 'L', 'U', '#', '%', '@'];

export default function IntroCanvas({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading', 'ready', 'exiting'
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // 1. Progress Loader logic (Cyber Stutter)
    let currentProgress = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 8) + 1;
      currentProgress = Math.min(100, currentProgress + step);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setPhase('ready');
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 2. Monospace Canvas Grid Background
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Grid size setup
    const cellWidth = 14;
    const cellHeight = 24;
    const cols = Math.ceil(width / cellWidth);
    const rows = Math.ceil(height / cellHeight);

    let frame = 0;

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.font = "700 11px 'Space Mono', monospace";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellWidth + cellWidth / 2;
          const y = r * cellHeight + cellHeight / 2;

          // Distance to mouse
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const isNearMouse = distance < 100;

          // Glitch / wave calculations
          let charIndex = Math.floor(
            (Math.sin(c * 0.15 + frame * 0.05) * 0.5 + 0.5) * MATRIX_CHARS.length
          );

          // If near cursor, characters morph and react rapidly
          if (isNearMouse) {
            charIndex = Math.floor(Math.random() * MATRIX_CHARS.length);
          }

          // Cyber Sky Blue color scales with noise/interaction
          let alpha = 0.06;
          if (isNearMouse) {
            alpha = (100 - distance) / 100 * 0.45 + 0.08;
          } else {
            alpha = Math.max(0.04, Math.sin(c * 0.05 + r * 0.08 + frame * 0.03) * 0.08 + 0.06);
          }

          ctx.fillStyle = isNearMouse ? `rgba(56, 189, 248, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
          ctx.fillText(MATRIX_CHARS[charIndex], x, y);
        }
      }

      // Draw horizontal scanning wires in background
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const wireY = (frame * 1.5) % height;
      ctx.moveTo(0, wireY);
      ctx.lineTo(width, wireY);
      ctx.stroke();

      frame++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleEnter = () => {
    if (phase !== 'ready') return;
    setPhase('exiting');
    // Delay to let shutters slide open before unmounting
    setTimeout(() => {
      onComplete?.();
    }, 1100);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#000', overflow: 'hidden' }}>
      {/* 1. Character Matrix Background */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} />

      {/* 2. Interactive Terminal UI */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Mono', monospace", pointerEvents: phase === 'ready' ? 'auto' : 'none'
      }}>
        {/* Terminal frame decoration */}
        <div style={{
          padding: '2.5rem 3.5rem',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          background: 'rgba(0, 0, 0, 0.85)',
          borderRadius: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.05)',
          minWidth: '320px',
          transition: 'all 0.4s'
        }}>
          {/* Status dots */}
          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F87171' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FBBF24' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', animation: phase === 'loading' ? 'blink 1s step-end infinite' : 'none' }} />
          </div>

          <div style={{ fontSize: '0.62rem', letterSpacing: '0.28em', color: 'rgba(56, 189, 248, 0.55)', marginBottom: '0.85rem' }}>
            BLU_AGENCY // NET_INITIALIZE
          </div>

          {phase === 'loading' ? (
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                LOADING_SYSTEM
              </div>
              <div style={{ width: '100%', height: '2px', background: 'rgba(56, 189, 248, 0.12)', borderRadius: '2px', overflow: 'hidden', position: 'relative', marginBottom: '0.75rem' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.12em' }}>
                [{progress.toString().padStart(3, '0')}%]
              </div>
            </div>
          ) : (
            <button
              onClick={handleEnter}
              className="enter-btn"
              style={{
                background: 'transparent',
                border: '1px solid var(--accent)',
                padding: '0.85rem 1.75rem',
                color: '#FFFFFF',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                cursor: 'pointer',
                borderRadius: '6px',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)',
                transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.15)';
              }}
            >
              ACCESS SYSTEM
            </button>
          )}
        </div>
      </div>

      {/* 3. Horizontal Split Shutter Panels */}
      <AnimatePresence>
        {phase === 'exiting' && (
          <>
            {/* Top half Shutter */}
            <motion.div
              initial={{ y: '0%' }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.95, ease: [0.77, 0, 0.175, 1] }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50vh',
                background: '#000000', borderBottom: '1px solid var(--accent)',
                zIndex: 99998, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
              }}
            >
              <div style={{ display: 'none' }} />
            </motion.div>

            {/* Bottom half Shutter */}
            <motion.div
              initial={{ y: '0%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 0.95, ease: [0.77, 0, 0.175, 1] }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50vh',
                background: '#000000', borderTop: '1px solid var(--accent)',
                zIndex: 99998, display: 'flex', alignItems: 'flex-start', justifyContent: 'center'
              }}
            >
              <div style={{ display: 'none' }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
