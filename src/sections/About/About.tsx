import { SectionFrame } from '../../components/SectionFrame/SectionFrame';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Flower } from '../../components/Flower';
import styles from './About.module.css';

/** Swap in a real <img src={photo} alt="Rosse Mary" /> once a photo is available. */
const photoSrc: string | undefined = undefined;

export function About() {
  return (
    <SectionFrame id="about" seedBase={70}>
      <SectionHeading number={5} seed={75} lead="More than data.">
        Who am I?
      </SectionHeading>

      <div className={styles.grid}>
        <div className={styles.photoFrame}>
          {photoSrc ? (
            <img src={photoSrc} alt="Rosse Mary" />
          ) : (
            <div className={styles.bouquet}>
              <Flower size={70} seed={71} petals={5} rotation={-10} style={{ position: 'absolute', top: '18%', left: '20%' }} />
              <Flower size={54} seed={72} petals={6} rotation={20} style={{ position: 'absolute', top: '46%', left: '52%' }} />
              <Flower size={44} seed={73} petals={4} rotation={5} style={{ position: 'absolute', top: '58%', left: '18%' }} />
              <Flower size={40} seed={74} petals={5} rotation={-25} style={{ position: 'absolute', top: '14%', left: '58%' }} />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.eyebrow}>Hi! I&apos;m Rosse Mary, from Peru 🇵🇪</h3>

          <div className={styles.bio}>
            <p>
              I started my journey as a Data Analyst, and I&apos;m now diving deeper into Data Science and AI. I like
              turning complex problems into simple, useful and impactful solutions.
            </p>
            <p>
              Currently studying at 42 Paris, building projects, learning every day and enjoying the process.
            </p>
          </div>

          <ul className={styles.badges}>
            <li>📍 Peru</li>
            <li>🎓 42 Paris</li>
            <li>💜 Data · AI · Impact</li>
          </ul>
        </div>
      </div>
    </SectionFrame>
  );
}
