import { SectionFrame } from '../../components/SectionFrame/SectionFrame';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { SKILLS } from '../../data/skills';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <SectionFrame id="skills" seedBase={40}>
      <SectionHeading number={4} seed={41} lead="Technologies I use to build and create.">
        I&apos;ve got your back with...
      </SectionHeading>

      <ul className={styles.grid}>
        {SKILLS.map((tech) => (
          <li key={tech.name} className={styles.chip} style={{ ['--chip-hex' as string]: tech.hex }}>
            <svg viewBox={tech.viewBox} aria-hidden="true">
              <path d={tech.path} />
            </svg>
            <span className={styles.label}>{tech.name}</span>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
