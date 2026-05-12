/** --------------------------------------------------------------------------
* Types
* --------------------------------------------------------------------------*/

export type CanvasOptions = {
  EMERGE_DURATION_MS: number;
  CONN_THRESHOLD_RATIO: number; // fraction of cluster radius for connection lines
  CONN_ALPHA_MAX: number;
  WORLD_W: number;
  WORLD_H: number;
  MAX_VIEWPORT_W: number;
  PARALLAX_WS_PER_SCROLL_PX: number;
  PARALLAX_MAX_WS: number;
  SCROLL_LERP: number;
}

export type CanvasPalette = {
  bg: string;
  colors: [number, number, number][];
};

interface Sub { ox: number; oy: number; w: number }

export interface ClusterDef {
  cx: number; cy: number;
  rx: number; ry: number;
  angle: number;
  depth: number;
  n: number;
  subs: Sub[];
  outlierFrac?: number;
}

export interface DotData {
  ox: number;   // normalized cluster-relative offset x  (-1 -> 1)
  oy: number;   // normalized cluster-relative offset y  (-1 -> 1)
  nx: number;   // normalized noise position x           (0 -> 1)
  ny: number;   // normalized noise position y           (0 -> 1)
  alpha: number;
  size: number;
}

/** --------------------------------------------------------------------------
* Config
* --------------------------------------------------------------------------*/

export const options: CanvasOptions = {
  EMERGE_DURATION_MS: 1800,
  CONN_THRESHOLD_RATIO: 0.55,
  CONN_ALPHA_MAX: 0.13,
  // 1920 x 1080 - cluster divisions propto world size. Clusters are distributed 
  // with portrait crops in mind - pushing cy values toward 0.05 and 0.95 so 
  // tall viewports reveal content rather than empty bands.
  WORLD_W: 1280, WORLD_H: 800,
  // Also defines max viewport size for app  
  MAX_VIEWPORT_W: 2200,
  // Parallax applied in world-space
  PARALLAX_WS_PER_SCROLL_PX: 0.06,
  // Hard clamp (in WS px's) - prevents edge clusters drifting out of frame
  PARALLAX_MAX_WS: 80,
  // lower = heavier/cinematic, higher = snappier
  SCROLL_LERP: 0.035
}

export const PALETTES = {
  brandTeal: {
    bg: '#0e1a18',
    colors: [
      [42, 168, 140], [80, 210, 175], [28, 110, 90],
      [65, 180, 148], [38, 155, 128], [90, 195, 160],
      [55, 140, 115], [72, 198, 162], [48, 130, 108], [32, 145, 118],
    ],
  },
  brandTealLight: {
    bg: '#F4F6F5',
    colors: [
      [22, 88, 74],  [35, 110, 92],  [18, 78, 65],
      [42, 120, 100], [28, 95, 80],  [15, 72, 60],
      [38, 105, 88], [25, 82, 68],   [32, 98, 82],  [20, 85, 70],
    ],
  },
  prismatic: {
    bg: '#080a14',
    colors: [
      [78, 208, 178], [148, 88, 230], [58, 152, 235],
      [228, 130, 78], [170, 220, 68], [225, 75, 155],
      [240, 200, 60], [80, 200, 230], [150, 100, 240], [65, 185, 110],
    ],
  },
} satisfies Record<string, CanvasPalette>;

