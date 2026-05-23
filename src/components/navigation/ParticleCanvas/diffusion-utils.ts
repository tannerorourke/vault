import { CanvasOptions, CanvasPalette, CLUSTERS, DotData, options } from './config';

// congruential generator, keep dot layout identical across renders and devices
function seededRand(seed: number = 42) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------------------------------------------------------------------------
// For each cluster:
//  1. Pick a sub-centroid (weighted)
//  2. Sample around it in local (major, minor) axis space
//  3. Rotate by cluster.angle into world-axis space
//  4. Scale by (rx x WORLD_W, ryxWORLD_H) to get world-space px offsets
//  5. Outlier dots escape far along the major axis with a tight minor spread
// ---------------------------------------------------------------------------
export function generateDotData(seed = 42, world_w: number, world_h: number): DotData[][] {
  const rand = seededRand(seed);

  return CLUSTERS.map(c => {
    const cos = Math.cos(c.angle);
    const sin = Math.sin(c.angle);
    const majorPx = c.rx * world_w;
    const minorPx = c.ry * world_h;

    // --- Normalise sub-centroid weights to sum = 1
    const totalW = c.subs.reduce((s, sub) => s + sub.w, 0);
    const subs = c.subs.map(sub => ({ ...sub, w: sub.w / totalW }));

    const dots: DotData[] = [];

    for (let k = 0; k < c.n; k++) {
      // --- Pick centroid
      const roll = rand();
      let cumW = 0;
      let sub = subs[subs.length - 1];
      for (const s of subs) {
        cumW += s.w;
        if (roll < cumW) { sub = s; break; }
      }

      // --- Sample in local (major, minor) space
      let localMajor: number;
      let localMinor: number;

      const isOutlier = (c.outlierFrac ?? 0) > 0 && rand() < (c.outlierFrac ?? 0);

      if (isOutlier) {
        // Tendrils escaping along major axis, very tight on minor axis
        const sign = rand() > 0.5 ? 1 : -1;
        localMajor = sub.ox + sign * (0.85 + rand() * 0.55);
        localMinor = sub.oy + (rand() * 2 - 1) * 0.12;
      } else {
        // Dense core w/tighter power law than before (1.8 vs 0.55 old)
        const a = rand() * Math.PI * 2;
        const d = Math.pow(rand(), 1.8);
        localMajor = sub.ox + Math.cos(a) * d * (1 - Math.abs(sub.ox) * 0.25);
        localMinor = sub.oy + Math.sin(a) * d * (1 - Math.abs(sub.oy) * 0.25);
      }

      // --- Rotate into world-axis space -> scale to world-space px
      // note: major axis aligns with cluster.angle; minor axis is perpendicular
      const ox = (localMajor * cos - localMinor * sin) * majorPx;
      const oy = (localMajor * sin + localMinor * cos) * minorPx;

      const nx = rand();
      const ny = rand();
      const alpha = 0.30 + rand() * 0.70;
      const size = 1.0 + rand() * 5.0;
      const perDotOffset = rand() * (Math.PI / 2) - Math.PI / 4;
      const driftDir = c.driftAngle + perDotOffset;
      const driftPhase = rand() * Math.PI * 2;

      dots.push({
        ox,
        oy,
        nx,
        ny,
        alpha,
        size,
        driftCosDir: Math.cos(driftDir),
        driftSinDir: Math.sin(driftDir),
        driftPhase,
      });
    }

    return dots;
  });
}

// ---------------------------------------------------------------------------
// Cover transform
//
// Returns the scale and canvas-space origin (ox, oy) such that the world
// fills the viewport with cover semantics - same scale on both axes,
// cropping the narrower axis symmetrically.
// ---------------------------------------------------------------------------
export function computeCoverTransform(
  vpW: number,
  vpH: number,
  wrldW: number,
  wrldH: number,
  maxW: number = options.MAX_VIEWPORT_W,
): { scale: number; ox: number; oy: number } {
  const cappedW = Math.min(vpW, maxW);
  const scale = Math.max(cappedW / wrldW, vpH / wrldH);
  return {
    scale,
    // ox: (vpW - wrldW * scale) / 2,
    // oy: (vpH - wrldH * scale) / 2,
    ox: (vpW - wrldW * scale) / 6,
    oy: (vpH - wrldH * scale) / 6,
    // ox: 0,
    // oy: 0,
  };
}

