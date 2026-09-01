import { useState, type ReactNode } from 'react';
import { Daisy } from '../components/Flower';
import { PROJECTS, FILTER_GROUPS, type Project, type ProjectFilterGroup } from '../data/projects';
import dslrImage from '../assets/projects/dslr.webp';
import linearRegressionImage from '../assets/projects/linear-regression.png';
import piscineImage from '../assets/projects/piscine.png';
import ecommerceImage from '../assets/projects/ecommerce.png';
import ecommerce2Image from '../assets/projects/ecommerce2.jpg';
import styles from './WorkPage.module.css';

const IMAGES: Record<Project['image'], string> = {
  dslr: dslrImage,
  linearRegression: linearRegressionImage,
  piscine: piscineImage,
  ecommerce: ecommerceImage,
  ecommerce2: ecommerce2Image,
};

type Filter = 'All' | ProjectFilterGroup;

/** Makes a decorative flower's petals+center spin on click, matching the site's Flower component. */
function Bloom({ children }: { children: ReactNode }) {
  const [spinning, setSpinning] = useState(false);
  return (
    <g
      className={`${styles.bloom} ${spinning ? styles.spinning : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => setSpinning(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSpinning(true);
        }
      }}
      onAnimationEnd={() => setSpinning(false)}
    >
      {children}
    </g>
  );
}

/** Only DSLR and Piscine get a big decorative edge flower straddling the card's outer border. */
function ProjectEdgeFlower({ project }: { project: Project }) {
  if (project.image === 'dslr') {
    return (
      <svg className={styles.edgeFlowerL} width={230} height={230} viewBox="-50 -50 100 100" aria-hidden="true">
        <defs>
          <filter id="workEdgeWobbleDslr" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves={2} seed={42} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={14} />
          </filter>
        </defs>
        <Bloom>
          <g filter="url(#workEdgeWobbleDslr)">
            <ellipse cx="0" cy="-13.2" rx="8" ry="15" fill="var(--petal-purple)" transform="rotate(0)" />
            <ellipse cx="0" cy="-13.2" rx="8" ry="15" fill="var(--petal-purple)" transform="rotate(72)" />
            <ellipse cx="0" cy="-13.2" rx="8" ry="15" fill="var(--petal-purple)" transform="rotate(144)" />
            <ellipse cx="0" cy="-13.2" rx="8" ry="15" fill="var(--petal-purple)" transform="rotate(216)" />
            <ellipse cx="0" cy="-13.2" rx="8" ry="15" fill="var(--petal-purple)" transform="rotate(288)" />
          </g>
          <circle r={4} fill="var(--petal-purple-deep)" />
        </Bloom>
      </svg>
    );
  }
  if (project.image === 'piscine') {
    return (
      <svg className={styles.edgeFlowerL} width={230} height={230} viewBox="-50 -50 100 100" aria-hidden="true">
        <defs>
          <filter id="workEdgeTexturePiscine" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={4} seed={23} result="bleed" />
            <feColorMatrix
              in="bleed"
              type="matrix"
              values="0 0 0 0 0.37  0 0 0 0 0.49  0 0 0 0 0.91  0 0 0 0.75 0"
              result="tintedBleed"
            />
            <feComposite in="tintedBleed" in2="SourceAlpha" operator="in" result="clippedBleed" />
            <feBlend in="SourceGraphic" in2="clippedBleed" mode="multiply" result="painted" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={23} result="paperGrain" />
            <feColorMatrix
              in="paperGrain"
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.12 0"
              result="whiteGrain"
            />
            <feComposite in="whiteGrain" in2="SourceAlpha" operator="in" result="clippedGrain" />
            <feBlend in="painted" in2="clippedGrain" mode="multiply" />
          </filter>
        </defs>
        <Bloom>
          <g fill="var(--petal-cornflower)" filter="url(#workEdgeTexturePiscine)">
            <ellipse cx="0" cy="-13.8" rx="8.5" ry="15" transform="rotate(0)" />
            <ellipse cx="0" cy="-13.8" rx="8.5" ry="15" transform="rotate(72)" />
            <ellipse cx="0" cy="-13.8" rx="8.5" ry="15" transform="rotate(144)" />
            <ellipse cx="0" cy="-13.8" rx="8.5" ry="15" transform="rotate(216)" />
            <ellipse cx="0" cy="-13.8" rx="8.5" ry="15" transform="rotate(288)" />
          </g>
          <circle r={7} fill="var(--petal-cornflower-deep)" />
        </Bloom>
      </svg>
    );
  }
  return null;
}

/** Hand-placed decorative flowers scattered along the page's outer margins, like Home's garden. */
function SideFlowers() {
  return (
    <div className={styles.sideFlowers} aria-hidden="true">
      <svg
        className={styles.hideOnPhone}
        width={70}
        height={70}
        viewBox="-50 -50 100 100"
        style={{ top: '6%', left: '2%', transform: 'translateY(1cm)', zIndex: 3 }}
      >
        <defs>
          <linearGradient id="workSf1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-yellow)" />
            <stop offset="100%" stopColor="var(--petal-yellow-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf1)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-yellow-deep)" />
        </Bloom>
      </svg>
      <svg width={46} height={46} viewBox="-50 -50 100 100" style={{ top: '38%', right: '3%' }}>
        <defs>
          <linearGradient id="workSf2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-pink)" />
            <stop offset="100%" stopColor="var(--petal-pink-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[10, 82, 154, 226, 298].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf2)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-pink-deep)" />
        </Bloom>
      </svg>
      <svg width={56} height={56} viewBox="-50 -50 100 100" style={{ top: '62%', left: '1.5%' }}>
        <defs>
          <linearGradient id="workSf3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-cornflower)" />
            <stop offset="100%" stopColor="var(--petal-cornflower-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[-6, 66, 138, 210, 282].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf3)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-cornflower-deep)" />
        </Bloom>
      </svg>
      <svg width={38} height={38} viewBox="-50 -50 100 100" style={{ top: '84%', right: '2%' }}>
        <defs>
          <linearGradient id="workSf4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-peach)" />
            <stop offset="100%" stopColor="var(--petal-peach-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[14, 86, 158, 230, 302].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf4)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-peach-deep)" />
        </Bloom>
      </svg>

      {/* M/L flowers scattered beside the project-card list, kept off the cards themselves. Hidden below tablet — their fixed offsets were only tuned for wide layouts. */}
      <div className={styles.sideFlowersExtra}>
      <svg width={110} height={110} viewBox="-50 -50 100 100" style={{ top: '46%', left: '0.5%' }}>
        <defs>
          <linearGradient id="workSf5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-purple)" />
            <stop offset="100%" stopColor="var(--petal-purple-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[6, 78, 150, 222, 294].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf5)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-purple-deep)" />
        </Bloom>
      </svg>
      <svg width={100} height={100} viewBox="-50 -50 100 100" style={{ top: '68%', left: '1%' }}>
        <defs>
          <linearGradient id="workSf7" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-peach)" />
            <stop offset="100%" stopColor="var(--petal-peach-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[18, 90, 162, 234, 306].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf7)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-peach-deep)" />
        </Bloom>
      </svg>
      <svg width={170} height={170} viewBox="-50 -50 100 100" style={{ top: '75%', right: '0.5%' }}>
        <defs>
          <linearGradient id="workSf8" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-pink)" />
            <stop offset="100%" stopColor="var(--petal-pink-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[2, 74, 146, 218, 290].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf8)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-pink-deep)" />
        </Bloom>
      </svg>
      <svg width={180} height={180} viewBox="-50 -50 100 100" style={{ top: '58%', left: '0%' }}>
        <defs>
          <linearGradient id="workSf9" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-orange)" />
            <stop offset="100%" stopColor="var(--petal-orange-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[8, 80, 152, 224, 296].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf9)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-orange-deep)" />
        </Bloom>
      </svg>
      <svg width={80} height={80} viewBox="-50 -50 100 100" style={{ top: '90%', left: '2.5%' }}>
        <defs>
          <linearGradient id="workSf10" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-yellow)" />
            <stop offset="100%" stopColor="var(--petal-yellow-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[-4, 68, 140, 212, 284].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf10)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-yellow-deep)" />
        </Bloom>
      </svg>
      <svg width={90} height={90} viewBox="-50 -50 100 100" style={{ top: '30%', right: '1%' }}>
        <defs>
          <linearGradient id="workSf11" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-peach)" />
            <stop offset="100%" stopColor="var(--petal-orange-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[12, 84, 156, 228, 300].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workSf11)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-orange-deep)" />
        </Bloom>
      </svg>
      </div>
    </div>
  );
}

/** The intro band's cluster of hand-placed flowers and looping dashed connectors, framing "Step into my world". */
function IntroDeco() {
  return (
    <div className={styles.introDeco}>
      <svg
        className={styles.deco}
        width={260}
        height={150}
        viewBox="0 0 260 150"
        style={{ top: '110px', right: '4%', transform: 'rotate(8deg)' }}
        aria-hidden="true"
      >
        <path
          d="M4 90 Q 45 45 85 68 Q 118 90 92 108 Q 68 122 72 96 Q 76 70 110 62 Q 175 42 220 10 Q 260 -18 328 -30"
          fill="none"
          stroke="var(--petal-purple-deep)"
          strokeOpacity={0.5}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
      </svg>

      <svg
        className={`${styles.deco} ${styles.hideOnPhone}`}
        width={230}
        height={230}
        viewBox="-50 -50 100 100"
        style={{ top: '50%', left: 'calc(-40px + 2.5cm)', transform: 'translateY(calc(-50% + 4.3cm))' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="workIntroYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-yellow)" />
            <stop offset="100%" stopColor="var(--petal-yellow-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workIntroYellow)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-yellow-deep)" />
        </Bloom>
      </svg>

      <svg
        className={styles.deco}
        width={358}
        height={358}
        viewBox="-50 -50 100 100"
        style={{ top: '-30px', right: '4%', transform: 'translateX(3cm)' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="workEdgeTextureIntroBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={4} seed={23} result="bleed" />
            <feColorMatrix
              in="bleed"
              type="matrix"
              values="0 0 0 0 0.50  0 0 0 0 0.72  0 0 0 0 0.88  0 0 0 0.6 0"
              result="tintedBleed"
            />
            <feComposite in="tintedBleed" in2="SourceAlpha" operator="in" result="clippedBleed" />
            <feBlend in="SourceGraphic" in2="clippedBleed" mode="multiply" />
          </filter>
        </defs>
        <Bloom>
          <g fill="var(--petal-blue)" filter="url(#workEdgeTextureIntroBlue)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-13.8" rx="8.5" ry="15" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-blue-deep)" />
        </Bloom>
      </svg>

      <svg
        className={styles.deco}
        width={200}
        height={180}
        viewBox="0 0 200 180"
        style={{ top: '280px', right: '11%' }}
        aria-hidden="true"
      >
        <path
          d="M182 10 Q 130 2 108 42 Q 90 74 118 66 Q 145 58 100 88 Q 60 114 20 138"
          fill="none"
          stroke="var(--petal-purple-deep)"
          strokeOpacity={0.5}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
      </svg>

      <svg
        className={`${styles.deco} ${styles.hideOnPhone}`}
        width={230}
        height={230}
        viewBox="-50 -50 100 100"
        style={{ top: '42%', right: '-6%', transform: 'translate(-4cm, 2cm)' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="workIntroPink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--petal-pink)" />
            <stop offset="100%" stopColor="var(--petal-pink-deep)" />
          </linearGradient>
        </defs>
        <Bloom>
          <g>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-15" rx="11" ry="15" fill="url(#workIntroPink)" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-pink-deep)" />
        </Bloom>
      </svg>

      <svg
        className={styles.deco}
        width={260}
        height={140}
        viewBox="0 0 260 140"
        style={{ top: '372px', left: 'calc(245px - 5cm)' }}
        aria-hidden="true"
      >
        <path
          d="M250 34 Q 210 10 180 26 Q 150 42 156 14 Q 160 -8 122 -2 Q 92 4 100 32 Q 106 56 66 50 Q 26 44 6 66 Q -10 84 4 100"
          fill="none"
          stroke="var(--petal-purple-deep)"
          strokeOpacity={0.5}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
      </svg>

      <svg
        className={styles.deco}
        width={420}
        height={170}
        viewBox="0 0 420 170"
        style={{ top: '70px', left: '-50px', transform: 'translateX(-5cm)' }}
        aria-hidden="true"
      >
        <path
          d="M33 104 Q 50 108 70 108 Q 100 90 76 72 Q 54 56 88 52 Q 150 46 190 20 Q 210 12 228 18"
          fill="none"
          stroke="var(--petal-purple-deep)"
          strokeOpacity={0.5}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
      </svg>

      <svg
        className={`${styles.deco} ${styles.hideOnPhone}`}
        width={358}
        height={358}
        viewBox="-50 -50 100 100"
        style={{
          top: '50%',
          left: 'calc(-40px - 2cm)',
          transform: 'translateY(calc(-50% - 2cm))',
          opacity: 0.5,
          zIndex: 3,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="workEdgeTextureLavender" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={4} seed={23} result="bleed" />
            <feColorMatrix
              in="bleed"
              type="matrix"
              values="0 0 0 0 0.545  0 0 0 0 0.361  0 0 0 0 0.965  0 0 0 0.75 0"
              result="tintedBleed"
            />
            <feComposite in="tintedBleed" in2="SourceAlpha" operator="in" result="clippedBleed" />
            <feBlend in="SourceGraphic" in2="clippedBleed" mode="multiply" result="painted" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={23} result="paperGrain" />
            <feColorMatrix
              in="paperGrain"
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.12 0"
              result="whiteGrain"
            />
            <feComposite in="whiteGrain" in2="SourceAlpha" operator="in" result="clippedGrain" />
            <feBlend in="painted" in2="clippedGrain" mode="multiply" result="grainyPainted" />
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves={2} seed={23} result="wobbleNoise" />
            <feDisplacementMap in="grainyPainted" in2="wobbleNoise" scale={4} />
          </filter>
        </defs>
        <Bloom>
          <g fill="var(--petal-purple)" filter="url(#workEdgeTextureLavender)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-13.8" rx="8.5" ry="15" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={7} fill="var(--petal-purple-deep)" />
        </Bloom>
      </svg>

      <svg
        className={styles.deco}
        width={120}
        height={120}
        viewBox="-50 -50 100 100"
        style={{ top: '-48px', right: '34%' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="workEdgeWobbleSmallPink" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves={2} seed={8} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={10} />
          </filter>
        </defs>
        <Bloom>
          <g fill="var(--petal-pink)" filter="url(#workEdgeWobbleSmallPink)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-13.2" rx="8" ry="15" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle r={4} fill="var(--petal-pink-deep)" />
        </Bloom>
      </svg>
    </div>
  );
}

export function WorkPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const visibleProjects = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.filterGroup === filter);

  return (
    <main>
      <section className={styles.section}>
        <SideFlowers />
        <div className={`container ${styles.wideContainer}`}>
          <div className={styles.introBand}>
            <IntroDeco />

            <div className={styles.introRow}>
              <div>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} aria-hidden="true" />
                  My work
                </span>
                <h1 className={styles.heading}>
                  Step into
                  <br />
                  my world
                </h1>
                <p className={styles.lead}>
                  A collection of projects where data, code and curiosity turn into meaningful solutions.
                </p>
              </div>
              <p className={styles.note}>
                Here&apos;s where
                <br />
                I build, test
                <br />
                and learn ♡
              </p>
            </div>
          </div>

          <div className={styles.filters} role="group" aria-label="Filter projects by category">
            <button
              type="button"
              className={`${styles.filterPill} ${filter === 'All' ? styles.filterActive : ''}`}
              onClick={() => setFilter('All')}
            >
              All
            </button>
            {FILTER_GROUPS.map((group) => (
              <button
                key={group}
                type="button"
                className={`${styles.filterPill} ${filter === group ? styles.filterActive : ''}`}
                onClick={() => setFilter(group)}
              >
                {group}
              </button>
            ))}
          </div>

          <ul className={styles.list}>
            {visibleProjects.map((project, i) => (
              <li
                key={project.name}
                className={`${styles.row} ${i % 2 === 1 ? styles.reverse : ''} ${styles[`accent-${project.accent}`]}`}
                data-group={project.filterGroup}
              >
                <ProjectEdgeFlower project={project} />
                <div className={`${styles.visual} ${project.image === 'linearRegression' ? styles.lr : ''}`}>
                  <img src={IMAGES[project.image]} alt={`${project.name} preview`} />
                </div>
                <div className={styles.body}>
                  <div className={styles.head}>
                    <div>
                      <span className={styles.cardEyebrow}>
                        <span className={styles.dot} aria-hidden="true" />
                        {project.filterGroup}
                      </span>
                      <h2 className={styles.name}>{project.name}</h2>
                      <span className={styles.category}>{project.category}</span>
                    </div>
                  </div>
                  <p className={styles.description}>
                    {project.image === 'dslr' && (
                      <>
                        A multiclass classifier built from scratch with logistic
                        <br />
                        regression — gradient descent instead of a black box.
                      </>
                    )}
                    {project.image === 'linearRegression' && (
                      <>
                        Linear regression implemented from first principles
                        <br />
                        to predict car prices from mileage.
                      </>
                    )}
                    {project.image === 'piscine' && (
                      <>
                        A deep dive into SQL, data analysis, statistics
                        <br />
                        and visualization during 42&apos;s Python piscine.
                      </>
                    )}
                    {project.image === 'ecommerce' && (
                      <>
                        Exploring profit, quantity and seasonality trends
                        <br />
                        across two years of e-commerce sales.
                      </>
                    )}
                  </p>
                  <ul className={styles.tech}>
                    {project.tech.map((t) => (
                      <li key={t} data-tech={t.toLowerCase().replace(/\s+/g, '-')}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  {project.link && (
                    <a
                      className={styles.githubLink}
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.comingSoon}>
            <svg className={styles.comingSoonFlower} width={110} height={110} viewBox="-50 -50 100 100" aria-hidden="true">
              <Bloom>
                <g fill="var(--petal-purple)">
                  {[0, 72, 144, 216, 288].map((r) => (
                    <ellipse key={r} cx="0" cy="-13.8" rx="11" ry="15" transform={`rotate(${r})`} />
                  ))}
                </g>
                <circle r={7} fill="var(--petal-purple-deep)" />
              </Bloom>
            </svg>
            <p className={styles.comingSoonHeading}>
              More ideas
              <br />
              coming soon… ♡
            </p>
            <Daisy size={72} className={styles.comingSoonDaisyWrap} />
          </div>
        </div>
      </section>
    </main>
  );
}
