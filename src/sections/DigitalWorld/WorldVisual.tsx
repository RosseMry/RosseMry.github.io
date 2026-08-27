import { useId, type ReactNode } from 'react';
import type { WorldCard } from '../../data/digitalWorld';

type Point = [number, number];

/** Faint x/y axes with a few "fake" tick numbers — every chart card gets one, kept light (hairline + soft ink). */
function Axes({ x0, y0, w, h, xLabels, yLabels }: { x0: number; y0: number; w: number; h: number; xLabels: string[]; yLabels: string[] }) {
  const xGap = w / Math.max(xLabels.length - 1, 1);
  const yGap = h / Math.max(yLabels.length - 1, 1);
  return (
    <>
      <g stroke="var(--color-line)" strokeWidth={1} strokeLinecap="round">
        <line x1={x0} y1={y0 - h} x2={x0} y2={y0} />
        <line x1={x0} y1={y0} x2={x0 + w} y2={y0} />
      </g>
      {xLabels.map((label, i) => (
        <text key={label + i} x={x0 + i * xGap} y={y0 + 6.5} fontSize="4.6" fill="var(--color-ink-soft)" opacity={0.45} textAnchor="middle">
          {label}
        </text>
      ))}
      {yLabels.map((label, i) => (
        <text key={label + i} x={x0 - 2.5} y={y0 - i * yGap + 1.6} fontSize="4.6" fill="var(--color-ink-soft)" opacity={0.45} textAnchor="end">
          {label}
        </text>
      ))}
    </>
  );
}

/** Light-to-deep linear wash, the same recipe as the Hero's petal gradient. */
function Wash({ id, light, deep }: { id: string; light: string; deep: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={light} />
      <stop offset="100%" stopColor={deep} />
    </linearGradient>
  );
}

function PandasChart() {
  const uid = useId();
  const washId = `${uid}-wash`;
  return (
    <>
      <defs>
        <Wash id={washId} light="var(--petal-purple)" deep="var(--petal-purple-deep)" />
      </defs>
      <Axes x0={6} y0={34} w={58} h={28} xLabels={['A', 'B', 'C']} yLabels={['0', '10', '20']} />
      <g fill={`url(#${washId})`}>
        <rect x="10" y="20" width="7" height="14" rx="2" opacity={0.65} />
        <rect x="18" y="10" width="7" height="24" rx="2" />
        <rect x="30" y="16" width="7" height="18" rx="2" opacity={0.65} />
        <rect x="38" y="6" width="7" height="28" rx="2" />
        <rect x="50" y="22" width="7" height="12" rx="2" opacity={0.65} />
        <rect x="58" y="8" width="7" height="26" rx="2" />
      </g>
      <g fill="none" stroke="var(--petal-pink-deep)" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13.5,20 21.5,10 33.5,16 41.5,6 53.5,22 61.5,8" />
      </g>
      <g fill="var(--petal-pink-deep)">
        {[
          [13.5, 20],
          [21.5, 10],
          [33.5, 16],
          [41.5, 6],
          [53.5, 22],
          [61.5, 8],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.3} />
        ))}
      </g>
    </>
  );
}

/** P(u,v) = p00 + u*(p10-p00) + v*(p01-p00) — the affine map for a parallelogram face. */
function at(p00: Point, p10: Point, p01: Point, u: number, v: number): Point {
  return [p00[0] + u * (p10[0] - p00[0]) + v * (p01[0] - p00[0]), p00[1] + u * (p10[1] - p00[1]) + v * (p01[1] - p00[1])];
}

/** Rounds every corner of a closed polygon by pulling back `r` along each edge and joining with a quadratic curve through the original vertex. */
function roundedCorners(points: Point[], r: number): string {
  const n = points.length;
  const get = (i: number) => points[(i + n) % n];
  let d = '';
  for (let i = 0; i < n; i++) {
    const prev = get(i - 1);
    const curr = get(i);
    const next = get(i + 1);
    const toPrev: Point = [prev[0] - curr[0], prev[1] - curr[1]];
    const toNext: Point = [next[0] - curr[0], next[1] - curr[1]];
    const lenPrev = Math.hypot(...toPrev);
    const lenNext = Math.hypot(...toNext);
    const rr = Math.min(r, lenPrev / 2, lenNext / 2);
    const a: Point = [curr[0] + (toPrev[0] / lenPrev) * rr, curr[1] + (toPrev[1] / lenPrev) * rr];
    const b: Point = [curr[0] + (toNext[0] / lenNext) * rr, curr[1] + (toNext[1] / lenNext) * rr];
    d += (i === 0 ? `M ${a[0]} ${a[1]} ` : `L ${a[0]} ${a[1]} `) + `Q ${curr[0]} ${curr[1]} ${b[0]} ${b[1]} `;
  }
  return d + 'Z';
}

