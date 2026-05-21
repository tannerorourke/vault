'use client';

import { useEffect, useRef } from 'react';
import { useCanvasEngine } from './particle-engine-provider';

import * as sty from './particle-canvas.css';


// ---------------------------------------------------------------------------
// ParticleCanvasWallpaper - rendered in shell/layout.tsx, outside .content.
//    - page's wallpaper, canvas visible in empty regions of the page
// ---------------------------------------------------------------------------
export function ParticleCanvasWallpaper({ children }: { children?: React.ReactNode }) {
  const { registerCanvas, startEmergence } = useCanvasEngine();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const unregister = registerCanvas(canvas);
    startEmergence();

    return () => unregister();
  }, [registerCanvas, startEmergence]);

  return (
    <>
      {/* Fixed canvas, always covers 100vw x 100vh, never scrolls */}
      <canvas ref={canvasRef} className={sty.canvas} aria-hidden="true" />

      {/* Overlay gradients, above the canvas */}
      <div className={sty.fadeBottom} aria-hidden="true" />
      <div className={sty.fadeVignette} aria-hidden="true" />

      {children && <div className={sty.content}>{children}</div>}
    </>
  );
}
