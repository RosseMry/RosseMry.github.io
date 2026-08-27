import { SectionFrame } from '../../components/SectionFrame/SectionFrame';
import styles from './ChatCTA.module.css';

const EMAIL = 'rosmerymarcas@gmail.com';

export function ChatCTA() {
  return (
    <SectionFrame id="chat" seedBase={10}>
      <div className={styles.inner}>
        <a className={styles.button} href={`mailto:${EMAIL}`} data-cursor-hover>
          Chat with me
        </a>
      </div>
    </SectionFrame>
  );
}