function faceGridCells(p00: Point, p10: Point, p01: Point, n: number, fill: string, seam: string): ReactNode[] {
  const cells: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const c00 = at(p00, p10, p01, i / n, j / n);
      const c10 = at(p00, p10, p01, (i + 1) / n, j / n);
      const c11 = at(p00, p10, p01, (i + 1) / n, (j + 1) / n);
      const c01 = at(p00, p10, p01, i / n, (j + 1) / n);
      const pts = [c00, c10, c11, c01].map((p) => p.join(',')).join(' ');
      cells.push(<polygon key={`${i}-${j}`} points={pts} fill={fill} stroke={seam} strokeWidth={1.4} />);
    }
  }
  return cells;
}

/** A real isometric cube (top/left/right face, each subdivided into a 3x3 grid), all-purple with rounded outer corners. */
function NumpyCube() {
  const uid = useId();
  const topId = `${uid}-top`;
  const leftId = `${uid}-left`;
  const rightId = `${uid}-right`;
  const clipId = `${uid}-clip`;

  const T: Point = [30, 3];
  const L: Point = [4, 15];
  const R: Point = [56, 15];
  const F: Point = [30, 27];
  const L2: Point = [4, 47];
  const R2: Point = [56, 47];
  const F2: Point = [30, 59];
  const seam = 'var(--color-card)';

  return (
    <>
      <defs>
        <Wash id={topId} light="var(--petal-purple)" deep="var(--petal-cornflower)" />
        <linearGradient id={leftId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--petal-cornflower)" />
          <stop offset="100%" stopColor="var(--petal-cornflower-deep)" />
        </linearGradient>
        <linearGradient id={rightId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--petal-purple)" />
          <stop offset="100%" stopColor="var(--petal-purple-deep)" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={roundedCorners([T, R, R2, F2, L2, L], 5)} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {faceGridCells(L, T, F, 3, `url(#${topId})`, seam)}
        {faceGridCells(L, F, L2, 3, `url(#${leftId})`, seam)}
        {faceGridCells(F, R, F2, 3, `url(#${rightId})`, seam)}
      </g>
    </>
  );
}

function donutSlice(cx: number, cy: number, r: number, ir: number, startDeg: number, endDeg: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const p = (deg: number, radius: number): Point => [cx + radius * Math.sin(rad(deg)), cy - radius * Math.cos(rad(deg))];
  const [x1, y1] = p(startDeg, r);
  const [x2, y2] = p(endDeg, r);
  const [ix2, iy2] = p(endDeg, ir);
  const [ix1, iy1] = p(startDeg, ir);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${large} 0 ${ix1} ${iy1} Z`;
}

/** Seaborn-style scatter (small, colorful, dense) with a donut overlapping the right-hand cluster. */
function EdaCombo() {
  const uid = useId();
  const orangeId = `${uid}-orange`;
  const purpleId = `${uid}-purple`;
  const cornflowerId = `${uid}-cornflower`;

  const points: Array<[number, number, string]> = [
    [6, 46, 'var(--petal-peach-deep)'],
    [10, 40, 'var(--petal-cornflower-deep)'],
    [9, 48, 'var(--petal-purple-deep)'],
    [14, 34, 'var(--petal-orange-deep)'],
    [17, 40, 'var(--petal-peach-deep)'],
    [16, 30, 'var(--petal-cornflower-deep)'],
    [21, 26, 'var(--petal-purple-deep)'],
    [24, 32, 'var(--petal-orange-deep)'],
    [26, 20, 'var(--petal-peach-deep)'],
    [29, 24, 'var(--petal-cornflower-deep)'],
    [31, 16, 'var(--petal-purple-deep)'],
    [34, 20, 'var(--petal-orange-deep)'],
    [36, 14, 'var(--petal-peach-deep)'],
    [39, 18, 'var(--petal-cornflower-deep)'],
    [41, 24, 'var(--petal-purple-deep)'],
    [44, 30, 'var(--petal-orange-deep)'],
    [47, 26, 'var(--petal-peach-deep)'],
    [49, 36, 'var(--petal-cornflower-deep)'],
  ];

  return (
    <>
      <defs>
        <radialGradient id={orangeId} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="var(--petal-orange)" />
          <stop offset="100%" stopColor="var(--petal-orange-deep)" />
        </radialGradient>
        <radialGradient id={purpleId} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="var(--petal-purple)" />
          <stop offset="100%" stopColor="var(--petal-purple-deep)" />
        </radialGradient>
        <radialGradient id={cornflowerId} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="var(--petal-cornflower)" />
          <stop offset="100%" stopColor="var(--petal-cornflower-deep)" />
        </radialGradient>
      </defs>
      <Axes x0={4} y0={52} w={52} h={44} xLabels={['0', '1', '2', '3']} yLabels={['0', '1', '2']} />
      <path d="M4 50 Q 26 8 56 36" fill="none" stroke="var(--color-line)" strokeWidth={1.4} strokeDasharray="2 3" />
      <g>
        {points.map(([x, y, fill], i) => (
          <circle key={i} cx={x} cy={y} r={1.1} fill={fill} />
        ))}
      </g>
      <g transform="translate(43,32)">
        <path d={donutSlice(0, 0, 13, 6, 0, 150)} fill={`url(#${orangeId})`} />
        <path d={donutSlice(0, 0, 13, 6, 150, 260)} fill={`url(#${purpleId})`} />
        <path d={donutSlice(0, 0, 13, 6, 260, 360)} fill={`url(#${cornflowerId})`} />
      </g>
    </>
  );
}

