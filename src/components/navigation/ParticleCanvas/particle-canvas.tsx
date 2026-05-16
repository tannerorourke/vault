'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
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

// ---------------------------------------------------------------------------
// ParticleCanvasBackdrop - rendered within motion.div (ContentTransitionProvider)
//    - Required so that backdrop-filter: blur() has dots to sample (e.g, blurred cards)
//    - NO fades, NO sentinel, NO children.
// ---------------------------------------------------------------------------
export function ParticleCanvasBackdrop(
  { outT, inD, inT }:
  { outT: number, inD: number, inT: number }
) {
  const { registerCanvas } = useCanvasEngine();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return registerCanvas(canvas);
  }, [registerCanvas]);

  // return <canvas ref={canvasRef} className={sty.backdropCanvas} aria-hidden="true" />;
  return (
    <motion.canvas
      ref={canvasRef}
      className={sty.backdropCanvas}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      // outgoing backdrop on page switch
      exit={{ opacity: 0, transition: { duration: outT } }}
      // incoming backdrop
      animate={{ opacity: 1, transition: { delay: inD, duration: inT }}}
    />
  );
}
