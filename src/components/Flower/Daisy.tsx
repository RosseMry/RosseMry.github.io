import type { CSSProperties } from 'react';

export interface DaisyProps {
  /** Diameter in pixels. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The site's one-off cute mascot — white overlapping petals, a happy face,
 * matching the reference in logos/daisy.webp. Unlike the seeded `Flower`,
 * this is deliberately clean/symmetric (a drawn character, not a garden bloom).
 */
export function Daisy({ size = 72, className, style }: DaisyProps) {
  return (
    <span
      className={className}
      style={{ display: 'inline-block', width: size, height: size, lineHeight: 0, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="-50 -50 100 100" width={size} height={size} focusable="false">
        <g fill="#fffdfa">
          <ellipse cx="0" cy="-25" rx="16" ry="22" transform="rotate(0)" />
          <ellipse cx="0" cy="-25" rx="16" ry="22" transform="rotate(72)" />
          <ellipse cx="0" cy="-25" rx="16" ry="22" transform="rotate(144)" />
          <ellipse cx="0" cy="-25" rx="16" ry="22" transform="rotate(216)" />
          <ellipse cx="0" cy="-25" rx="16" ry="22" transform="rotate(288)" />
        </g>
        <circle r="19" fill="var(--petal-yellow-deep)" />
        <path d="M -9 -3 Q -6 -7.5 -3 -3" stroke="#4a3a24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M 3 -3 Q 6 -7.5 9 -3" stroke="#4a3a24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M -6.5 5 Q 0 11.5 6.5 5" stroke="#4a3a24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="-13" cy="3" rx="3.5" ry="2.4" fill="var(--petal-pink-deep)" opacity="0.55" />
        <ellipse cx="13" cy="3" rx="3.5" ry="2.4" fill="var(--petal-pink-deep)" opacity="0.55" />
      </svg>
    </span>
  );
}