// Easing
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ---------------------------------------------------------------------------
// drawFrame
// ---------------------------------------------------------------------------
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  vpW: number, vpH: number, // vpW/vpH  - canvas CSS dimensions (post dpr scaling handled by caller)
  dotData: DotData[][],
  palette: CanvasPalette,
  options: CanvasOptions,
  emergeT: number,          // emergeT  - 0 = noise scatter, 1 = settled. Must be ALREADY EASED.
  scrollY: number,          // scrollY  - raw window.scrollY at call time
  tMs: number,              // current RAF timestamp in ms, for drift animation
  driftEnabled: boolean,    // false on low-end devices / reduced-motion
): void {
  ctx.clearRect(0, 0, vpW, vpH);

  const {
    WORLD_W: wrldW, WORLD_H: wrldH, MAX_VIEWPORT_W: maxW,
    CONN_THRESHOLD_RATIO: conn_th_ratio, CONN_ALPHA_MAX: conn_alpha_max,
    PARALLAX_WS_PER_SCROLL_PX: plx_scroll_pp, PARALLAX_MAX_WS: plx_max_ws,
    DRIFT_AMP_PX: driftAmp,
  } = options;

  const { scale, ox, oy } = computeCoverTransform(vpW, vpH, wrldW, wrldH, maxW);

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  // Background fill - slightly oversized to cover sub-pixel gaps at edges
  ctx.fillStyle = palette.bg;
  ctx.fillRect(-2, -2, wrldW + 4, wrldH + 4);

  // Parallax blends in during the tail of emergence to avoid fighting the
  // scatter->cluster animation
  const parallaxBlend = Math.max(0, Math.min(1, (emergeT - 0.75) / 0.25));

  CLUSTERS.forEach((c, ci) => {
    const [r, g, b] = palette.colors[ci % palette.colors.length];

    const rawOffset = scrollY * c.depth * plx_scroll_pp;
    const parallaxY = Math.max(-plx_max_ws, Math.min(plx_max_ws, rawOffset)) * parallaxBlend;

    const cX = c.cx * wrldW;
    const cY = c.cy * wrldH + parallaxY;
    const dots = dotData[ci];

    // Connection threshold: geometric mean of the two axes so elongated clusters
    // don't produce lines that span the full major axis length
    const threshold = Math.sqrt(c.rx * wrldW * c.ry * wrldH) * conn_th_ratio;

    // ox/oy are world-space px offsets - resolve directly, no axis scaling needed
    const driftOmega = driftEnabled ? (2 * Math.PI) / c.driftPeriodMs : 0;

    // dot position
    const pos = dots.map(dot => {
      // base dot position
      let hx = cX + dot.ox;
      let hy = cY + dot.oy;
      // apply initial drift to dot positions to avoid shift
      if (driftEnabled) {
        const s = Math.sin(driftOmega * tMs + dot.driftPhase);
        hx += driftAmp * dot.driftCosDir * s;
        hy += driftAmp * dot.driftSinDir * s;
      }
      let x = hx + (dot.nx * wrldW - hx) * (1 - emergeT);
      let y = hy + (dot.ny * wrldH - hy) * (1 - emergeT);
      return { x, y };
    });

    // Connection lines - fade in quadratically so they're invisible during scatter
    const connAlpha = emergeT * emergeT * conn_alpha_max;
    if (connAlpha > 0.004) {
      ctx.lineWidth = 0.7;
      for (let a = 0; a < pos.length; a++) {
        for (let b = a + 1; b < pos.length; b++) {
          const dx = pos[a].x - pos[b].x;
          const dy = pos[a].y - pos[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            ctx.beginPath();
            ctx.moveTo(pos[a].x, pos[a].y);
            ctx.lineTo(pos[b].x, pos[b].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${((1 - dist / threshold) * connAlpha).toFixed(3)})`;
            ctx.stroke();
          }
        }
      }
    }

    dots.forEach((dot, di) => {
      ctx.beginPath();
      ctx.arc(pos[di].x, pos[di].y, dot.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${(dot.alpha * emergeT).toFixed(2)})`;
      ctx.fill();
    });
  });

  ctx.restore();
}