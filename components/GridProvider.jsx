'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const GridContext = createContext({ cols: 120, rows: 60, ch: 8, line: 16 });

export function GridProvider({ children }) {
  const [gridState, setGridState] = useState({ cols: 120, rows: 60, ch: 8, line: 16 });

  useEffect(() => {
    // Helper to calculate grid dimensions
    const calculateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Create a temporary span to measure font character metrics
      const span = document.createElement('span');
      span.style.fontFamily = "var(--mono), 'Space Mono', monospace";
      span.style.fontSize = "var(--font-size, 13px)";
      span.style.letterSpacing = "var(--letter-spacing, 0.5px)";
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.textContent = 'M';
      document.body.appendChild(span);

      const chWidth = span.getBoundingClientRect().width || 8;
      // line-height is typically 2x the character width or font size
      const chHeight = span.getBoundingClientRect().height || 16;
      document.body.removeChild(span);

      // Aino style calculations
      const isMobile = width < 768;
      let ch = isMobile ? 8.2 : 7.6;
      let cols = Math.round(width / ch);
      let rows = Math.floor(height / (ch * 2));

      // Calculate CSS variable overrides
      let fontSpacing = 0.6 * (ch / 0.6 - (ch / 0.6 - 1));
      let fontSize = ch / 0.6 - 1;
      let lineHeight = ch * 2;

      // Update root CSS variables
      const root = document.documentElement;
      root.style.setProperty('--ch', `${ch}px`);
      root.style.setProperty('--cols', `${cols}`);
      root.style.setProperty('--rows', `${rows}`);
      root.style.setProperty('--line', `${lineHeight}px`);
      root.style.setProperty('--letter-spacing', `${fontSpacing}px`);
      root.style.setProperty('--font-size', `${fontSize}px`);
      root.style.setProperty('--line-height', `${lineHeight}px`);

      setGridState({ cols, rows, ch, line: lineHeight });
    };

    calculateGrid();

    const resizeEvent = 'ontouchstart' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvent, calculateGrid);
    return () => window.removeEventListener(resizeEvent, calculateGrid);
  }, []);

  return (
    <GridContext.Provider value={gridState}>
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  return useContext(GridContext);
}
