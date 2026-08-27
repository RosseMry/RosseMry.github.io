import { useMemo } from 'react';
import { Flower, type FlowerDrift } from './Flower';
import { FlowerTrails } from './FlowerTrails';
import { seededRandom, seededRange } from '../../lib/rng';

export interface FlowerSpec {
  topPct: number;
  leftPct: number;
  size: number;
  rotation: number;
  drift: FlowerDrift;
  speed: number;
  seed: number;
  petals: 4 | 5 | 6;
  side: 'left' | 'right' | 'none';
}

export interface FlowerFieldProps {
  /** How many flowers to place. */
  count?: number;
  /** Changes the seed sequence so different fields don't look identical. */
  seedBase?: number;
  /** Where flowers are allowed to land. 'sides' keeps the center clean. 'grid' tiles evenly (footer garden). */
  region?: 'left' | 'right' | 'sides' | 'scattered' | 'grid';
  /** Columns to tile across when region is 'grid'. */
  columns?: number;
  /** [min, max] diameter in pixels. */
  sizeRange?: [number, number];
  /** Dashed "bee trail" connecting nearby flowers. Off by default for 'grid'. */
  trails?: boolean;
  interactive?: boolean;
  /** Spin a full turn on hover instead of the small tilt (used by the footer garden). */
  hoverSpin?: boolean;
  className?: string;
}

// No continuous 360° spin as ambient idle motion — that's reserved for the
// deliberate click/hover-spin interaction. Idle motion stays a gentle float.
const drifts: FlowerDrift[] = ['float', 'sway'];
const petalCounts: Array<4 | 5 | 6> = [4, 5, 6];

function buildSpecs(
  count: number,
  seedBase: number,
  region: FlowerFieldProps['region'],
  columns: number,
  sizeRange: [number, number],
): FlowerSpec[] {
  const specs: FlowerSpec[] = [];
  const rows = Math.ceil(count / columns);
  for (let i = 0; i < count; i++) {
    const seed = seedBase + i * 3.7;
    // Its own multiplier, distinct from the raw `seed` Flower uses to pick a
    // color — sharing that seed made position a monotonic function of color,
    // which read as flowers sorted into color bands instead of mixed.
    const posSeed = seed * 5.3;
    let leftPct: number;
    let topPct: number;
    let side: FlowerSpec['side'] = 'none';
    if (region === 'grid') {
      const col = i % columns;
      const row = Math.floor(i / columns);
      leftPct = ((col + 0.5) / columns) * 100;
      topPct = ((row + 0.5) / rows) * 100;
    } else {
      if (region === 'left') {
        leftPct = seededRange(posSeed, 1, 9);
        side = 'left';
      } else if (region === 'right') {
        leftPct = seededRange(posSeed, 91, 99);
        side = 'right';
      } else if (region === 'sides') {
        side = i % 2 === 0 ? 'left' : 'right';
        leftPct = side === 'left' ? seededRange(posSeed, 1, 9) : seededRange(posSeed, 91, 99);
      } else {
        leftPct = seededRange(posSeed, 2, 98);
      }
      topPct = seededRange(seed * 1.3, 4, 92);
    }

    specs.push({
      topPct,
      leftPct,
      size: seededRange(seed * 1.7, sizeRange[0], sizeRange[1]),
      rotation: seededRange(seed * 2.1, 0, 360),
      drift: drifts[Math.floor(seededRandom(seed * 2.9) * drifts.length)],
      speed: seededRange(seed * 3.3, 7, 16),
      seed,
      petals: petalCounts[Math.floor(seededRandom(seed * 4.1) * petalCounts.length)],
      side,
    });
  }
  return specs;
}

/** Places decorative Flowers deterministically — scattered/sided for the page, or a tiled grid for the footer garden. */
export function FlowerField({
  count = 6,
  seedBase = 1,
  region = 'sides',
  columns = 8,
  sizeRange = [32, 76],
  trails = region !== 'grid',
  interactive = true,
  hoverSpin = false,
  className,
}: FlowerFieldProps) {
  const specs = useMemo(
    () => buildSpecs(count, seedBase, region, columns, sizeRange),
    [count, seedBase, region, columns, sizeRange[0], sizeRange[1]],
  );

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: interactive ? 'auto' : 'none' }}
      aria-hidden="true"
    >
      {trails && (
        <FlowerTrails
          points={specs.map((s) => ({ topPct: s.topPct, leftPct: s.leftPct, seed: s.seed, group: s.side }))}
        />
      )}

      {specs.map((spec, i) => (
        <Flower
          key={i}
          size={spec.size}
          rotation={spec.rotation}
          drift={spec.drift}
          animationSpeed={spec.speed}
          seed={spec.seed}
          petals={spec.petals}
          interactive={interactive}
          hoverSpin={hoverSpin}
          style={{
            position: 'absolute',
            top: `${spec.topPct}%`,
            left: `${spec.leftPct}%`,
            // Flower's own wrapperStyle owns `transform` (for rotation/drift),
            // so center on the point with margins instead of translate().
            marginTop: -spec.size / 2,
            marginLeft: -spec.size / 2,
            pointerEvents: 'auto',
          }}
        />
      ))}
    </div>
  );
}
