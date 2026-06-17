'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered slide reveal
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -40, rotateY: -6 },
        {
          opacity: 1, x: 0, rotateY: 0, duration: 1, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true }
        }
      );

      gsap.fromTo(rightColRef.current,
        { opacity: 0, x: 40, rotateY: 6 },
        {
          opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Valid email required';
    }
    if (!form.message.trim() || form.message.length < 8) {
      e.message = 'Please specify operational bottleneck';
    }
    return e;
  };

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    await new Promise(resolve => setTimeout(resolve, 1400));
    setStatus('success');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    border: `1px solid ${errors[field] ? 'rgba(248, 113, 113, 0.45)' : 'var(--border)'}`,
    borderRadius: '8px',
    padding: '0.85rem 1.25rem',
    color: 'var(--text)',
    fontFamily: 'var(--body)',
    fontSize: '0.86rem',
    fontWeight: 300,
    outline: 'none',
    boxShadow: errors[field] ? '0 0 10px rgba(248, 113, 113, 0.05)' : 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s'
  });

  const labelStyle = {
    fontFamily: 'var(--mono)',
    fontSize: '0.52rem',
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: 'var(--t3)',
    display: 'block',
    marginBottom: '0.55rem'
  };

  return (
    <section ref={containerRef} id="contact" className="sec" style={{ background: 'transparent', position: 'relative' }}>
      {/* Background radial overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 82, 255, 0.035) 0%, transparent 70%)',
        zIndex: 1
      }} />

      <div className="wrap" style={{ zIndex: 2 }}>
        <div className="contact-layout-grid" style={{ gap: '5rem', alignItems: 'start' }}>
          
          {/* Left Column info */}
          <div ref={leftColRef}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="eyebrow">DIAGNOSTIC PORTAL</span>
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.8rem)', color: 'var(--text)', lineHeight: 0.95, marginBottom: '1.5rem' }}>
              Free 30-min<br /><span className="electric">automation</span><br />system audit.
            </h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: '0.9rem', fontWeight: 300, color: 'var(--t2)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '400px' }}>
              Let's map out your systems, isolate manual bottlenecks, and detail a custom automation architecture. You retain the design blueprint regardless.
            </p>

            {/* Benefit Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {['Zero cost, zero commitment required', 'High-impact solutions proposed on the call', 'Custom workflow diagrams sent to you'].map((benefit, idx) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    border: '1px solid rgba(0, 82, 255, 0.25)',
                    background: 'rgba(0, 82, 255, 0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2.5 2.5 4-4" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontFamily: 'var(--body)', fontSize: '0.84rem', color: 'var(--t2)' }}>
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Direct Booking */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center', borderRadius: '10px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                Book Audit on Calendly
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0, 82, 255, 0.08)' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.46rem', letterSpacing: '0.2em', color: 'var(--t4)' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(0, 82, 255, 0.08)' }} />
              </div>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ justifyContent: 'center', borderRadius: '10px' }}>
                Message on WhatsApp
              </a>
            </div>

            {/* Footer Connect details */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0, 82, 255, 0.1)', display: 'flex', gap: '3rem' }}>
              {[{ title: 'DIRECT_SECURE_MAIL', value: 'hello@bluagency.io' }, { title: 'RESPONSE_SLA', value: 'Within 24 Hours' }].map(({ title, value }) => (
                <div key={title}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '0.3rem' }}>
                    {title}
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '0.84rem', fontWeight: 500, color: 'var(--t2)' }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column Form (interactive 3D terminal style) */}
          <div ref={rightColRef}>
            <motion.div
              whileHover={{ rotateY: -1, rotateX: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              className="glass-panel"
              style={{
                border: '1px solid var(--border)',
                padding: '2.5rem',
                boxShadow: '0 15px 35px rgba(14, 165, 233, 0.08), 0 0 0 1px var(--border) inset',
                position: 'relative',
                overflow: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
              
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 0' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                    border: '1px solid var(--accent)',
                    background: 'rgba(14, 165, 233, 0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 20px var(--accent-glow)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.65rem' }}>
                    TRANSMISSION COMPLETE
                  </h3>
                  <p style={{ fontFamily: 'var(--body)', fontSize: '0.84rem', color: 'var(--t2)', lineHeight: 1.7 }}>
                    System diagnostic request received. We will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.2rem', opacity: 0.7 }}>
                    SECURE_INPUT // TRANSIT_QUERY
                  </div>

                  {/* Fields */}
                  {[
                    ['name', 'Full Name', 'text', 'John Doe'],
                    ['email', 'Email Address', 'email', 'john@company.io'],
                    ['company', 'Company Name (Optional)', 'text', 'Enterprise Inc.']
                  ].map(([name, label, type, ph]) => (
                    <div key={name}>
                      <label htmlFor={`f-${name}`} style={labelStyle}>{label}</label>
                      <input
                        id={`f-${name}`}
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={ph}
                        style={inputStyle(name)}
                        onFocus={e => {
                          e.target.style.borderColor = 'rgba(0, 82, 255, 0.35)';
                          e.target.style.background = 'rgba(0, 82, 255, 0.05)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = errors[name] ? 'rgba(248, 113, 113, 0.45)' : 'rgba(0, 82, 255, 0.12)';
                          e.target.style.background = 'rgba(0, 82, 255, 0.03)';
                        }}
                      />
                      {errors[name] && (
                        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', color: '#F87171', marginTop: '0.35rem' }}>
                          [!] {errors[name]}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Message Field */}
                  <div>
                    <label htmlFor="f-message" style={labelStyle}>Specify Bottleneck / Manual Tasks</label>
                    <textarea
                      id="f-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="List the repetitive workflows you want to automate..."
                      style={{ ...inputStyle('message'), resize: 'none' }}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(0, 82, 255, 0.35)';
                        e.target.style.background = 'rgba(0, 82, 255, 0.05)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = errors.message ? 'rgba(248, 113, 113, 0.45)' : 'rgba(0, 82, 255, 0.12)';
                        e.target.style.background = 'rgba(0, 82, 255, 0.03)';
                      }}
                    />
                    {errors.message && (
                      <p style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', color: '#F87171', marginTop: '0.35rem' }}>
                        [!] {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      opacity: status === 'sending' ? 0.75 : 1,
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT DIAGNOSTIC QUERY'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
