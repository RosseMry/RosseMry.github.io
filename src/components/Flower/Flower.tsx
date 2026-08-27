import { useEffect, useId, useMemo, useState, type CSSProperties } from 'react';
import { seededRandom, seededRange } from '../../lib/rng';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import styles from './Flower.module.css';

export type FlowerDrift = 'none' | 'float' | 'sway' | 'spin-slow';

export interface FlowerProps {
  /** Diameter in pixels. */
  size?: number;
  /** Petal color. Defaults to a palette pick based on `seed`. */
  petalColor?: string;
  /** Center/stamen color. Defaults to a palette pick based on `seed`. */
  centerColor?: string;
  /** 4, 5 or 6 petals. */
  petals?: 4 | 5 | 6;
  /** Base petal length/width in the 100-unit viewBox space. Defaults keep the garden/section look untouched. */
  petalLength?: number;
  petalWidth?: number;
  /** Center dot radius in the 100-unit viewBox space. */
  centerRadius?: number;
  /** Static base rotation in degrees. */
  rotation?: number;
  /** Idle ambient animation, or 'none' to keep the flower still. */
  drift?: FlowerDrift;
  /** Seconds per idle animation cycle. */
  animationSpeed?: number;
  /** Enables hover/click interaction (scale + spin on click). */
  interactive?: boolean;
  /** When interactive, spin a full turn on hover instead of the small tilt (used by the footer garden). */
  hoverSpin?: boolean;
  /** Play the click-spin animation once, shortly after mount — a one-time hint that the flower can be spun. */
  introSpin?: boolean;
  /** Delay in ms before the intro spin plays (for staggering several flowers). */
  introDelay?: number;
  /** Deterministic seed driving hand-drawn petal jitter and animation delay/amplitude. */
  seed?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  'aria-hidden'?: boolean;
}

const PALETTE: Array<{ petal: string; center: string }> = [
  { petal: 'var(--petal-purple)', center: 'var(--petal-purple-deep)' },
  { petal: 'var(--petal-blue)', center: 'var(--petal-blue-deep)' },
  { petal: 'var(--petal-peach)', center: 'var(--petal-peach-deep)' },
  { petal: 'var(--petal-yellow)', center: 'var(--petal-yellow-deep)' },
  { petal: 'var(--petal-orange)', center: 'var(--petal-orange-deep)' },
  { petal: 'var(--petal-cornflower)', center: 'var(--petal-cornflower-deep)' },
  { petal: 'var(--petal-pink)', center: 'var(--petal-pink-deep)' },
];

const driftClass: Record<FlowerDrift, string | null> = {
  none: null,
  float: styles.float,
  sway: styles.sway,
  'spin-slow': styles.spinSlow,
};

/**
 * Reusable hand-drawn flower motif. One SVG shape reused across the hero,
 * section margins, cursor and footer garden — never a copied third-party asset.
 */
export function Flower({
  size = 48,
  petalColor,
  centerColor,
  petals = 5,
  petalLength = 30,
  petalWidth = 22,
  centerRadius = 13,
  rotation = 0,
  drift = 'none',
  animationSpeed = 9,
  interactive = false,
  hoverSpin = false,
  introSpin = false,
  introDelay = 0,
  seed = 1,
  className,
  style,
  onClick,
  'aria-hidden': ariaHidden = true,
}: FlowerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [spinning, setSpinning] = useState(false);
  const gradientId = useId();

  useEffect(() => {
    if (!introSpin || prefersReducedMotion) return;
    const timer = setTimeout(() => setSpinning(true), introDelay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introSpin]);

  const palette = PALETTE[Math.floor(seededRandom(seed) * PALETTE.length)];
  const resolvedPetalColor = petalColor ?? palette.petal;
  const resolvedCenterColor = centerColor ?? palette.center;

  const petalShapes = useMemo(() => {
    const shapes = [];
    const angleStep = 360 / petals;
    for (let i = 0; i < petals; i++) {
      const jitter = seededRange(seed * 100 + i, -6, 6);
      const lengthJitter = seededRange(seed * 200 + i, 0.9, 1.08);
      const widthJitter = seededRange(seed * 300 + i, 0.85, 1.1);
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

  const classes = [
    styles.wrapper,
    interactive && styles.interactive,
    interactive && hoverSpin && styles.noTilt,
    animClass,
    spinning && styles.spinning,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      style={wrapperStyle}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-hidden={ariaHidden && !interactive}
      onMouseEnter={() => {
        if (interactive && hoverSpin) setSpinning(true);
      }}
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
          {/* Light at the tip, richer toward the center — the hand-painted/glossy look. */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={resolvedPetalColor} />
            <stop offset="100%" stopColor={resolvedCenterColor} />
          </linearGradient>
        </defs>
        <g>
          {petalShapes.map((petal, i) => (
            <ellipse
              key={i}
              cx="0"
              cy={-petal.length * 0.46}
              rx={petal.width / 2}
              ry={petal.length / 2}
              fill={`url(#${gradientId})`}
              transform={`rotate(${petal.angle})`}
            />
          ))}
        </g>
        <circle r={centerRadius} fill={resolvedCenterColor} />
      </svg>
    </span>
  );
}
