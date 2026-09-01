import { SectionFrame } from '../../components/SectionFrame/SectionFrame';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { PROJECTS, type Project } from '../../data/projects';
import dslrImage from '../../assets/projects/dslr.webp';
import linearRegressionImage from '../../assets/projects/linear-regression.png';
import piscineImage from '../../assets/projects/piscine.png';
import ecommerceImage from '../../assets/projects/ecommerce.png';
import ecommerce2Image from '../../assets/projects/ecommerce2.jpg';
import styles from './Projects.module.css';

const IMAGES: Record<Project['image'], string> = {
  dslr: dslrImage,
  linearRegression: linearRegressionImage,
  piscine: piscineImage,
  ecommerce: ecommerceImage,
  ecommerce2: ecommerce2Image,
};

/** Heroicons "rocket-launch" — inline so the site never pulls in the whole icon package for one glyph. */
function RocketLaunchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  );
}

export function Projects() {
  return (
    <SectionFrame id="work" seedBase={60} className={styles.workSection}>
      <SectionHeading number={3} seed={61} lead="A few projects. Real problems. Meaningful solutions.">
        Tiny fractions of my work
      </SectionHeading>

      <ul className={styles.grid}>
        {PROJECTS.map((project) => (
          <li key={project.name} className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <h3 className={styles.name}>{project.name}</h3>
                <span className={styles.category}>{project.category}</span>
              </div>
              {project.link ? (
                <a
                  className={styles.linkIcon}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} on GitHub`}
                  data-cursor-hover
                >
                  <RocketLaunchIcon />
                </a>
              ) : (
                <span className={styles.lockIcon} aria-label="Repository private for now" title="Repository private for now">
                  🔒
                </span>
              )}
            </div>
            <div className={`${styles.visual} ${styles[`visual-${project.image}`]}`}>
              <img src={IMAGES[project.image]} alt={`${project.name} preview`} />
            </div>
            <div className={styles.body}>
              <p className={styles.description}>{project.description}</p>
              <ul className={styles.tech}>
                {project.tech.map((t) => (
                  <li key={t} data-tech={t.toLowerCase().replace(/\s+/g, '-')}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
