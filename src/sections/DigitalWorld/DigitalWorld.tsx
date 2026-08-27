import { useEffect, useRef, useState } from 'react';
import { SectionFrame } from '../../components/SectionFrame/SectionFrame';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Flower } from '../../components/Flower';
import { WORLD_CARDS, type WorldCard } from '../../data/digitalWorld';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { WorldVisual } from './WorldVisual';
import pandasLogo from '../../assets/logos/pandas.webp';
import numpyLogo from '../../assets/logos/numpy.webp';
import styles from './DigitalWorld.module.css';

const AUTOPLAY_INTERVAL = 4200;

const LOGOS: Record<NonNullable<WorldCard['logo']>, string> = {
  pandas: pandasLogo,
  numpy: numpyLogo,
};

const LOGO_CLASS: Record<NonNullable<WorldCard['logo']>, string> = {
  pandas: 'logoPandas',
  numpy: 'logoNumpy',
};

export function DigitalWorld() {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ startX: number; startScroll: number; pointerId: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardStep = () => {
    const track = trackRef.current;
    if (!track) return 280;
    const card = track.querySelector('li');
    return (card?.clientWidth ?? 280) + 20;
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * cardStep(), behavior: 'smooth' });
    setResetSignal((n) => n + 1);
  };

  // Auto-advance one card at a time, looping back to the start; paused on
  // hover/drag and while the visitor prefers reduced motion.
  useEffect(() => {
    if (prefersReducedMotion || dragging || hovered) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: cardStep(), behavior: 'smooth' });
      }
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [prefersReducedMotion, dragging, hovered, resetSignal]);

  // Keep the pagination dots in sync with whatever moved the track
  // (autoplay, arrows, or a manual drag/swipe).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    // Touch already gets native momentum scrolling; only hijack mouse/pen drag.
    if (e.pointerType === 'touch') return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { startX: e.clientX, startScroll: track.scrollLeft, pointerId: e.pointerId };
    track.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current) return;
    track.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    if (drag.current) setResetSignal((n) => n + 1);
    drag.current = null;
    setDragging(false);
  };

  return (
    <SectionFrame id="digital-world" seedBase={20}>
      <SectionHeading number={2} seed={21} lead="Explore dashboards, data stories, visualizations and experiments.">
        Step into my digital world
      </SectionHeading>

      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label="Scroll left"
          onClick={() => scrollByCard(-1)}
          data-cursor-hover
        >
          ←
        </button>

        <ul
          ref={trackRef}
          className={`${styles.track} ${dragging ? styles.dragging : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {WORLD_CARDS.map((card) =>
            card.variant === 'quote' ? (
              <li key={card.id} className={`${styles.card} ${styles.quoteCard}`}>
                <p className={styles.quoteText}>
                  {card.note} <span className={styles.accent}>{card.accent}</span>
                </p>
                <Flower size={26} seed={17.4} drift="none" interactive={false} />
              </li>
            ) : (
              <li key={card.id} className={styles.card}>
                {card.title && <span className={styles.title}>{card.title}</span>}
                {card.note && <p className={styles.note}>{card.note}</p>}
                {card.tag && <span className={styles.tag}>{card.tag}</span>}
                {(card.logo || card.visual) && (
                  <div className={styles.visual}>
                    {card.logo && card.logoPosition !== 'below' && (
                      <img className={`${styles.logo} ${styles[LOGO_CLASS[card.logo]]}`} src={LOGOS[card.logo]} alt={card.logo} />
                    )}
                    {card.visual && <WorldVisual kind={card.visual} />}
                    {card.logo && card.logoPosition === 'below' && (
                      <img className={`${styles.logo} ${styles[LOGO_CLASS[card.logo]]}`} src={LOGOS[card.logo]} alt={card.logo} />
                    )}
                  </div>
                )}
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label="Scroll right"
          onClick={() => scrollByCard(1)}
          data-cursor-hover
        >
          →
        </button>
      </div>

    </SectionFrame>
  );
}