/** Comparative grouped bars (small+large pairs, 3 groups) with a matplotlib-style x/y axis. */
function DatavizBars() {
  const uid = useId();
  const washAId = `${uid}-a`;
  const washBId = `${uid}-b`;
  return (
    <>
      <defs>
        <Wash id={washAId} light="var(--petal-cornflower)" deep="var(--petal-cornflower-deep)" />
        <Wash id={washBId} light="var(--petal-purple)" deep="var(--petal-purple-deep)" />
      </defs>
      <Axes x0={6} y0={52} w={51} h={46} xLabels={['A', 'B', 'C']} yLabels={['0', '20', '40']} />
      <g>
        <rect x="10" y="36" width="6" height="16" rx="2" fill={`url(#${washAId})`} />
        <rect x="17" y="22" width="6" height="30" rx="2" fill={`url(#${washBId})`} />
        <rect x="27" y="30" width="6" height="22" rx="2" fill={`url(#${washAId})`} />
        <rect x="34" y="14" width="6" height="38" rx="2" fill={`url(#${washBId})`} />
        <rect x="43" y="38" width="6" height="14" rx="2" fill={`url(#${washAId})`} />
        <rect x="50" y="8" width="6" height="44" rx="2" fill={`url(#${washBId})`} />
      </g>
    </>
  );
}

function Bell() {
  const uid = useId();
  const washId = `${uid}-wash`;
  return (
    <>
      <defs>
        <Wash id={washId} light="var(--petal-purple)" deep="var(--petal-purple-deep)" />
      </defs>
      <Axes x0={6} y0={52} w={48} h={44} xLabels={['-2', '0', '2']} yLabels={['0', '1']} />
      <path
        d="M8 50 C 16 50 18 12 30 12 C 42 12 44 50 52 50"
        fill="none"
        stroke={`url(#${washId})`}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </>
  );
}

/** A little dashboard scene — a bar-chart tile, a donut tile, and a checklist tile — instead of empty panels. */
function Panels() {
  const uid = useId();
  const washAId = `${uid}-a`;
  const washBId = `${uid}-b`;
  const panel = { fill: 'var(--color-bg-alt)', stroke: 'var(--color-line)' };
  return (
    <>
      <defs>
        <Wash id={washAId} light="var(--petal-cornflower)" deep="var(--petal-cornflower-deep)" />
        <Wash id={washBId} light="var(--petal-purple)" deep="var(--petal-purple-deep)" />
      </defs>
      <g fill={panel.fill} stroke={panel.stroke} strokeWidth={1}>
        <rect x="6" y="6" width="24" height="22" rx="3" />
        <rect x="33" y="6" width="21" height="22" rx="3" />
        <rect x="6" y="31" width="48" height="21" rx="3" />
      </g>
      {/* mini bar chart, top-left tile */}
      <g fill={`url(#${washAId})`}>
        <rect x="10" y="18" width="3" height="7" rx="1" />
        <rect x="16" y="14" width="3" height="11" rx="1" />
        <rect x="22" y="20" width="3" height="5" rx="1" />
      </g>
      {/* mini donut, top-right tile */}
      <g transform="translate(43.5,17)">
        <path d={donutSlice(0, 0, 7, 3, 0, 140)} fill={`url(#${washBId})`} />
        <path d={donutSlice(0, 0, 7, 3, 140, 250)} fill="var(--petal-orange-deep)" />
        <path d={donutSlice(0, 0, 7, 3, 250, 360)} fill="var(--petal-cornflower)" />
      </g>
      {/* checklist tile, bottom */}
      <g>
        <circle cx="12" cy="38" r="2" fill={`url(#${washBId})`} />
        <rect x="17" y="36.5" width="20" height="3" rx="1.5" fill="var(--color-line)" />
        <circle cx="12" cy="46" r="2" fill={`url(#${washAId})`} />
        <rect x="17" y="44.5" width="14" height="3" rx="1.5" fill="var(--color-line)" />
      </g>
    </>
  );
}

const VISUALS: Record<NonNullable<WorldCard['visual']>, ReactNode> = {
  pandasChart: <PandasChart />,
  numpyCube: <NumpyCube />,
  edaCombo: <EdaCombo />,
  dataviz: <DatavizBars />,
  bell: <Bell />,
  panels: <Panels />,
};

const VIEWBOX: Record<NonNullable<WorldCard['visual']>, string> = {
  pandasChart: '0 0 70 44',
  numpyCube: '0 0 60 62',
  edaCombo: '0 0 60 60',
  dataviz: '0 0 60 60',
  bell: '0 0 60 60',
  panels: '0 0 60 60',
};

export function WorldVisual({ kind }: { kind: NonNullable<WorldCard['visual']> }) {
  return (
    <svg viewBox={VIEWBOX[kind]} width="100%" height="100%" aria-hidden="true">
      {VISUALS[kind]}
    </svg>
  );
}
