'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import {
  CanvasPalette,
  CanvasOptions,
  DotData,
  options as defaultOptions,
  PALETTES,
  generateDotData,
  easeOutCubic,
  drawFrame,
} from './diffusion-utils';
import { useTheme } from '@/components/navigation/ThemeProvider';


interface CanvasEngineContextValue {
  registerCanvas: (canvas: HTMLCanvasElement) => () => void;
  startEmergence: () => void;
}

const CanvasEngineContext = createContext<CanvasEngineContextValue | null>(null);

export function useCanvasEngine(): CanvasEngineContextValue {
  const ctx = useContext(CanvasEngineContext);
  if (!ctx) throw new Error('useCanvasEngine must be used within CanvasEngineProvider');
  return ctx;
}

export function ParticleCanvasProvider({
  options = defaultOptions,
  children,
}: {
  options?: CanvasOptions;
  children: React.ReactNode;
}) {
  const { theme: activeTheme } = useTheme();

  // Updated synchronously on every render so RAF always reads the current palette.
  const paletteRef = useRef<CanvasPalette>(
    activeTheme === 'dark' ? PALETTES.brandTeal : PALETTES.brandTealLight,
  );
  paletteRef.current = activeTheme === 'dark' ? PALETTES.brandTeal : PALETTES.brandTealLight;

  const dotDataRef = useRef<DotData[][]>(
    generateDotData(42, options.WORLD_W, options.WORLD_H),
  );
  const optionsRef = useRef<CanvasOptions>(options);
  optionsRef.current = options;

  const canvasesRef = useRef<Set<HTMLCanvasElement>>(new Set());
  const vpWRef = useRef(0);
  const vpHRef = useRef(0);
  const driftEnabledRef = useRef(false);

  const animStateRef = useRef({
    phase: 'idle' as 'idle' | 'emerging' | 'settled',
    emergeStartTime: 0,
    scrollY: 0,
    smoothScrollY: 0,
    rafId: 0,
    lastTs: 0,
  });

  // Sizes (or re-sizes) one canvas to current viewport dimensions.
  // Reads vpWRef/vpHRef at call time - safe with empty useCallback deps.
  const sizeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio ?? 1;
    const vpW = vpWRef.current;
    const vpH = vpHRef.current;
    canvas.width = vpW * dpr;
    canvas.height = vpH * dpr;
    canvas.style.width = `${vpW}px`;
    canvas.style.height = `${vpH}px`;
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []); // vpWRef/vpHRef are stable refs - no deps needed

  // Called by canvas components on mount. Returns an unregister cleanup.
  const registerCanvas = useCallback(
    (canvas: HTMLCanvasElement): (() => void) => {
      // Guard: children's useEffects run before the provider's, so vpW/vpH
      // may not be set yet. Seed them from window if needed.
      if (!vpWRef.current) {
        vpWRef.current = window.innerWidth;
        vpHRef.current = window.innerHeight;
      }
      sizeCanvas(canvas);

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawFrame(
            ctx,
            vpWRef.current, vpHRef.current,
            dotDataRef.current, paletteRef.current, optionsRef.current,
            1, 0, 0,
            false,
          );
        }
        return () => {};
      }

      canvasesRef.current.add(canvas);
      return () => {
        canvasesRef.current.delete(canvas);
      };
    },
    [sizeCanvas],
  );

  // Called by BackgroundCanvas's IntersectionObserver; idempotent (checks phase).
  const startEmergence = useCallback(() => {
    const s = animStateRef.current;
    if (s.phase === 'idle') {
      s.emergeStartTime = performance.now();
      s.phase = 'emerging';
    }
  }, []);

  useEffect(() => {
    vpWRef.current = window.innerWidth;
    vpHRef.current = window.innerHeight;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const state = animStateRef.current;

    driftEnabledRef.current =
      typeof window !== 'undefined' &&
      (navigator.hardwareConcurrency ?? 2) >= 4 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const tick = (ts: DOMHighResTimeStamp) => {
      const opts = optionsRef.current;

      let emergeT = 0;
      if (state.phase === 'emerging') {
        const raw = Math.min((ts - state.emergeStartTime) / opts.EMERGE_DURATION_MS, 1);
        emergeT = easeOutCubic(raw);
        if (raw >= 1) {
          emergeT = 1;
          state.phase = 'settled';
        }
      } else if (state.phase === 'settled') {
        emergeT = 1;
      }

      // Frame-rate-independent exponential lerp for scroll parallax.
      const deltaMs = state.lastTs > 0 ? ts - state.lastTs : 16.667;
      state.lastTs = ts;
      const lerpAlpha = 1 - Math.pow(1 - opts.SCROLL_LERP, deltaMs / 16.667);
      state.smoothScrollY += (state.scrollY - state.smoothScrollY) * lerpAlpha;

      canvasesRef.current.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawFrame(
            ctx,
            vpWRef.current, vpHRef.current,
            dotDataRef.current, paletteRef.current, opts,
            emergeT, state.smoothScrollY, ts,
            driftEnabledRef.current,
          );
        }
      });

      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);

    const onAppScroll = (e: Event) => {
      state.scrollY = (e as CustomEvent<{ scrollTop: number }>).detail.scrollTop;
    };
    window.addEventListener('app-scroll', onAppScroll);

    const onResize = () => {
      vpWRef.current = window.innerWidth;
      vpHRef.current = window.innerHeight;
      canvasesRef.current.forEach(sizeCanvas);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('app-scroll', onAppScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [sizeCanvas]);

  const value = useMemo(
    () => ({ registerCanvas, startEmergence }),
    [registerCanvas, startEmergence],
  );

  return (
    <CanvasEngineContext.Provider value={value}>
      {children}
    </CanvasEngineContext.Provider>
  );
}
