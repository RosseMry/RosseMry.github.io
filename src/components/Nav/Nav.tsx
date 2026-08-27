import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASENAME } from '../../basename';
import styles from './Nav.module.css';

// "Work" is its own route; the rest are same-page anchors on Home — given as
// an absolute `${BASENAME}/#id` so they still land in the right spot when
// clicked from the Work page, not just from Home itself.
const LINKS = [
  { href: `${BASENAME}/#home`, label: 'Home' }, 
  { href: `${BASENAME}/#work`, label: 'Projects' },
  { href: `${BASENAME}/#about`, label: 'About' },
  { href: `${BASENAME}/#contact`, label: 'Contact' },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.bar}`}>
        <a href={`${BASENAME}/#home`} className={styles.logo}>
          RM
        </a>

        <button
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined} />
        </button>
      </div>

      {open && (
        <div className={`container ${styles.mobilePanel}`}>
          {LINKS.map((link) =>
            'to' in link ? (
              <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ),
          )}
        </div>
      )}
    </nav>
  );
}