// ---------------------------------------------------------------------------
// Cluster definitions (world space)
// cx/cy         - proportional center (0–1 of world dimensions)
// rx            - major axis radius (proportion of WORLD_W)
// ry            - minor axis radius (proportion of WORLD_H); rx/ry ratio = aspect
// angle         - rotation of major axis in radians (0 = horizontal →)
// depth         - parallax speed multiplier
// n             - dot count
// subs          - sub-centroids in local normalised space ([-1,1] along each axis).
//                 Each dot picks one weighted sub-centroid and scatters tightly
//                 around it, producing multi-lobed / crescent shapes.
// outlierFrac   - fraction of dots that escape as tendrils along the major axis
//
// Layout: top / middle / bottom bands for portrait coverage, clusters designed
// with diverse aspect ratios and angles so no two read as the same shape.
// ---------------------------------------------------------------------------
export const CLUSTERS: ClusterDef[] = [
  // -- Top band ------------------------------------------------------------
  // Diagonal streak, top-left - like a language / syntax cluster
  { cx: 0.15, cy: 0.05, rx: 0.10, ry: 0.025, angle: Math.PI * 0.3,
    depth: 1.6, n: 42,
    subs: [{ ox: -0.4, oy: 0.1, w: 0.55 }, { ox: 0.5, oy: -0.1, w: 0.45 }],
    outlierFrac: 0.14 },

  // Two lobes with a gap, top-centre
  { cx: 0.38, cy: 0.16, rx: 0.065, ry: 0.032, angle: -Math.PI * 1.5,
    depth: 0.5, n: 32,
    subs: [{ ox: -0.55, oy: 0.2, w: 0.5 }, { ox: 0.55, oy: -0.2, w: 0.5 }] },

  // Flat horizontal, top-right
  { cx: 0.725, cy: 0.14, rx: 0.09, ry: 0.040, angle: Math.PI * 0.04,
    depth: 1.3, n: 36,
    subs: [{ ox: 0, oy: 0, w: 1 }],
    outlierFrac: 0.20 },

  // Compact upright blob, far right - isolated cluster
  { cx: 0.90, cy: 0.20, rx: 0.030, ry: 0.060, angle: Math.PI * 0.12,
    depth: 0.4, n: 22,
    subs: [{ ox: 0, oy: -0.3, w: 0.6 }, { ox: 0, oy: 0.4, w: 0.4 }] },

  // -- Middle band ---------------------------------------------------------
  // Three-lobe irregular - semantic cluster with sub-topics
  { cx: 0.15, cy: 0.4, rx: 0.07, ry: 0.15, angle: Math.PI * 0.08,
    depth: 1.8, n: 55,
    subs: [
      { ox:  0.1, oy: -0.45, w: 0.40 },
      { ox: -0.2, oy:  0.25, w: 0.35 },
      { ox:  0.3, oy:  0.30, w: 0.25 },
    ] },

  // Long horizontal split - two nearby populations almost merged
  { cx: 0.50, cy: 0.33, rx: 0.13, ry: 0.056, angle: -Math.PI * 0.1,
    depth: 1.1, n: 50,
    subs: [{ ox: -0.50, oy: 0.1, w: 0.48 }, { ox: 0.48, oy: -0.1, w: 0.52 }],
    outlierFrac: 0.2 },

  // Tilted oval with trailing tendril, right-mid
  { cx: 0.83, cy: 0.40, rx: 0.040, ry: 0.072, angle: Math.PI * 0.28,
    depth: 0.6, n: 40,
    subs: [{ ox: 0, oy: 0, w: 1 }],
    outlierFrac: 0.22 },

  // Crescent / arc shape - two offset lobes at an angle
  { cx: 0.29, cy: 0.63, rx: 0.090, ry: 0.032, angle: -Math.PI * 0.22,
    depth: 1.4, n: 52,
    subs: [{ ox: -0.42, oy: -0.2, w: 0.55 }, { ox: 0.45, oy:  0.2, w: 0.45 }],
    outlierFrac: 0.08 },

  // Vertical two-lobe, centre-right
  { cx: 0.65, cy: 0.64, rx: 0.028, ry: 0.068, angle: Math.PI * 0.10,
    depth: 0.9, n: 44,
    subs: [{ ox: 0.1, oy: -0.40, w: 0.58 }, { ox: -0.1, oy: 0.40, w: 0.42 }] },

  // -- Bottom band ---------------------------------------------------------
  // Diagonal with long tendril, bottom-left
  { cx: 0.11, cy: 0.89, rx: 0.082, ry: 0.022, angle: Math.PI * 0.14,
    depth: 1.2, n: 34,
    subs: [{ ox: 0, oy: 0, w: 1 }],
    outlierFrac: 0.18 },

  // Upright two-lobe, bottom-centre
  { cx: 0.46, cy: 0.92, rx: 0.030, ry: 0.058, angle: -Math.PI * 0.07,
    depth: 0.5, n: 28,
    subs: [{ ox: 0.1, oy: -0.35, w: 0.6 }, { ox: -0.1, oy: 0.38, w: 0.4 }] },

  // Tilted smear with outliers, bottom-right
  { cx: 0.79, cy: 0.90, rx: 0.075, ry: 0.025, angle: Math.PI * 0.22,
    depth: 1.0, n: 32,
    subs: [{ ox: -0.3, oy: 0.1, w: 0.5 }, { ox: 0.4, oy: -0.1, w: 0.5 }],
    outlierFrac: 0.16 },
];

/** --------------------------------------------------------------------------
* Drawing Logic 
* --------------------------------------------------------------------------*/

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

      dots.push({
        ox,
        oy,
        nx: rand(),
        ny: rand(),
        alpha: 0.30 + rand() * 0.70,
        size: 1.0 + rand() * 5.0,
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
): void {
  ctx.clearRect(0, 0, vpW, vpH);

  const { 
    WORLD_W: wrldW, WORLD_H: wrldH, MAX_VIEWPORT_W: maxW, 
    CONN_THRESHOLD_RATIO: conn_th_ratio, CONN_ALPHA_MAX: conn_alpha_max,
    PARALLAX_WS_PER_SCROLL_PX: plx_scroll_pp, PARALLAX_MAX_WS: plx_max_ws,
  } = options;

  const { scale, ox, oy } = computeCoverTransform(vpW, vpH, wrldW, wrldH, maxW);

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  // Background fill - slightly oversized to cover sub-pixel gaps at edges
  ctx.fillStyle = palette.bg;
  ctx.fillRect(-2, -2, wrldW + 4, wrldH + 4);

  // Parallax blends in during the tail of emergence to avoid fighting the
  // scatter→cluster animation
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
    const pos = dots.map(dot => {
      const hx = cX + dot.ox;
      const hy = cY + dot.oy;
      return {
        x: hx + (dot.nx * wrldW - hx) * (1 - emergeT),
        y: hy + (dot.ny * wrldH - hy) * (1 - emergeT),
      };
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