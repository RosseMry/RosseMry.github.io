import { seededRandom, seededRange } from '../../lib/rng';

export interface TrailPoint {
  topPct: number;
  leftPct: number;
  seed: number;
  /** Only points sharing a group get connected — keeps a trail off the clean center column. */
  group?: string;
}

interface Path {
  d: string;
  key: string;
}

/**
 * A little "bee trail" — a dotted, gently wiggling line that hops from
 * flower to flower, like a bee wandering the bed, instead of isolated pairs.
 */
export function buildTrailPaths(points: TrailPoint[]): Path[] {
  const paths: Path[] = [];
  const groups: Record<string, number[]> = {};
  points.forEach((p, i) => {
    const key = p.group ?? 'default';
    (groups[key] ??= []).push(i);
  });

  for (const indices of Object.values(groups)) {
    for (let n = 0; n < indices.length - 1; n++) {
      const a = points[indices[n]];
      const b = points[indices[n + 1]];
      const dx = a.leftPct - b.leftPct;
      const dy = a.topPct - b.topPct;
      const dist = Math.hypot(dx, dy);
      if (dist > 34) continue; // too far apart to read as a deliberate trail

      const bow = seededRange(a.seed * 6.1, 0.22, 0.34) * (seededRandom(a.seed * 6.7) > 0.5 ? 1 : -1);
      const midX = (a.leftPct + b.leftPct) / 2 - dy * bow;
      const midY = (a.topPct + b.topPct) / 2 + dx * bow;
      paths.push({
        key: `${indices[n]}-${indices[n + 1]}`,
        d: `M ${a.leftPct} ${a.topPct} Q ${midX} ${midY} ${b.leftPct} ${b.topPct}`,
      });
    }
  }
  return paths;
}

/** Renders the dashed connector overlay for a set of flower points. Absolutely fills its parent. */
export function FlowerTrails({ points }: { points: TrailPoint[] }) {
  const paths = buildTrailPaths(points);
  if (paths.length === 0) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {paths.map((path) => (
        <path
          key={path.key}
          d={path.d}
          fill="none"
          stroke="var(--petal-purple-deep)"
          strokeOpacity={0.45}
          strokeWidth={1.75}
          strokeDasharray="0.5 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
