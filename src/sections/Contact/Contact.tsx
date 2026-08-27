import { siGithub } from 'simple-icons';
import { FlowerField, Flower } from '../../components/Flower';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './Contact.module.css';

const EMAIL = 'rosmerymarcas@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/rossemarcas/';
const GITHUB = 'https://github.com/RosseMry';

// Generic mail/profile glyphs — LinkedIn's own mark isn't reused here (it
// isn't in the icon set we ship), just a plain "profile" stand-in.
const MAIL_PATH =
  'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z';
const PROFILE_PATH =
  'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';

export function Contact() {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  // A tiled, evenly-spaced bed — uniform size, no bee trail, spins on
  // hover — deliberately different from the mixed "bouquet" look used
  // everywhere else on the page.
  const gardenColumns = isMobile ? 4 : isTablet ? 6 : 9;
  const gardenRows = isMobile ? 5 : isTablet ? 5 : 6;
  const gardenCount = gardenColumns * gardenRows;
  const gardenSize = isMobile ? 62 : isTablet ? 84 : 108;
  const gardenSizeRange: [number, number] = [gardenSize, gardenSize];

  return (
    <footer id="contact" className={styles.contact}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.headline}>
          Let&apos;s create something amazing!
          <Flower size={28} seed={91} drift="none" interactive={false} className={styles.headlineFlower} />
        </h2>
        <p className={styles.lead}>Get in touch or say hi, I&apos;d love to connect.</p>

        <div className={styles.buttons}>
          <a href={`mailto:${EMAIL}`} data-cursor-hover>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={MAIL_PATH} />
            </svg>
            Email
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" data-cursor-hover>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={PROFILE_PATH} />
            </svg>
            LinkedIn
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" data-cursor-hover>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={siGithub.path} />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className={styles.garden} aria-hidden="true">
        <FlowerField
          region="grid"
          columns={gardenColumns}
          count={gardenCount}
          seedBase={90}
          sizeRange={gardenSizeRange}
          hoverSpin
        />
      </div>

      <p className={styles.copyright}>Made with 💜 by Rosse Mary</p>
    </footer>
  );
}
