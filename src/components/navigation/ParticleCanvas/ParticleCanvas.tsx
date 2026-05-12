'use client';

import { useEffect, useRef } from 'react';
import * as sty from './ParticleCanvas.css';
import { useCanvasEngine } from './ParticleEngineProvider';

// ---------------------------------------------------------------------------
// ParticleCanvasWallpaper - rendered in shell/layout.tsx, outside .content. 
//    - page's wallpaper, canvas visible in empty regions of the page
// ---------------------------------------------------------------------------
export function ParticleCanvasWallpaper({ children }: { children?: React.ReactNode }) {
  const { registerCanvas, startEmergence } = useCanvasEngine();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sentinel = sentinelRef.current;
    if (!canvas) return;

    const unregister = registerCanvas(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startEmergence();
      },
      { threshold: 0.05 },
    );
    if (sentinel) io.observe(sentinel);

    return () => {
      unregister();
      io.disconnect();
    };
  }, [registerCanvas, startEmergence]);

  return (
    <>
      {/* Fixed canvas, always covers 100vw x 100vh, never scrolls */}
      <canvas ref={canvasRef} className={sty.canvas} aria-hidden="true" />

      {/* Overlay gradients, above the canvas */}
      <div className={sty.fadeBottom} aria-hidden="true" />
      <div className={sty.fadeVignette} aria-hidden="true" />

      {/* Sentinel triggers emergence; content slot for hero text etc. */}
      <div ref={sentinelRef} className={sty.sentinel} style={{ height: '100vh' }}>
        <div className={sty.content}>{children}</div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// ParticleCanvasBackdrop - rendered within motion.div (ContentTransitionProvider)
//    - Required so that backdrop-filter: blur() has dots to sample (e.g, blurred cards)
//    - NO fades, NO sentinel, NO children.
// ---------------------------------------------------------------------------
export function ParticleCanvasBackdrop() {
  const { registerCanvas } = useCanvasEngine();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return registerCanvas(canvas);
  }, [registerCanvas]);

  return <canvas ref={canvasRef} className={sty.backdropCanvas} aria-hidden="true" />;
}
