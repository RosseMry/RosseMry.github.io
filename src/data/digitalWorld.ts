export interface WorldCard {
  id: string;
  /** Omitted for the quote card, which has no title. */
  title?: string;
  note?: string;
  tag?: string;
  visual?: 'pandasChart' | 'numpyCube' | 'edaCombo' | 'dataviz' | 'bell' | 'panels';
  /** Real library wordmark shown alongside the visual. */
  logo?: 'pandas' | 'numpy';
  /** Whether the logo sits above or below the visual. Defaults to 'above'. */
  logoPosition?: 'above' | 'below';
  /** Text-only card — `note` is the lead line, `accent` the highlighted close. */
  variant?: 'quote';
  accent?: string;
}

export const WORLD_CARDS: WorldCard[] = [
  {
    id: 'pandas',
    title: 'Data Analysis',
    note: 'with Python',
    logo: 'pandas',
    visual: 'pandasChart',
  },
  {
    id: 'numpy',
    title: 'NumPy',
    note: 'Data at the core',
    logo: 'numpy',
    logoPosition: 'below',
    visual: 'numpyCube',
  },
  {
    id: 'quote-powerful',
    variant: 'quote',
    note: "Data is not just \nnumbers, it's\n",
    accent: 'powerful.',
  },
  {
    id: 'eda',
    title: 'Exploratory\nData Analysis',
    visual: 'edaCombo',
  },
  {
    id: 'dataviz',
    title: 'Visualization',
    note: 'that speaks',
    visual: 'dataviz',
  },
  {
    id: 'stats',
    title: 'Statistics',
    note: 'Distributions, tests, and the stories they tell.',
    visual: 'bell',
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    note: 'Turning a pile of numbers into a place you can explore.',
    visual: 'panels',
  },
];
