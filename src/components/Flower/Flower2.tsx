import { useEffect, useId, useMemo, useState, type CSSProperties } from 'react';
import { seededRandom, seededRange } from '../../lib/rng';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import styles from './Flower.module.css';

export type Flower2Drift = 'none' | 'float' | 'sway' | 'spin-slow';

export interface Flower2Props {
  /** Diameter in pixels. */
  size?: number;
  petalColor?: string;
  centerColor?: string;
  /** 4, 5 or 6 petals. */
  petals?: 4 | 5 | 6;
  petalLength?: number;
  petalWidth?: number;
  centerRadius?: number;
  rotation?: number;
  drift?: Flower2Drift;
  animationSpeed?: number;
  interactive?: boolean;
  /** Play the click-spin animation once, shortly after mount — a one-time hint that the flower can be spun. */
  introSpin?: boolean;
  /** Delay in ms before the intro spin plays (for staggering several flowers). */
  introDelay?: number;
  seed?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  'aria-hidden'?: boolean;
}

const PALETTE: Array<{ petal: string; center: string }> = [
  { petal: 'var(--petal-purple)', center: 'var(--petal-purple-deep)' },
  { petal: 'var(--petal-blue)', center: 'var(--petal-blue-deep)' },
  { petal: 'var(--petal-cornflower)', center: 'var(--petal-cornflower-deep)' },
  { petal: 'var(--petal-peach)', center: 'var(--petal-peach-deep)' },
  { petal: 'var(--petal-pink)', center: 'var(--petal-pink-deep)' },
  { petal: 'var(--petal-yellow)', center: 'var(--petal-yellow-deep)' },
  { petal: 'var(--petal-orange)', center: 'var(--petal-orange-deep)' },
];

const driftClass: Record<Flower2Drift, string | null> = {
  none: null,
  float: styles.float,
  sway: styles.sway,
  'spin-slow': styles.spinSlow,
};

/**
 * Hero-only flower motif — the "Watercolor Bloom": a soft, rounded taper
 * (pointier than the site's flat `Flower`, but not sharp), a smaller center
 * dot, flat single-tone petals, and a watercolor-wobble edge (feTurbulence +
 * feDisplacementMap) on the whole bloom. Not used outside the Hero section.
 */
export function Flower2({
  size = 48,
  petalColor,
  centerColor,
  petals = 5,
  petalLength = 30,
  petalWidth = 16,
  centerRadius = 4,
  rotation = 0,
  drift = 'none',
  animationSpeed = 9,
  interactive = false,
  introSpin = false,
  introDelay = 0,
  seed = 1,
  className,
  style,
  onClick,
  'aria-hidden': ariaHidden = true,
}: Flower2Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [spinning, setSpinning] = useState(false);
  const uid = useId();

  useEffect(() => {
    if (!introSpin || prefersReducedMotion) return;
    const timer = setTimeout(() => setSpinning(true), introDelay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introSpin]);
  const filterId = `${uid}-wc`;
  // Deterministic turbulence seed (feTurbulence takes any number) so the
  // watercolor wobble is stable per flower instead of re-randomizing on rerender.
  const turbulenceSeed = Math.floor(seededRange(seed * 17, 1, 999));

  const palette = PALETTE[Math.floor(seededRandom(seed) * PALETTE.length)];
  const resolvedPetalColor = petalColor ?? palette.petal;
  const resolvedCenterColor = centerColor ?? palette.center;

  const petalShapes = useMemo(() => {
    const shapes = [];
    const angleStep = 360 / petals;
    for (let i = 0; i < petals; i++) {
      // Tighter jitter than the base Flower — big anchor blooms read as
      // deliberate, not scattered.
      const jitter = seededRange(seed * 100 + i, -4, 4);
      const lengthJitter = seededRange(seed * 200 + i, 0.94, 1.05);
      const widthJitter = seededRange(seed * 300 + i, 0.92, 1.06);
      shapes.push({
        angle: angleStep * i + jitter,
        length: petalLength * lengthJitter,
        width: petalWidth * widthJitter,
      });
    }
    return shapes;
  }, [petals, seed, petalLength, petalWidth]);

  const hoverRotation = seededRange(seed * 7, 8, 16) * (seededRandom(seed * 9) > 0.5 ? 1 : -1);
  const delay = seededRange(seed * 11, 0, animationSpeed);

  const effectiveDrift = prefersReducedMotion ? 'none' : drift;
  const animClass = driftClass[effectiveDrift];

  const wrapperStyle: CSSProperties = {
    ...style,
    width: size,
    height: size,
    ['--flower-base-rot' as string]: `${rotation}deg`,
    ['--flower-hover-rot' as string]: `${hoverRotation}deg`,
    ['--flower-dur' as string]: `${animationSpeed}s`,
    ['--flower-delay' as string]: `${-delay}s`,
    transform: animClass ? undefined : `rotate(${rotation}deg)`,
  };

  const classes = [styles.wrapper, interactive && styles.interactive, animClass, spinning && styles.spinning, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      style={wrapperStyle}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-hidden={ariaHidden && !interactive}
      onClick={() => {
        if (!interactive) return;
        setSpinning(true);
        onClick?.();
      }}
      onKeyDown={(e) => {
        if (!interactive) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSpinning(true);
          onClick?.();
        }
      }}
      onAnimationEnd={() => setSpinning(false)}
    >
      <svg viewBox="-50 -50 100 100" width={size} height={size} focusable="false">
        <defs>
          {/* Wobbly, hand-painted edge — displaces the whole bloom's silhouette
              with fractal noise, once, so overlapping petals still read as
              one wobbly painted outline instead of each petal hiding its own
              tiny wobble behind its neighbors. */}
          <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed={turbulenceSeed} result="wc-noise" />
            <feDisplacementMap in="SourceGraphic" in2="wc-noise" scale="14" />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`}>
          {/* One flat, evenly-opaque shape per petal — only the edge is
              wobbled by the filter, so the fill reads as a single solid
              petal color with no banding from overlapping layers. */}
          {petalShapes.map((petal, i) => (
            <ellipse
              key={i}
              cx="0"
              cy={-petal.length * 0.44}
              rx={petal.width / 2}
              ry={petal.length / 2}
              fill={resolvedPetalColor}
              transform={`rotate(${petal.angle})`}
            />
          ))}
        </g>
        <circle r={centerRadius} fill={resolvedCenterColor} />
      </svg>
    </span>
  );
}
