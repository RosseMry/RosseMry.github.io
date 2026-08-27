import { Hero } from '../sections/Hero/Hero';
import { ChatCTA } from '../sections/ChatCTA/ChatCTA';
import { DigitalWorld } from '../sections/DigitalWorld/DigitalWorld';
import { Projects } from '../sections/Projects/Projects';
import { Skills } from '../sections/Skills/Skills';
import { About } from '../sections/About/About';
import { Contact } from '../sections/Contact/Contact';

export function Home() {
  return (
    <>
      <main>
        <Hero />
        <ChatCTA />
        <DigitalWorld />
        <Projects />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  );
}
