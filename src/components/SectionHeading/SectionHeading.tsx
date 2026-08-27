import type { ReactNode } from 'react';
import { Flower } from '../Flower';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  number: number;
  seed: number;
  children: ReactNode;
  lead?: ReactNode;
  align?: 'center' | 'left';
}

/** Numbered section title with a tiny non-interactive flower accent, used across the content sections. */
export function SectionHeading({ seed, children, lead, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`${styles.wrap} ${align === 'left' ? styles.left : ''}`}>
      <h2 className={`section-heading ${styles.heading} ${align === 'left' ? styles.left : ''}`}>
        <span className={styles.number}></span>
        {children}
        <Flower size={20} seed={seed} drift="none" interactive={false} />
      </h2>
      {lead && <p className="section-lead" style={align === 'left' ? { textAlign: 'left', marginLeft: 0 } : undefined}>{lead}</p>}
    </div>
  );
}
