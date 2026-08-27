import { Flower, Flower2, FlowerTrails } from '../../components/Flower';
import { seededRandom, seededRange } from '../../lib/rng';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { HERO_FLOWERS, HERO_PETALS, HERO_PETALS_FLOWER1, HERO_SIZES } from './heroFlowers';
import styles from './Hero.module.css';

const DOT_COLORS = [
  'var(--petal-peach-deep)',
  'var(--petal-orange-deep)',
  'var(--petal-purple-deep)',
  'var(--petal-blue-deep)',
];

export function Hero() {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const breakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  const minPriority = isMobile ? 1 : isTablet ? 2 : 3;
  const sizes = HERO_SIZES[breakpoint];
  const visibleFlowers = HERO_FLOWERS.filter((f) => f.priority <= minPriority);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.flowers}>
        <FlowerTrails
          points={visibleFlowers.map((f) => ({ topPct: f.topPct, leftPct: f.leftPct, seed: f.seed, group: f.side }))}
        />

        {visibleFlowers.map((f, i) => {
          // Mix the plain (non-watercolor) shape in with the watercolor bloom
          // for the large/xl anchors only, so the side bouquets read as a
          // mixed garden — a couple of different flower "species" — instead
          // of one repeated silhouette. Mediums stay Watercolor Bloom.
          const isAnchor = f.size === 'large' || f.size === 'xl';
          const isFlower1 = isAnchor && seededRandom(f.seed * 6.3) > 0.5;
          const HeroFlower = isFlower1 ? Flower : Flower2;
          const petals = isFlower1 ? HERO_PETALS_FLOWER1[f.size] : HERO_PETALS[f.size];
          return (
            <HeroFlower
              key={i}
              size={sizes[f.size]}
              petalLength={petals.length}
              petalWidth={petals.width}
              centerRadius={petals.center}
              rotation={f.rotation}
              seed={f.seed}
              drift={seededRandom(f.seed * 3.1) > 0.5 ? 'float' : 'sway'}
              animationSpeed={seededRange(f.seed * 2.3, 11, 19)}
              interactive
              introSpin
              introDelay={500 + i * 90}
              style={{
                position: 'absolute',
                top: `${f.topPct}%`,
                left: `${f.leftPct}%`,
                marginTop: -sizes[f.size] / 2,
                marginLeft: -sizes[f.size] / 2,
                pointerEvents: 'auto',
              }}
            />
          );
        })}
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.accentFlowers} aria-hidden="true">
          <Flower2
            size={52}
            petalLength={34}
            petalWidth={18}
            centerRadius={4.5}
            seed={51.3}
            rotation={-14}
            drift="float"
            animationSpeed={12}
            introSpin
            introDelay={350}
          />
          <Flower2
            size={52}
            petalLength={34}
            petalWidth={18}
            centerRadius={4.5}
            seed={58.7}
            rotation={16}
            drift="sway"
            animationSpeed={14}
            introSpin
            introDelay={430}
          />
        </div>

        <ul className={styles.dots} aria-hidden="true">
          {DOT_COLORS.map((color, i) => (
            <li key={i} style={{ background: color }} />
          ))}
        </ul>

        <h1 className={styles.name}>Rosse Mary</h1>

        <p className={styles.tagline}>
          Simple is better.
          <svg className={styles.squiggle} viewBox="0 0 160 14" aria-hidden="true">
            <path d="M2 8 Q 20 -2 40 8 T 78 8 T 116 8 T 154 8" fill="none" stroke="var(--petal-peach-deep)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </p>

        <p className={styles.subline}>
          I turn data into <span className={styles.highlightPurple}>ideas</span> into{' '}
          <span className={styles.highlightPeach}>dashboards</span>.
        </p>

        <span className={styles.scrollCue} aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
}
