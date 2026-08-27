import type { ReactNode } from 'react';
import { FlowerField } from '../Flower';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './SectionFrame.module.css';

interface SectionFrameProps {
  id?: string;
  children: ReactNode;
  seedBase: number;
  className?: string;
  /** Set false for sections (like the footer) that bring their own flowers. */
  flowers?: boolean;
}

/**
 * Shared section shell: keeps decorative flowers hugging the left/right
 * margins so the content column stays clean, per the "sides only" rule.
 */
export function SectionFrame({ id, children, seedBase, className, flowers = true }: SectionFrameProps) {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const count = isMobile ? 2 : isTablet ? 3 : 4;
  const sizeRange: [number, number] = isMobile ? [28, 74] : isTablet ? [34, 96] : [38, 130];

  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(' ')}>
      {flowers && <FlowerField region="sides" count={count} seedBase={seedBase} sizeRange={sizeRange} />}
      <div className={`container ${styles.inner}`}>{children}</div>
    </section>
  );
}
