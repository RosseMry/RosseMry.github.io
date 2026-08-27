import { useEffect, useRef, useState } from 'react';
import { useIsFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import styles from './FlowerCursor.module.css';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

/** Small flower that replaces the native cursor on desktop; inert on touch devices. */
export function FlowerCursor() {
  const isFinePointer = useIsFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (!isFinePointer) return;

    document.body.classList.add('has-flower-cursor');

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element;
      setHovering(Boolean(el.closest?.(INTERACTIVE_SELECTOR)));
    };
    const onDown = () => setClicking(true);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    let frame: number;
    const tick = () => {
      const ease = prefersReducedMotion ? 1 : 0.22;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      if (elRef.current) {
        elRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-flower-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(frame);
    };
  }, [isFinePointer, prefersReducedMotion]);

  if (!isFinePointer) return null;

  const classes = [styles.cursor, visible && styles.visible, hovering && styles.hovering, clicking && styles.clicking]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={elRef} className={classes} aria-hidden="true">
      <div className={styles.inner} onAnimationEnd={() => setClicking(false)}>
        <svg viewBox="-50 -50 100 100" width="26" height="26">
          <g>
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-14"
                rx="11"
                ry="15"
                fill="var(--petal-purple)"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
          <circle r="13" fill="var(--petal-purple-deep)" />
        </svg>
      </div>
    </div>
  );
}
