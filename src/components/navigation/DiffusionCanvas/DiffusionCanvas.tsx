'use client';

// ---------------------------------------------------------------------------
// Diffusive animated canvas. Animations:
//   1. Emergence - dots animate from random scatter -> clusters on first
//                  viewport entry (IntersectionObserver, runs once).
//   2. Parallax - each cluster drifts vertically at its own depth-scaled
//                 speed while scrolling (50 ms throttle, then RAF flush).
// ---------------------------------------------------------------------------
import { useEffect, useRef } from 'react';
import * as sty from './diffusion-canvas.css';
import {
  CanvasPalette, CanvasOptions, DotData,
  options as defaultOptions,
  PALETTES,
  generateDotData,
  easeOutCubic,
  drawFrame
} from 'src/lib/utils/diffusion-utils';
import { useTheme } from '@/components/navigation/ThemeProvider';

interface Props {
  palette?: CanvasPalette;
  options?: CanvasOptions;
  children?: React.ReactNode;
}

export function DiffusionCanvas({
  palette,
  options = defaultOptions,
  children
}: Props) {
  const { theme: activeTheme } = useTheme();
  const resolvedPalette = palette ?? (activeTheme === 'dark' ? PALETTES.brandTeal : PALETTES.brandTealLight);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sentinel = sentinelRef.current;
    if (!canvas) return;

    // Canvas init
    let vpW = 0;
    let vpH = 0;

    const initCanvas = () => {
      const dpr = window.devicePixelRatio ?? 1;
      vpW = window.innerWidth;
      vpH = window.innerHeight;
      canvas.width = vpW * dpr;
      canvas.height = vpH * dpr;
      canvas.style.width = `${vpW}px`;
      canvas.style.height = `${vpH}px`;
      const ctx = canvas.getContext('2d');
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    initCanvas();

    const dotData: DotData[][] = generateDotData(42, options.WORLD_W, options.WORLD_H);

    // -------------------------------------------------------------------------
    // Mutable animation state - in a ref-like object to avoid closure staleness
    // -------------------------------------------------------------------------
    const state = {
      phase: 'idle' as 'idle' | 'emerging' | 'settled',
      emergeStartTime: 0,
      scrollY: 0,
      rafId: 0,
      lastScrollMs: 0,
    };

    // -------------------------------------------------------------------------
    // Accessibility
    // -------------------------------------------------------------------------
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      const ctx = canvas.getContext('2d');
      if (ctx) drawFrame(ctx, vpW, vpH, dotData, resolvedPalette, options, 1, 0);
      return;
    }

    // -------------------------------------------------------------------------
    // draw loop
    // -------------------------------------------------------------------------
    const tick = (ts: DOMHighResTimeStamp) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) { 
        state.rafId = requestAnimationFrame(tick); return; 
      }

      let emergeT = 0;
      if (state.phase === 'emerging') {
        const raw = Math.min((ts - state.emergeStartTime) / options.EMERGE_DURATION_MS, 1);
        emergeT = easeOutCubic(raw);
        if (raw >= 1) {
          emergeT = 1;
          state.phase = 'settled';
        }
      } else if (state.phase === 'settled') {
        emergeT = 1;
      }

      drawFrame(ctx, vpW, vpH, dotData, resolvedPalette, options, emergeT, state.scrollY);
      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);

    // -------------------------------------------------------------------------
    // IntersectionObserver triggers emergence once on first viewport entry
    // -------------------------------------------------------------------------
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state.phase === 'idle') {
          state.emergeStartTime = performance.now();
          state.phase = 'emerging';
        }
      },
      { threshold: 0.05 },
    );
    if (sentinel) io.observe(sentinel);

    // -------------------------------------------------------------------------
    // listen for custom event dispatched by ContentTransitionProvider
    // since the window doesn't scroll (the content div does)
    // -------------------------------------------------------------------------
    const onAppScroll = (e: Event) => {
      state.scrollY = (e as CustomEvent<{ scrollTop: number }>).detail.scrollTop;
    };
    window.addEventListener('app-scroll', onAppScroll);

    // -------------------------------------------------------------------------
    // reinit canvas dimensions; cover transform recomputes each frame
    // so no redraw is needed here beyond updating vpW/vpH
    // -------------------------------------------------------------------------
    const onResize = () => initCanvas();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(state.rafId);
      io.disconnect();
      window.removeEventListener('app-scroll', onAppScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [resolvedPalette]);

  return (
    <>
      {/* Fixed canvas - always covers 100vw x 100vh, never scrolls */}
      <canvas ref={canvasRef} className={sty.canvas} aria-hidden="true" />

      {/* Overlay gradients - also fixed, sit just above canvas */}
      <div className={sty.fadeBottom} aria-hidden="true" />
      <div className={sty.fadeVignette} aria-hidden="true" />

      {/* Sentinel + content - in normal document flow */}
      <div ref={sentinelRef} className={sty.sentinel} style={{ height: "100vh" }}>
        <div className={sty.content}>{children}</div>
      </div>
    </>
  );
}
