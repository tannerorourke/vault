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
  DRIFT_AMP_PX: number;
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
  driftAngle: number;
  driftPeriodMs: number;
}

export interface DotData {
  ox: number;   // normalized cluster-relative offset x  (-1 -> 1)
  oy: number;   // normalized cluster-relative offset y  (-1 -> 1)
  nx: number;   // normalized noise position x           (0 -> 1)
  ny: number;   // normalized noise position y           (0 -> 1)
  alpha: number;
  size: number;
  driftCosDir: number;
  driftSinDir: number;
  driftPhase: number;
}

/** --------------------------------------------------------------------------
* Config
* --------------------------------------------------------------------------*/

// When true, wallpaper renders only theme background color; 
// no canvas element, no RAF loop, no overlays.
export const CANVAS_DISABLED = true;

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
  PARALLAX_MAX_WS: 120,
  // lower = heavier/cinematic, higher = snappier
  SCROLL_LERP: 0.045,
  DRIFT_AMP_PX: 2.8,
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
// cx/cy         - proportional center (0-1 of world dimensions)
// rx            - major axis radius (proportion of WORLD_W)
// ry            - minor axis radius (proportion of WORLD_H); rx/ry ratio = aspect
// angle         - rotation of major axis in radians (0 = horizontal ->)
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
    outlierFrac: 0.14, driftAngle: 0.52, driftPeriodMs: 10800 },

  // Two lobes with a gap, top-centre
  { cx: 0.38, cy: 0.16, rx: 0.065, ry: 0.032, angle: -Math.PI * 1.5,
    depth: 0.5, n: 32,
    subs: [{ ox: -0.55, oy: 0.2, w: 0.5 }, { ox: 0.55, oy: -0.2, w: 0.5 }],
    driftAngle: 1.87, driftPeriodMs: 9200 },

  // Flat horizontal, top-right
  { cx: 0.725, cy: 0.14, rx: 0.09, ry: 0.040, angle: Math.PI * 0.04,
    depth: 1.3, n: 36,
    subs: [{ ox: 0, oy: 0, w: 1 }],
    outlierFrac: 0.20, driftAngle: 3.14, driftPeriodMs: 12500 },

  // Compact upright blob, far right - isolated cluster
  { cx: 0.90, cy: 0.20, rx: 0.030, ry: 0.060, angle: Math.PI * 0.12,
    depth: 0.4, n: 22,
    subs: [{ ox: 0, oy: -0.3, w: 0.6 }, { ox: 0, oy: 0.4, w: 0.4 }],
    driftAngle: 0.94, driftPeriodMs: 8700 },

  // -- Middle band ---------------------------------------------------------
  // Three-lobe irregular - semantic cluster with sub-topics
  { cx: 0.15, cy: 0.4, rx: 0.07, ry: 0.15, angle: Math.PI * 0.08,
    depth: 1.8, n: 55,
    subs: [
      { ox:  0.1, oy: -0.45, w: 0.40 },
      { ox: -0.2, oy:  0.25, w: 0.35 },
      { ox:  0.3, oy:  0.30, w: 0.25 },
    ], driftAngle: 4.71, driftPeriodMs: 13200 },

  // Long horizontal split - two nearby populations almost merged
  { cx: 0.50, cy: 0.33, rx: 0.13, ry: 0.056, angle: -Math.PI * 0.1,
    depth: 1.1, n: 50,
    subs: [{ ox: -0.50, oy: 0.1, w: 0.48 }, { ox: 0.48, oy: -0.1, w: 0.52 }],
    outlierFrac: 0.2, driftAngle: 2.36, driftPeriodMs: 11000 },

  // Tilted oval with trailing tendril, right-mid
  { cx: 0.83, cy: 0.40, rx: 0.040, ry: 0.072, angle: Math.PI * 0.28,
    depth: 0.6, n: 40,
    subs: [{ ox: 0, oy: 0, w: 1 }],
    outlierFrac: 0.22, driftAngle: 5.50, driftPeriodMs: 9500 },

  // Crescent / arc shape - two offset lobes at an angle
  { cx: 0.29, cy: 0.63, rx: 0.090, ry: 0.032, angle: -Math.PI * 0.22,
    depth: 1.4, n: 52,
    subs: [{ ox: -0.42, oy: -0.2, w: 0.55 }, { ox: 0.45, oy:  0.2, w: 0.45 }],
    outlierFrac: 0.08, driftAngle: 1.26, driftPeriodMs: 14000 },

  // Vertical two-lobe, centre-right
  { cx: 0.65, cy: 0.64, rx: 0.028, ry: 0.068, angle: Math.PI * 0.10,
    depth: 0.9, n: 44,
    subs: [{ ox: 0.1, oy: -0.40, w: 0.58 }, { ox: -0.1, oy: 0.40, w: 0.42 }],
    driftAngle: 3.77, driftPeriodMs: 11800 },

  // -- Bottom band ---------------------------------------------------------
  // Diagonal with long tendril, bottom-left
  { cx: 0.11, cy: 0.89, rx: 0.082, ry: 0.022, angle: Math.PI * 0.14,
    depth: 1.2, n: 34,
    subs: [{ ox: 0, oy: 0, w: 1 }],
    outlierFrac: 0.18, driftAngle: 0.21, driftPeriodMs: 8200 },

  // Upright two-lobe, bottom-centre
  { cx: 0.46, cy: 0.92, rx: 0.030, ry: 0.058, angle: -Math.PI * 0.07,
    depth: 0.5, n: 28,
    subs: [{ ox: 0.1, oy: -0.35, w: 0.6 }, { ox: -0.1, oy: 0.38, w: 0.4 }],
    driftAngle: 5.03, driftPeriodMs: 12000 },

  // Tilted smear with outliers, bottom-right
  { cx: 0.79, cy: 0.90, rx: 0.075, ry: 0.025, angle: Math.PI * 0.22,
    depth: 1.0, n: 32,
    subs: [{ ox: -0.3, oy: 0.1, w: 0.5 }, { ox: 0.4, oy: -0.1, w: 0.5 }],
    outlierFrac: 0.16, driftAngle: 2.72, driftPeriodMs: 10200 },
];
